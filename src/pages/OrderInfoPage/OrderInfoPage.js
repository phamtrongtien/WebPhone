import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Spin, Alert, Button, Row, Col, Card, Pagination, Space, Modal } from 'antd';
import { useQuery, useMutation } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import { orderContant } from '../../Contant';
import './style.css';
import { format } from 'date-fns';

const { Title, Text } = Typography;

const OrderInfoPage = () => {
    const user = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedOrders, setExpandedOrders] = useState({});
    const [orderToCancel, setOrderToCancel] = useState(null);
    const [activeTab, setActiveTab] = useState('pending'); // Tab hiện tại (Đang đặt hoặc Đã hủy)

    // Fetch dữ liệu đơn hàng
    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ['userOrders', user.id],
        queryFn: () => OrderService.getDetailOrderByUserId(user.id, user.access_token),
        enabled: !!user.id,
    });

    // Mutation để xóa đơn hàng
    const { mutate: deleteOrder, isLoading: isDeleting } = useMutation({
        mutationFn: ({ orderId, orderItems }) => OrderService.deleteOrder(orderId, user.access_token, orderItems),
        onSuccess: () => {
            refetch(); // Cập nhật lại danh sách sau khi xóa
        },
    });

    // Mở/Đóng chi tiết đơn hàng
    const handleViewDetails = (orderId) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId], // Đảo trạng thái mở rộng
        }));
    };

    const handleCancelOrderClick = (orderId) => {
        setOrderToCancel(orderId); // Lưu id đơn hàng để hủy
    };

    const handleConfirmCancel = () => {
        const orderToCancelDetails = data?.data?.find((order) => order._id === orderToCancel);
        if (orderToCancelDetails) {
            // Cập nhật isDelivered thành false trước khi xóa
            orderToCancelDetails.isDelivered = false;

            deleteOrder({
                orderId: orderToCancel,
                orderItems: orderToCancelDetails.orderItems,
            });
        }

        setTimeout(() => {
            refetch(); // Cập nhật dữ liệu sau khi hủy
        }, 500);

        setOrderToCancel(null); // Đóng modal sau khi hủy
    };

    const handleCancelModal = () => {
        setOrderToCancel(null); // Đóng modal nếu không xác nhận hủy
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Đổi tab hiện tại (đang đặt hoặc đã hủy)
    };

    if (isLoading || isFetching) {
        return (
            <div className="loading">
                <Spin tip="Đang tải thông tin đơn hàng..." />
            </div>
        );
    }

    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
        return <Text>Không có đơn hàng nào!</Text>;
    }

    if (isError) {
        return (
            <div className="error">
                <Alert
                    message="Lỗi tải thông tin"
                    description={error?.message || 'Không thể tải thông tin đơn hàng, vui lòng thử lại sau.'}
                    type="error"
                    showIcon
                />
                <Button type="primary" onClick={() => refetch()} style={{ marginTop: 16 }}>
                    Thử lại
                </Button>
            </div>
        );
    }

    const orderList = data?.data || []; // Đảm bảo orderList luôn là một mảng hợp lệ

    // Lọc đơn hàng theo tab đang chọn (Đang đặt hoặc Đã hủy)
    const filteredOrders = orderList.filter(order =>
        activeTab === 'pending' ? order.isCancel === false : order.isCancel === true
    );

    const startIndex = (currentPage - 1) * 3;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + 3);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="pay-success-page">
            <Title level={2} className="page-title">Thông tin đơn hàng bạn đã đặt 🎉</Title>

            <div className="tab-buttons">
                <Button
                    type={activeTab === 'pending' ? 'primary' : 'default'}
                    onClick={() => handleTabClick('pending')}
                    style={{ margin: '10px' }}
                >
                    Đang đặt
                </Button>
                <Button
                    type={activeTab === 'cancelled' ? 'primary' : 'default'}
                    onClick={() => handleTabClick('cancelled')}
                >
                    Đã hủy
                </Button>
            </div>

            <ul>
                {paginatedOrders.map((order) => (
                    <li key={order._id} style={{ padding: '20px' }}>
                        <Text>
                            <strong>Đơn hàng ngày: {format(new Date(order.paidAt), 'dd/MM/yyyy HH:mm')}</strong> <br />
                            Tổng tiền: {order.itemsPrice} <br />
                            Trạng thái thanh toán: {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'} <br />
                            Trạng thái giao hàng:
                            {order.isCancel && !order.isDelivered
                                ? 'Đã hủy'
                                : order.isDelivered
                                    ? 'Đã giao hàng'
                                    : 'Chưa giao hàng'} <br />
                            <Space style={{ marginTop: '16px' }}>
                                <Button
                                    type="primary"
                                    onClick={() => handleViewDetails(order._id)}
                                >
                                    {expandedOrders[order._id] ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                                </Button>
                                {!order.isCancel && (
                                    <Button
                                        type="danger"
                                        onClick={() => handleCancelOrderClick(order._id)}
                                        loading={isDeleting}
                                    >
                                        Hủy đơn hàng
                                    </Button>
                                )}
                            </Space>
                            {expandedOrders[order._id] && (
                                <>
                                    <br />
                                    Phương thức thanh toán: {orderContant.paymentMethod[order.paymentMethod]} <br />
                                    Các sản phẩm:
                                    <Row gutter={[16, 16]} className="product-list">
                                        {order.orderItems.map((item, itemIndex) => (
                                            <Col xs={24} sm={12} md={8} key={itemIndex}>
                                                <Card
                                                    hoverable
                                                    cover={<img alt={item.name} src={item.image} className="product-image" />}
                                                    className="product-card"
                                                >
                                                    <Card.Meta
                                                        title={item.name}
                                                        description={`${item.price} VNĐ - Số lượng: ${item.amount}`}
                                                    />
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                            )}
                        </Text>
                    </li>
                ))}
            </ul>
            <Pagination
                current={currentPage}
                total={filteredOrders.length}
                pageSize={3}
                onChange={handlePageChange}
                style={{ marginTop: 20 }}
            />
            <Modal
                title="Xác nhận hủy đơn hàng"
                visible={!!orderToCancel}
                onOk={handleConfirmCancel}
                onCancel={handleCancelModal}
                confirmLoading={isDeleting}
            >
                <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
            </Modal>
        </div>
    );
};

export default OrderInfoPage;
