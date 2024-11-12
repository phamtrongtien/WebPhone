import React, { useState } from 'react';
import { Col, Row, Button, Typography, Table, Input, Select, message } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const { Title } = Typography;
const { Option } = Select;

const OrderPage = () => {
    const [address, setAddress] = useState('Mộ Lao, Hà Đông, Hà Nội');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    // Dữ liệu đơn hàng với số lượng
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

    // Tăng/giảm số lượng
    const increaseQuantity = (key) => setOrderData(orderData.map(item =>
        item.key === key ? { ...item, quantity: item.quantity + 1 } : item
    ));

    const decreaseQuantity = (key) => setOrderData(orderData.map(item =>
        item.key === key && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));

    // Xóa sản phẩm và hiển thị nút hoàn tác
    const removeItem = (key) => {
        const itemToRemove = orderData.find(item => item.key === key);
        setOrderData(orderData.filter(item => item.key !== key));
        setDeletedItem(itemToRemove);
        setUndoVisible(true);

        // Sau 5 giây, tự động ẩn nút hoàn tác nếu không bấm
        setTimeout(() => {
            setUndoVisible(false);
            setDeletedItem(null);
        }, 5000);
    };

    // Hoàn tác xóa
    const undoDelete = () => {
        if (deletedItem) {
            setOrderData([deletedItem, ...orderData]);
            setDeletedItem(null);
            setUndoVisible(false);
            message.success('Hoàn tác thành công!');
        }
    };

    // Tính tổng giá
    const totalPrice = orderData.reduce((total, item) => total + item.price * item.quantity, 0);

    // Xử lý xác nhận đơn hàng
    const handleConfirmOrder = () => {
        if (!address.trim()) {
            message.error('Vui lòng nhập địa chỉ giao hàng');
        } else {
            message.success('Đơn hàng của bạn đã được xác nhận!');
        }
    };

    return (
        <>
            <div style={{ padding: '20px' }}>
                <Title level={2}>Thông tin đặt hàng</Title>
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={16}>
                        <Table dataSource={orderData} pagination={false}>
                            <Table.Column title="Sản phẩm" dataIndex="product" />
                            <Table.Column title="Số lượng" render={(text, record) => (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button icon={<MinusOutlined />} onClick={() => decreaseQuantity(record.key)} disabled={record.quantity <= 1} />
                                    <span style={{ margin: '0 8px' }}>{record.quantity}</span>
                                    <Button icon={<PlusOutlined />} onClick={() => increaseQuantity(record.key)} />
                                </div>
                            )} />
                            <Table.Column title="Giá" dataIndex="price" render={(text) => `${text} đ`} />
                            <Table.Column title="Tổng" render={(text, record) => `${record.price * record.quantity} đ`} />
                            <Table.Column title="Hành động" render={(text, record) => (
                                <Button icon={<DeleteOutlined />} onClick={() => removeItem(record.key)} danger />
                            )} />
                        </Table>
                        {undoVisible && (
                            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                                <Button onClick={undoDelete} type="link">Hoàn tác xóa sản phẩm</Button>
                            </div>
                        )}
                    </Col>
                    <Col xs={24} lg={8}>
                        <div style={{ padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                            <Title level={4}>Địa chỉ giao hàng</Title>
                            <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Nhập địa chỉ giao hàng" />
                            <Title level={4}>Phương thức thanh toán</Title>
                            <Select value={paymentMethod} onChange={setPaymentMethod} style={{ width: '100%', marginBottom: '10px' }}>
                                <Option value="creditCard">Thẻ tín dụng</Option>
                                <Option value="paypal">PayPal</Option>
                                <Option value="cashOnDelivery">Thanh toán khi nhận hàng</Option>
                            </Select>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>Tổng tiền:</strong> {totalPrice} đ
                            </div>
                            <Button type="primary" style={{ width: '100%' }} onClick={handleConfirmOrder}>
                                Xác nhận đặt hàng
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <FooterComponent />
        </>
    );
};

export default OrderPage;
