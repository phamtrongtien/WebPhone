import React, { useState, useEffect } from 'react';
import { Button, Typography, Tag, Modal, Card, Row, Col, Table } from 'antd';
import { UilClipboardAlt } from "@iconscout/react-unicons";
import './style.css';
import * as OrderService from '../../../services/OrderService';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const { Title } = Typography;

const ManageOrder = () => {
    const user = useSelector((state) => state.user);

    // Khai báo state để lưu đơn hàng
    const [orders, setOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // State để điều khiển Modal
    const [orderDetails, setOrderDetails] = useState(null); // State lưu thông tin chi tiết đơn hàng

    const getAllOrder = async () => {
        try {
            const res = await OrderService.getAllOrder(user.access_token);
            setOrders(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
            setOrders([]);
        }
    };

    const { isLoading: isLoadingOrder } = useQuery({
        queryKey: ['orderss'],
        queryFn: getAllOrder,
        onSuccess: (data) => {
            setOrders(data || []);
        }
    });

    const columns = [
        {
            title: 'ID Đơn hàng',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            render: (address) => address.fullName,
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'orderItems',
            key: 'orderItems',
            render: (orderItems) => orderItems.map(item => item.name).join(', '),
        },
        {
            title: 'Tổng giá',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => text.toLocaleString() + ' VND',
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (text) => (
                <Tag color={text ? 'green' : 'red'}>
                    {text ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </Tag>
            ),
        },
        {
            title: 'Trạng thái giao hàng',
            dataIndex: 'isDelivered',
            key: 'isDelivered',
            render: (text) => (
                <Tag color={text ? 'green' : 'orange'}>
                    {text ? 'Đã giao' : 'Chưa giao'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => handleViewDetails(record)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    const handleViewDetails = (order) => {
        setOrderDetails(order);  // Cập nhật thông tin chi tiết đơn hàng
        setIsModalVisible(true);  // Mở modal
    };

    const handleCancel = () => {
        setIsModalVisible(false);  // Đóng modal
        setOrderDetails(null);  // Reset thông tin đơn hàng khi đóng modal
    };

    if (isLoadingOrder) {
        return <div>Loading...</div>;
    }

    return (
        <div className="orderss-container">
            <Title level={3}>
                <UilClipboardAlt /> Đơn hàng
            </Title>
            <Table
                columns={columns}
                dataSource={orders} // Sử dụng state để render dữ liệu
                rowKey="_id"
            />

            <Modal
                title={`Chi tiết đơn hàng ${orderDetails?._id}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                {orderDetails && (
                    <div>
                        <Card title="Thông tin khách hàng" bordered={false}>
                            <p><strong>Tên khách hàng:</strong> {orderDetails.shippingAddress.fullName}</p>
                            <p><strong>Địa chỉ:</strong> {orderDetails.shippingAddress.address}</p>
                            <p><strong>Số điện thoại:</strong> {orderDetails.shippingAddress.phone}</p>
                        </Card>

                        <Card title="Sản phẩm trong đơn hàng" bordered={false} style={{ marginTop: 20 }}>
                            <Row gutter={[16, 16]}>
                                {orderDetails.orderItems.map((item) => (
                                    <Col span={8} key={item._id}>
                                        <Card hoverable>
                                            <p><strong>Tên sản phẩm:</strong> {item.name}</p>
                                            <img src={item.image} />
                                            <p><strong>Số lượng:</strong> {item.amount}</p>
                                            <p><strong>Giá:</strong> {item.price.toLocaleString()} VND</p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card>

                        <Card title="Thông tin thanh toán" bordered={false} style={{ marginTop: 20 }}>
                            <p><strong>Tổng giá:</strong> {orderDetails.totalPrice.toLocaleString()} VND</p>
                            <p><strong>Hình thức thanh toán</strong></p>
                            <p><strong>Trạng thái thanh toán:</strong> {orderDetails.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                            <p><strong>Trạng thái giao hàng:</strong> {orderDetails.isDelivered ? 'Đã giao' : 'Chưa giao'}</p>
                        </Card>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ManageOrder;
