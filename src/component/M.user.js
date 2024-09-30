
// export default ManageUsers;
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
      await api.delete(`/users/${userId}`); // Ensure this matches your backend route
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Open edit form with selected user's details
  const handleEditUser = (user) => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  // Update edit form state
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save the edited user
  const handleSaveEdit = async (userId) => {
    try {
      const updatedUser = await api.put(`/users/${userId}`, editForm);
      // Update the users state with the updated user data
      setUsers(users.map(user => user._id === userId ? { ...user, ...updatedUser.data } : user));
      setEditingUser(null); // Close the edit form
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            <button onClick={() => handleEditUser(user)}>Edit</button>

            {editingUser === user._id && (
              <div>
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
                  <button type="button" onClick={() => handleSaveEdit(user._id)}>Save</button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MUser;
