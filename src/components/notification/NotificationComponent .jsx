import React, { useState, useEffect } from 'react';
import { List, Avatar, Badge, Popover, Spin, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import axios from 'axios';

const NotificationComponent = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch notifications from API
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get(`/api/notification/${userId}`);

                // Lọc thông báo trùng lặp (dựa trên notificationId hoặc một thuộc tính duy nhất khác)
                const uniqueNotifications = [];
                const seen = new Set();

                data.forEach(notification => {
                    if (!seen.has(notification._id)) {  // Dùng _id hoặc notificationId để xác định thông báo duy nhất
                        uniqueNotifications.push(notification);
                        seen.add(notification._id); // Đảm bảo không có thông báo trùng lặp
                    }
                });

                setNotifications(uniqueNotifications);
                setUnreadCount(uniqueNotifications.filter(notification => !notification.isRead).length);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [userId]);


    // Mark notifications as read
    // Mark notifications as read
    const markAsRead = async (id) => {
        try {
            // Cập nhật trạng thái isRead trong cơ sở dữ liệu
            await axios.put(`/api/notification/${id}`, { isRead: true });

            // Cập nhật thông báo trong state
            setNotifications((prevNotifications) => {
                return prevNotifications.map(notification =>
                    notification._id === id ? { ...notification, isRead: true } : notification
                );
            });

            // Tính lại số lượng thông báo chưa đọc
            setUnreadCount((prevUnreadCount) => {
                // Đảm bảo không giảm xuống dưới 0
                return prevUnreadCount > 0 ? prevUnreadCount - 1 : 0;
            });
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };


    // Popover content
    const popoverContent = (
        <div style={{ width: 300, maxHeight: 400, overflowY: 'auto' }}>
            {loading ? (
                <div style={{ textAlign: 'center', padding: 20 }}>
                    <Spin />
                </div>
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                background: item.isRead ? '#f9f9f9' : '#e6f7ff',
                                cursor: 'pointer',
                            }}
                            onClick={() => markAsRead(item._id)}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        style={{ backgroundColor: item.isRead ? '#ccc' : '#1890ff' }}
                                        icon={<BellOutlined />}
                                    />
                                }
                                title={<span>{item.title}</span>}
                                description={<span>{item.message}</span>}
                            />
                            <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );

    return (
        <Popover
            content={popoverContent}
            title="Thông Báo"
            trigger="click"
            placement="bottomRight"
            style={{ cursor: 'pointer' }}
        >
            <Badge count={unreadCount}>
                <Button
                    type="text"
                    icon={<BellOutlined style={{ fontSize: 20 }} />}
                />
            </Badge>
        </Popover>
    );
};

export default NotificationComponent;
