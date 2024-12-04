import React, { useState, useEffect } from 'react';
import { Button, Typography, Tag, Modal, Card, Row, Col, Table, notification, Input } from 'antd';
import { UilClipboardAlt } from "@iconscout/react-unicons";
import './style.css';
import * as OrderService from '../../../services/OrderService';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { updateDeliveryStatus } from '../../../services/OrderService'; // Import the update function

const { Title } = Typography;
const { Search } = Input;

const ManageOrder = () => {
    const user = useSelector((state) => state.user);

    // State for orders, modal visibility, order details, search query
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    // Function to fetch all orders
    const getAllOrder = async () => {
        try {
            const res = await OrderService.getAllOrder(user.access_token);
            setOrders(res.data);
            setFilteredOrders(res.data); // Set initial filtered orders to all orders
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
            setFilteredOrders([]);
        }
    };

    const { isLoading: isLoadingOrder } = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrder,
        onSuccess: (data) => {
            setOrders(data || []);
            setFilteredOrders(data || []); // Set filtered orders initially
        }
    });

    // Function to handle search
    const handleSearch = (value) => {
        setSearchQuery(value);

        if (value) {
            const filtered = orders.filter(order =>
                order.shippingAddress.fullName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders); // If search query is empty, show all orders
        }
    };

    // Columns for the table displaying orders
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

    // Open modal with order details
    const handleViewDetails = (order) => {
        setOrderDetails(order);
        setIsModalVisible(true);
    };

    // Close modal and reset order details
    const handleCancel = () => {
        setIsModalVisible(false);
        setOrderDetails(null);
    };

    // Function to handle updating the delivery status
    const handleUpdateDeliveryStatus = async (orderId, isDelivered) => {
        try {
            // Cập nhật trạng thái giao hàng trong database
            const updatedOrder = await updateDeliveryStatus(orderId, isDelivered, user.access_token);

            // Gọi lại API để lấy lại danh sách đơn hàng mới nhất sau khi cập nhật
            getAllOrder();

            notification.success({
                message: 'Cập nhật trạng thái giao hàng thành công',
            });
        } catch (error) {
            console.error('Error updating delivery status:', error);
            notification.error({
                message: 'Cập nhật trạng thái giao hàng thất bại',
            });
        }
    };

    // Pagination settings
    const pageSize = 5; // Number of orders per page
    const currentOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Loading state when orders are being fetched
    if (isLoadingOrder) {
        return <div>Loading...</div>;
    }

    return (
        <div className="orders-container">
            <Title level={3}>
                <UilClipboardAlt /> Đơn hàng
            </Title>

            {/* Search Input */}
            <Input
                placeholder="Tìm kiếm đơn hàng theo tên khách hàng"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: 300, margin: '20px' }}
                allowClear
            />


            <Table
                columns={columns}
                dataSource={currentOrders} // Data displayed for current page
                rowKey="_id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredOrders.length,
                    onChange: (page) => setCurrentPage(page), // Change page
                }}
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
                                            <img style={{ width: '50px' }} src={item.image} />
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
                            {!orderDetails.isDelivered && (
                                <Button
                                    type="primary"
                                    onClick={() => handleUpdateDeliveryStatus(orderDetails._id, true)}
                                >
                                    Đánh dấu là đã giao
                                </Button>
                            )}
                        </Card>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ManageOrder;
