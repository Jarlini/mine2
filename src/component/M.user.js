import React, { useEffect, useState } from 'react';
import api from './Api'; // Use the axios instance with token
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Muser.css';

const MUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: ''
  });

  // Fetch users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      // Remove the deleted user from the state
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async (userId) => {
    try {
      const updatedUser = await api.put(`/users/${userId}`, editForm);
      setUsers(users.map(user => user._id === userId ? { ...user, ...updatedUser.data } : user));
      setEditingUser(null); // Close the edit form
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="button-container">
                <button className="edit-button" onClick={() => handleEditUser(user)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="edit-form-container">
          <h4>Edit User</h4>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={editForm.name} onChange={handleEditFormChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={editForm.email} onChange={handleEditFormChange} />
            </label>
            <label>
              Role:
              <input type="text" name="role" value={editForm.role} onChange={handleEditFormChange} />
            </label>
            <button type="button" onClick={() => handleSaveEdit(editingUser)}>Save</button>
          </form>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default MUser;
