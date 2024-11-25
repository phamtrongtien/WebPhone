import React, { useState } from 'react';
import { Col, Row, Button, Typography, Table, Input, Select, message, Card } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import './style.css';  // Import file CSS

const { Title } = Typography;
const { Option } = Select;

const OrderPage = () => {
    const [address, setAddress] = useState('Mộ Lao, Hà Đông, Hà Nội');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const initialOrderData = [
        { key: '1', product: 'Conan Hoạt Hình Màu - Kẻ Hành Pháp Zero Tập 1', quantity: 2, price: 200000 },
        { key: '2', product: 'Búp Bê Anime', quantity: 1, price: 150000 },
        { key: '3', product: 'Mô Hình Luffy One Piece', quantity: 1, price: 300000 },
        { key: '4', product: 'Tượng Nami One Piece', quantity: 1, price: 250000 },
        { key: '5', product: 'Manga Attack on Titan Tập 1', quantity: 3, price: 100000 },
        { key: '6', product: 'Poster Tokyo Revengers', quantity: 2, price: 50000 },
        { key: '7', product: 'Áo Thun Anime Naruto', quantity: 1, price: 200000 }
    ];

    const [orderData, setOrderData] = useState(initialOrderData);
    const [deletedItem, setDeletedItem] = useState(null);
    const [undoVisible, setUndoVisible] = useState(false);

    const increaseQuantity = (key) => setOrderData(orderData.map(item =>
        item.key === key ? { ...item, quantity: item.quantity + 1 } : item
    ));

    const decreaseQuantity = (key) => setOrderData(orderData.map(item =>
        item.key === key && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));

    const removeItem = (key) => {
        const itemToRemove = orderData.find(item => item.key === key);
        setOrderData(orderData.filter(item => item.key !== key));
        setDeletedItem(itemToRemove);
        setUndoVisible(true);

        setTimeout(() => {
            setUndoVisible(false);
            setDeletedItem(null);
        }, 5000);
    };

    const undoDelete = () => {
        if (deletedItem) {
            setOrderData([deletedItem, ...orderData]);
            setDeletedItem(null);
            setUndoVisible(false);
            message.success('Hoàn tác thành công! 🥳');
        }
    };

    const totalPrice = orderData.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleConfirmOrder = () => {
        if (!address.trim()) {
            message.error('Vui lòng nhập địa chỉ giao hàng 💔');
        } else {
            message.success('Đơn hàng của bạn đã được xác nhận! 🎉');
        }
    };

    return (
        <div className="order-page">
            <Title level={2} className="page-title">Thông tin đặt hàng 🛒</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card className="order-card">
                        <Table dataSource={orderData} pagination={false} rowKey="key" className="order-table">
                            <Table.Column title="Sản phẩm" dataIndex="product" width={100} />
                            <Table.Column width={70} title="Số lượng" render={(text, record) => (
                                <div className="quantity-controls">
                                    <Button icon={<MinusOutlined />} onClick={() => decreaseQuantity(record.key)} disabled={record.quantity <= 1} />
                                    <span className="quantity">{record.quantity}</span>
                                    <Button icon={<PlusOutlined />} onClick={() => increaseQuantity(record.key)} />
                                </div>
                            )} />
                            <Table.Column title="Giá" width={70} dataIndex="price" render={(text) => `${text} đ`} />
                            <Table.Column title="Tổng" width={70} render={(text, record) => `${record.price * record.quantity} đ`} />
                            <Table.Column title="Hành động" render={(text, record) => (
                                <Button icon={<DeleteOutlined />} onClick={() => removeItem(record.key)} danger />
                            )} />
                        </Table>
                        {undoVisible && (
                            <div className="undo-delete">
                                <Button onClick={undoDelete} type="link">Hoàn tác xóa sản phẩm 🕹️</Button>
                            </div>
                        )}
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Chi tiết đơn hàng 📝" className="order-details-card">
                        <Title level={4}>Địa chỉ giao hàng 🏠</Title>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Nhập địa chỉ giao hàng" className="address-input" />
                        <Title level={4}>Phương thức thanh toán 💳</Title>
                        <Select value={paymentMethod} onChange={setPaymentMethod} className="payment-method-select">
                            <Option value="creditCard">Thẻ tín dụng 💳</Option>
                            <Option value="paypal">PayPal 💰</Option>
                            <Option value="cashOnDelivery">Thanh toán khi nhận hàng 💵</Option>
                        </Select>
                        <div className="total-price">
                            <strong>Tổng tiền:</strong> {totalPrice} đ 💸
                        </div>
                        <Button type="primary" className="confirm-button" onClick={handleConfirmOrder}>
                            Xác nhận đặt hàng ✅
                        </Button>
                    </Card>
                </Col>
            </Row>
            <FooterComponent />
        </div>
    );
};

export default OrderPage;
