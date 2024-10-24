// frontend/src/Group.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from './groupz';

const Group = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            const res = await axios.get('http://localhost:3000/groups');
            setGroups(res.data);
        };
        fetchGroups();
    }, []);

    const handleSelectGroup = (id) => {
        setSelectedGroupId(id);
    };

    return (
        <div>
            <h1>Groups</h1>
            <ul>
                {groups.map((group) => (
                    <li key={group._id} onClick={() => handleSelectGroup(group._id)}>
                        {group.name}
                    </li>
                ))}
            </ul>
            {selectedGroupId && <Chat groupId={selectedGroupId} />}
        </div>
    );
};

export default Group;
