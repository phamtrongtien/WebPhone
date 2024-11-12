import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Button, Input, Modal } from 'antd'; // Import các component từ Ant Design

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isChatVisible, setIsChatVisible] = useState(false); // Trạng thái hiển thị chat

    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        setChatHistory([...chatHistory, { sender: 'user', message: userMessage }]);

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                message: userMessage
            });
            setChatHistory([...chatHistory, { sender: 'user', message: userMessage }, { sender: 'bot', message: response.data.response }]);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setUserMessage('');
    };

    return (
        <div className="fixed-chatbot">
            <Button onClick={() => setIsChatVisible(!isChatVisible)}>Chat với Shop tư vấn</Button>
            {isChatVisible && (
                <div className="chat-container">
                    <div className="chat-history">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={chat.sender}>
                                <strong>{chat.sender === 'user' ? 'Bạn' : 'shop'}:</strong> {chat.message}
                            </div>
                        ))}
                    </div>
                    <Input
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onPressEnter={sendMessage} // Gửi tin nhắn khi nhấn Enter
                        className="chat-input"
                        placeholder="Nhập tin nhắn của bạn..."
                    />
                    <Button onClick={sendMessage}>Gửi</Button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
