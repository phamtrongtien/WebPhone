import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Spin, Alert, Button, Row, Col, Card, Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import { orderContant } from '../../Contant'; // Correct named import
import './style.css';
const { Title, Text } = Typography;

const OrderInfoPage = () => {
    const user = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1); // Track current page

    // Use React Query to fetch data
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['userOrders', user.id],
        queryFn: () => OrderService.getDetailOrderByUserId(user.id, user.access_token),
        enabled: !!user.id, // Only run if user.id exists
    });

    if (isLoading) {
        return (
            <div className="loading">
                <Spin tip="Đang tải thông tin đơn hàng... 🎉" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="error">
                <Alert
                    message="Lỗi tải thông tin"
                    description={error.message || 'Không thể tải thông tin đơn hàng, vui lòng thử lại sau.'}
                    type="error"
                    showIcon
                />
                <Button type="primary" onClick={() => refetch()} style={{ marginTop: 16 }}>
                    Thử lại
                </Button>
            </div>
        );
    }

    // Check if data is defined and is an array before using data.length
    const orderList = Array.isArray(data.data) ? data.data : [];

    // Paginate the orders, 3 per page
    const startIndex = (currentPage - 1) * 3;
    const paginatedOrders = orderList.slice(startIndex, startIndex + 3);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="pay-success-page">
            <Title level={2} className="page-title">Thông tin đơn hàng bạn đã đặt 🎉</Title>
            {paginatedOrders.length > 0 ? (
                <ul>
                    {paginatedOrders.map((order, index) => (
                        <li key={index} style={{ padding: '20px' }}>
                            <Text>
                                <strong>Đơn hàng {startIndex + index + 1}</strong> <br />
                                Tổng tiền: {order.itemsPrice} <br />
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
                                                <Card.Meta title={item.name} description={`${item.price}VNĐ      Số lượng: ${item.amount}`} />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <br />
                            </Text>
                        </li>
                    ))}
                </ul>
            ) : (
                <Text>Không có đơn hàng nào!</Text>
            )}

            {/* Pagination */}
            <Pagination
                current={currentPage}
                total={orderList.length}
                pageSize={3}
                onChange={handlePageChange}
                style={{ marginTop: 20 }}
            />
        </div>
    );
};

export default OrderInfoPage;
