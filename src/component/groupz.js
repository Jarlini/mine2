// frontend/src/Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = ({ groupId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.emit('joinGroup', groupId);

        socket.on('chat message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, [groupId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const msg = { text: input, groupId };
            socket.emit('chat message', msg);
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <h2>Group Chat</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg.text}</div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
