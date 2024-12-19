import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, message } from 'antd';
import axios from 'axios';
import './style.css';
import { useSelector } from 'react-redux';

const Chatbot = () => {
    const user = useSelector((state) => state.user);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const messagesEndRef = useRef(null); // Để cuộn xuống cuối khi có tin nhắn mới

    useEffect(() => {
        // Lấy câu hỏi gợi ý từ backend khi bắt đầu
        axios.post('http://localhost:5000/chat', { message: '' })
            .then(response => {
                if (response.data.suggestions) {
                    setSuggestions(response.data.suggestions);
                }
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
                message.error('Có lỗi xảy ra khi lấy câu hỏi gợi ý.');
            });
    }, []);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        // Thêm tin nhắn người dùng vào giao diện
        setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
        setInput(''); // Xóa nội dung input sau khi gửi

        try {
            // Gửi tin nhắn tới backend
            const response = await axios.post('http://localhost:5000/chat', { message: input });

            if (response.data.response) {
                // Chỉ thêm phản hồi của bot sau khi nhận được
                setMessages((prevMessages) => [
                    ...prevMessages, // Giữ lại các tin nhắn trước đó
                    { text: response.data.response, sender: 'bot' } // Thêm tin nhắn từ bot
                ]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            message.error('Có lỗi xảy ra khi gửi tin nhắn.');
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        // Khi người dùng click vào một câu hỏi gợi ý
        setInput(suggestion);
        await sendMessage();
    };

    const toggleChat = () => {
        setShowChat(prev => !prev);
    };

    // Cuộn xuống cuối mỗi khi có tin nhắn mới
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="chatbot-container">
            <div className="chatbot-icon" onClick={toggleChat}>
                <span>💬</span>
            </div>

            <div className={`chatbot-content ${showChat ? 'show' : ''}`}>
                <h3>Shop tư vấn tự động</h3>
                <div className="suggestions-list">
                    <List
                        // header={<div>Câu hỏi gợi ý:</div>}
                        bordered
                        dataSource={suggestions}
                        renderItem={item => (
                            <List.Item style={{ fontSize: '20', border: 'none' }}>
                                <Button style={{ padding: '20px' }} onClick={() => handleSuggestionClick(item)}>{item}</Button>
                            </List.Item>
                        )}
                    />
                </div>

                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            <span className="message-sender" style={{ padding: '5px' }}>  {msg.sender === 'user' ? (user.name ? user.name : 'Khách hàng') : 'Shop'}</span>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Dùng để cuộn xuống cuối */}
                </div>

                <div className="input-container">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập câu hỏi của bạn..."
                        onPressEnter={sendMessage}
                    />
                    <Button type="primary" onClick={sendMessage}>Gửi</Button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
