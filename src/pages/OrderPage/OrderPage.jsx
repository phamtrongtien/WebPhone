import React, { useState } from 'react';
import { Col, Row, Button, Typography, Table, Input, Select, message, Card } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import './style.css'; // Import file CSS
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slices/orderSlice';

const { Title } = Typography;
const { Option } = Select;

const OrderPage = () => {
    const order = useSelector((state) => state.order); // Lấy dữ liệu từ Redux store
    const [address, setAddress] = useState('Mộ Lao, Hà Đông, Hà Nội');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [deletedItem, setDeletedItem] = useState(null);
    const [undoVisible, setUndoVisible] = useState(false);
    const dispatch = useDispatch();

    // Hàm tăng số lượng sản phẩm
    const increaseQuantity = (productId) => {
        dispatch(increaseAmount({ idProduct: productId }));
    };

    // Hàm giảm số lượng sản phẩm
    const decreaseQuantity = (productId) => {
        dispatch(decreaseAmount({ idProduct: productId }));
    };

    // Hàm xóa sản phẩm
    const removeItem = (productId) => {
        const itemToRemove = order.orderItems.find((item) => item.product === productId);
        dispatch(removeOrderProduct({ idProduct: productId })); // Xóa sản phẩm khỏi Redux store
        setDeletedItem(itemToRemove); // Lưu sản phẩm để hoàn tác
        setUndoVisible(true);

        // Ẩn hoàn tác sau 5 giây
        setTimeout(() => {
            setUndoVisible(false);
            setDeletedItem(null);
        }, 5000);
    };

    // Hàm hoàn tác xóa sản phẩm
    const undoDelete = () => {
        if (deletedItem) {
            dispatch({
                type: 'order/addOrderProduct',
                payload: { orderItem: deletedItem },
            });
            setDeletedItem(null);
            setUndoVisible(false);
            message.success('Hoàn tác thành công! 🥳');
        }
    };

    // Tính tổng tiền từ Redux store
    const totalPrice = order.orderItems.reduce((total, item) => total + item.price * item.amount, 0);

    // Hàm xác nhận đặt hàng
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
            <h1>Tổng đặt hàng: {order.orderItems.length}</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card className="order-card">
                        <Table dataSource={order.orderItems} pagination={false} rowKey="product" className="order-table">
                            <Table.Column title="Sản phẩm" dataIndex="name" width={100} />
                            <Table.Column
                                title="Hình ảnh"
                                dataIndex="image"
                                width={100}
                                render={(text) => (
                                    <img
                                        src={text}
                                        alt="product"
                                        style={{ width: '100px', height: 'auto' }}
                                    />
                                )}
                            />
                            <Table.Column
                                width={70}
                                title="Số lượng"
                                render={(text, record) => (
                                    <div className="quantity-controls">
                                        <Button
                                            icon={<MinusOutlined />}
                                            onClick={() => decreaseQuantity(record.product)}
                                            disabled={record.amount <= 1}
                                        />
                                        <span className="quantity">{record.amount}</span>
                                        <Button
                                            icon={<PlusOutlined />}
                                            onClick={() => increaseQuantity(record.product)}
                                        />
                                    </div>
                                )}
                            />
                            <Table.Column
                                title="Giá"
                                width={70}
                                dataIndex="price"
                                render={(text) => `${text} đ`}
                            />
                            <Table.Column
                                title="Tổng"
                                width={70}
                                render={(text, record) => `${record.price * record.amount} đ`}
                            />
                            <Table.Column
                                title="Hành động"
                                render={(text, record) => (
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeItem(record.product)}
                                        danger
                                    />
                                )}
                            />
                        </Table>
                        {undoVisible && (
                            <div className="undo-delete">
                                <Button onClick={undoDelete} type="link">
                                    Hoàn tác xóa sản phẩm 🕹️
                                </Button>
                            </div>
                        )}
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Chi tiết đơn hàng 📝" className="order-details-card">
                        <Title level={4}>Địa chỉ giao hàng 🏠</Title>
                        <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Nhập địa chỉ giao hàng"
                            className="address-input"
                        />
                        <Title level={4}>Phương thức thanh toán 💳</Title>
                        <Select
                            value={paymentMethod}
                            onChange={setPaymentMethod}
                            className="payment-method-select"
                        >
                            <Option value="creditCard">Thẻ tín dụng 💳</Option>
                            <Option value="paypal">PayPal 💰</Option>
                            <Option value="cashOnDelivery">Thanh toán khi nhận hàng 💵</Option>
                        </Select>
                        <div className="total-price">
                            <strong>Tổng tiền:</strong> {totalPrice} đ 💸
                        </div>
                        <Button
                            type="primary"
                            className="confirm-button"
                            onClick={handleConfirmOrder}
                        >
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
