import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Typography, Button, message } from 'antd';
import './style.css';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../Contant';
import { resetOrder } from '../../redux/slices/orderSlice';
import StepComponent from '../../components/StepComponent/Stepcomponent';

const { Title, Text } = Typography;

const PaySuccessPage = () => {
    const order = useSelector((state) => state.order);
    const location = useLocation();
    const { state } = location;

    const [isRendered, setIsRendered] = useState(false); // Trạng thái theo dõi render
    const [orderData, setOrderData] = useState(null); // State mới để lưu dữ liệu đơn hàng
    const dispatch = useDispatch();

    // Tính tổng giá trị đơn hàng
    const totalPrice = order.orderItems.reduce(
        (total, item) => total + item.price * item.amount,
        0 + (state?.shippingPrice || 0)
    );
    const tong = totalPrice;
    // Lưu dữ liệu của state vào state mới để render
    useEffect(() => {
        if (state) {
            setOrderData({
                totalPrice: tong,
                items: state.order,
                paymentMethod: state.paymentMethod,
                shippingMethod: state.shippingMethod,
                shippingPrice: state.shippingPrice,
            });
        }
    }, []);

    // Đánh dấu trạng thái render sau khi component được hiển thị
    useEffect(() => {
        setIsRendered(true);
    }, []);

    useEffect(() => {
        if (isRendered && order.orderItems.length > 0) {
            message.success('đã thành công');
            const timer = setTimeout(() => {
                dispatch(resetOrder());
            }, 1000); // Thời gian trì hoãn là 1 giây

            // Cleanup function để hủy bỏ setTimeout nếu component bị unmount trước khi hết thời gian
            return () => clearTimeout(timer);
        }
    }, [isRendered, order, dispatch]);
    const items =
        [
            {
                title: 'Đặt hàng',
                description: '',
            },
            {
                title: 'chọn phương thức thanh toán',
                description: '',
            },
            {
                title: 'Thanh toán thành công',
                description: '',
            },
        ];
    return (
        <div className="pay-success-page">
            <div>
                <StepComponent current={3} items={items} />
            </div>
            <Title level={2} className="page-title">Thanh toán thành công 🎉</Title>
            <Row justify="center" align="middle" className="success-container">
                <Col xs={24} md={16}>
                    <Card className="success-card">
                        <Title level={4}>Cảm ơn bạn đã đặt hàng! ❤️</Title>
                        <Text>
                            Đơn hàng của bạn đã được thanh toán thành công. Chúng tôi sẽ sớm xử lý đơn hàng và giao hàng đến bạn.
                        </Text>
                        {orderData && (
                            <div className="order-summary">
                                <Text strong>Số lượng sản phẩm: </Text>
                                <Text>{orderData.items.length} sản phẩm</Text>
                                <br />
                                <Text strong>Phương thức thanh toán: </Text>
                                <Text>{orderContant.paymentMethod[orderData.paymentMethod]}</Text>
                                <br />
                                <Text strong>Phương thức giao hàng: </Text>
                                <Text>{orderContant.shippingMethod[orderData.shippingMethod]}</Text>
                                <br />
                                <Text strong>Phí vận chuyển: </Text>
                                <Text>{orderData.shippingPrice || 0} đ</Text>
                                <br />
                                <Text strong>Tổng số tiền thanh toán: </Text>
                                <Text>{orderData.totalPrice} đ</Text>
                                <br />
                                <Title level={5}>Danh sách sản phẩm:</Title>
                                <Row gutter={[16, 16]} className="product-list">
                                    {orderData.items.map((item, index) => (
                                        <Col xs={24} sm={12} md={8} key={index}>
                                            <Card
                                                hoverable
                                                cover={<img alt={item.name} src={item.image} className="product-image" />}
                                                className="product-card"
                                            >
                                                <Card.Meta title={item.name} description={`${item.price.toString()} VNĐ      Số lượng: ${item.amount} `} />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                        <Button type="primary" className="back-to-home-button" href="/">
                            <span style={{ color: 'white' }}>Về trang chủ</span>
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PaySuccessPage;
