import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Typography, Select, message, Card, Input, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHooks } from '../../hook/useMutationHook';
import * as UserService from '../../services/UserService';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import * as OrderService from '../../services/OrderService';
import './style.css'
const { Title } = Typography;
const { Option } = Select;

const PayMentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    // const [selectedProducts, setSelectedProducts] = useState([]);  // Track selected products for payment
    // const [address, setAddress] = useState('Mộ Lao, Hà Đông, Hà Nội');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [shippingMethod, setShippingMethod] = useState('standard'); // New state for shipping method
    const [stateUser, setStateUser] = useState({
        name: '',
        phone: null,
        address: '',
        city: ''
    });

    const [inOpenModelUpdateInfo, setInOpenModelUpdateInfo] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const shippingFees = {
        standard: 20000,
        express: 50000,
        free: 0
    }; // Different shipping fees based on method

    // Update user info on user data change

    useEffect(() => {
        if (user) {
            setStateUser({
                name: user.name || '',
                phone: user.phone || null,
                address: user.address || '',
                city: user.city || '',
            });
        }
    }, [user]);

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        return UserService.updateUser(id, { ...rests }, token);
    });
    const mutationAddOrder = useMutationHooks(
        (data) => {
            const { token, ...rests } = data;

            const res = OrderService.createOrder({ ...rests }, token);
            return res;
        }
    );

    const totalPrice = order.orderItems.length
        ? order.orderItems.reduce(
            (total, item) => total + item.price * item.amount,
            0
        ) + shippingFees[shippingMethod]
        : 0;


    // Handle payment confirmation
    const handleAddOrder = () => {
        mutationAddOrder.mutate(
            {
                token: user?.access_token, orderItems: order?.orderItemsSlected,
                orderItems: order.orderItems,
                shippingAddress: {
                    fullName: user.name, phone: user.phone, address: user.address, city: user.city,
                }
                ,
                paymentMethod: paymentMethod,
                itemsPrice: totalPrice,
                shippingPrice: shippingFees[shippingMethod],
                totalPrice: totalPrice,
                user: user?.id,

            },
            {
                onSuccess: () => {
                    message.success('Đặt hàng thành công')
                }
            }
        );
    };

    const handleAddress = () => {
        setInOpenModelUpdateInfo(true);
    };

    // Handle user information updates
    const handleOkInfo = () => {
        const { name, address, city, phone } = stateUser;
        if (name && address && city && phone) {
            mutationUpdate.mutate(
                { id: user?.id, token: user?.access_token, ...stateUser },
                {
                    onSuccess: () => {
                        dispatch({
                            type: 'user/updateUser',
                            payload: { name, phone, address, city },
                        });
                        setInOpenModelUpdateInfo(false);
                        message.success('Cập nhật thông tin thành công!');
                    },
                    onError: () => {
                        message.error('Cập nhật thông tin thất bại.');
                    },
                }
            );
        } else {
            message.error('Vui lòng điền đầy đủ thông tin.');
        }
    };

    // Handle form input changes
    const handleOnChange = (value, name) => {
        setStateUser({
            ...stateUser,
            [name]: value,
        });
    };

    return (
        <div className="payment-page">
            <Title level={2} className="page-title">Thông tin thanh toán 💳</Title>
            <h1>Tổng đặt hàng: {order.orderItems.length}</h1>
            <Row gutter={[16, 16]} justify="center" align="middle">
                <Col xs={24} lg={12}>
                    <Card title="Chi tiết thanh toán 📝" className="payment-details-card">
                        <div className='left'>
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
                            <Title level={4} style={{ marginTop: '16px' }}>Phương thức giao hàng 🚚</Title>
                            <Select
                                value={shippingMethod}
                                onChange={setShippingMethod}
                                className="shipping-method-select"
                            >
                                <Option value="standard">Giao hàng tiêu chuẩn 📦</Option>
                                <Option value="express">Giao hàng nhanh 🚀</Option>
                                <Option value="free">Miễn phí giao hàng 🎉</Option>
                            </Select></div>
                        <div className='right'><Title level={4}>Địa chỉ giao nhận hàng 🏠</Title>
                            <div className="address-input">
                                <p>{`${user.address} Thành phố-${user.city}`}</p>
                                <p>{`Phone-${user.phone}`}</p>
                            </div>
                            <span
                                style={{ color: 'blue', cursor: 'pointer' }}
                                onClick={handleAddress}
                            >Thay đổi địa chỉ</span>

                            <div className="payment-summary">
                                <div><strong>Tiền hàng:</strong> {totalPrice - shippingFees[shippingMethod]} đ 💵</div>
                                <div><strong>Phí giao hàng:</strong> {shippingFees[shippingMethod]} đ 🚚</div>
                                <div className="total-price"><strong>Tổng tiền:</strong> {totalPrice} đ 💸</div>
                            </div>
                            <Button
                                type="primary"
                                className="confirm-button"
                                onClick={handleAddOrder}
                            >
                                <span style={{ color: 'white' }}>Xác nhận thanh toán ✅</span>
                            </Button></div>
                    </Card>
                </Col>
            </Row>
            <Modal
                title={"Cập nhật thông tin"}
                open={inOpenModelUpdateInfo}
                onCancel={() => setInOpenModelUpdateInfo(false)}
                footer={null}
            >
                <div className="update-info">
                    <Form form={form}>
                        <Form.Item label="Tên">
                            <Input
                                value={stateUser.name}
                                onChange={(e) => handleOnChange(e.target.value, 'name')}
                            />
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input
                                value={stateUser.phone}
                                onChange={(e) => handleOnChange(e.target.value, 'phone')}
                            />
                        </Form.Item>
                        <Form.Item label="Địa chỉ">
                            <Input
                                value={stateUser.address}
                                onChange={(e) => handleOnChange(e.target.value, 'address')}
                            />
                        </Form.Item>
                        <Form.Item label="Thành phố">
                            <Input
                                value={stateUser.city}
                                onChange={(e) => handleOnChange(e.target.value, 'city')}
                            />
                        </Form.Item>
                        <Button onClick={handleOkInfo} type="primary">Lưu thông tin</Button>
                    </Form>
                </div>
            </Modal>
            <FooterComponent />
        </div>
    );
};

export default PayMentPage;
