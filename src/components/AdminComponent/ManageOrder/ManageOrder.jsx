import React, { useState } from 'react';
import { Table, Button, Typography, Tag } from 'antd';
import { UilClipboardAlt } from "@iconscout/react-unicons";
import './style.css';

const { Title } = Typography;

const ManageOrder = () => {
    // Dữ liệu mẫu đơn hàng
    const initialOrders = [
        {
            key: '1',
            orderID: '001',
            customerName: 'Andrew Thomas',
            product: 'Apple Smart Watch',
            amount: '2500mh battery',
            status: 'Đã hoàn thành',
        },
        {
            key: '2',
            orderID: '002',
            customerName: 'James Bond',
            product: 'Samsung Charger',
            amount: '3000mh battery',
            status: 'Đang xử lý',
        },
        {
            key: '3',
            orderID: '003',
            customerName: 'Iron Man',
            product: 'Apple Smart Watch, Samsung Gear',
            amount: '2500mh battery',
            status: 'Đã hủy',
        },
    ];

    const [orders, setOrders] = useState(initialOrders);

    const columns = [
        {
            title: 'ID Đơn hàng',
            dataIndex: 'orderID',
            key: 'orderID',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let color;
                switch (text) {
                    case 'Đã hoàn thành':
                        color = 'green';
                        break;
                    case 'Đang xử lý':
                        color = 'orange';
                        break;
                    case 'Đã hủy':
                        color = 'red';
                        break;
                    default:
                        color = 'default';
                }
                return (
                    <Tag color={color} key={text}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button type="link" onClick={() => handleApprove(record)}>
                        Duyệt
                    </Button>
                    <Button type="link" onClick={() => handleDelete(record)}>
                        Xóa
                    </Button>
                    <Button type="link" onClick={() => handleViewDetails(record)}>
                        Xem chi tiết
                    </Button>
                </div>
            ),
        },
    ];

    const handleViewDetails = (order) => {
        alert(`Chi tiết đơn hàng ${order.orderID}: ${order.product} - ${order.status}`);
    };

    const handleApprove = (order) => {
        alert(`Duyệt đơn hàng ${order.orderID}`);
        // Logic để duyệt đơn hàng
    };

    const handleDelete = (order) => {
        const newOrders = orders.filter(o => o.key !== order.key);
        setOrders(newOrders);
        alert(`Xóa đơn hàng ${order.orderID}`);
    };

    return (
        <div className="orders-container">
            <Title level={3}>
                <UilClipboardAlt /> Đơn hàng
            </Title>
            <Table columns={columns} dataSource={orders} />
        </div>
    );
};

export default ManageOrder;
