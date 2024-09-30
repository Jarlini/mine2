import React, { useState, useEffect } from 'react';
import api from './Api'; // Import your Axios instance

const ManageGroups = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [newMember, setNewMember] = useState('');

    // Fetch groups when the component mounts
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await api.get('/groups');
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };
        fetchGroups();
    }, []);

    // Handle adding a new member
    const handleAddMember = async () => {
        if (!newMember || !selectedGroup) return;

        try {
            const response = await api.post(`/groups/${selectedGroup._id}/members`, { name: newMember });
            setSelectedGroup({
                ...selectedGroup,
                members: [...selectedGroup.members, response.data]
            });
            setNewMember('');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    // Handle deleting a group member
    const handleDeleteGroupMember = async (memberId) => {
        try {
            await api.delete(`/groups/${selectedGroup._id}/members/${memberId}`);
            setSelectedGroup({
                ...selectedGroup,
                members: selectedGroup.members.filter(member => member._id !== memberId)
            });
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    // Handle updating a group member (implementation needed)
    const handleUpdateGroupMember = async (memberId) => {
        // Implement the update logic here
    };

    return (
        <div>
            <h1>Manage Groups</h1>
            <select
                onChange={(e) => setSelectedGroup(groups.find(group => group._id === e.target.value))}
                value={selectedGroup ? selectedGroup._id : ''}
            >
                <option value="">Select Group</option>
                {groups.map(group => (
                    <option key={group._id} value={group._id}>{group.name}</option>
                ))}
            </select>
            
            {selectedGroup && (
                <div>
                    <h2>Group: {selectedGroup.name}</h2>
                    <input
                        type="text"
                        placeholder="New Member"
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                    />
                    <button onClick={handleAddMember}>Add Member</button>
                    
                    <ul>
                        {selectedGroup.members.map(member => (
                            <li key={member._id}>
                                {member.name}
                                <button onClick={() => handleUpdateGroupMember(member._id)}>Update</button>
                                <button onClick={() => handleDeleteGroupMember(member._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ManageGroups;
