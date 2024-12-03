import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Typography, Select, message, Card, Input, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHooks } from '../../hook/useMutationHook';
import * as UserService from '../../services/UserService';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import * as OrderService from '../../services/OrderService';
import './style.css';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/Stepcomponent';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'
const { Title } = Typography;
const { Option } = Select;

const PayMentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [shippingMethod, setShippingMethod] = useState('standard');
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false)
    const [stateUser, setStateUser] = useState({
        name: '',
        phone: null,
        address: '',
        city: '',
    });

    const [inOpenModelUpdateInfo, setInOpenModelUpdateInfo] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const shippingFees = {
        standard: 20000,
        express: 50000,
        free: 0,
    };

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

    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data;
        return OrderService.createOrder({ ...rests }, token);
    });

    const totalPrice = order.orderItems.length
        ? order.orderItems.reduce(
            (total, item) => total + item.price * item.amount,
            0
        ) + shippingFees[shippingMethod]
        : 0;

    const handleAddOrder = () => {
        const isPaid = paymentMethod !== 'cashOnDelivery';
        const paidAt = new Date().toISOString(); // Lấy thời gian hiện tại nếu đã thanh toán

        mutationAddOrder.mutate(
            {
                token: user?.access_token,
                orderItems: order.orderItems,
                shippingAddress: {
                    fullName: user.name,
                    phone: user.phone,
                    address: user.address,
                    city: user.city,
                },
                paymentMethod: paymentMethod,
                itemsPrice: totalPrice,
                shippingPrice: shippingFees[shippingMethod],
                totalPrice: totalPrice,
                user: user?.id,
                isPaid: isPaid,
                paidAt: paidAt, // Thêm trường paidAt vào đây
            },
            {
                onSuccess: () => {
                    message.success('Đặt hàng thành công');
                    handleSuccess();
                },
            }
        );
    };

    const handleAddress = () => {
        setInOpenModelUpdateInfo(true);
    };

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

    const handleOnChange = (value, name) => {
        setStateUser({
            ...stateUser,
            [name]: value,
        });
    };

    const handleSuccess = () => {
        navigate('/pay-success', {
            state: {
                paymentMethod: paymentMethod,
                order: order.orderItems,
                shippingPrice: shippingFees[shippingMethod],
                shippingMethod: shippingMethod,
            },
        });
    };

    const items = [
        {
            title: 'Đặt hàng',
            description: '',
        },
        {
            title: 'Chọn phương thức thanh toán',
            description: '',
        },
        {
            title: 'Thanh toán thành công',
            description: '',
        },
    ];

    const addPaypalScript = async () => {

        const { dataConfig } = await PaymentService.getConfig();

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${dataConfig}`
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);

    };



    const onSuccessPaypal = (details, data) => {

        mutationAddOrder.mutate(
            {
                token: user?.access_token,
                orderItems: order.orderItems,
                shippingAddress: {
                    fullName: user.name,
                    phone: user.phone,
                    address: user.address,
                    city: user.city,
                },
                paymentMethod: paymentMethod,
                itemsPrice: totalPrice,
                shippingPrice: shippingFees[shippingMethod],
                totalPrice: totalPrice,
                user: user?.id,
                isPaid: true,
                paidAt: details.update_time
            },
            {
                onSuccess: () => {
                    message.success('Đặt hàng thành công');
                    handleSuccess();
                },
            }
        );
    }
    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript()

        }
        else {
            setSdkReady(true)
        }
    }, [])
    return (
        <div className="payment-page">
            <Title level={2} className="page-title">Thông tin thanh toán 💳</Title>
            <div>
                <StepComponent current={1} items={items} />
            </div>
            <h1>Tổng đặt hàng: {order.orderItems.length}</h1>
            <Row gutter={[16, 16]} justify="center" align="middle">
                <Col xs={24} lg={12}>
                    <Card title="Chi tiết thanh toán 📝" className="payment-details-card">
                        <div className="left">
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
                            </Select>
                        </div>
                        <div className="right">
                            <Title level={4}>Địa chỉ giao nhận hàng 🏠</Title>
                            <div className="address-input">
                                <p>{`${user.address} Thành phố-${user.city}`}</p>
                                <p>{`Phone-${user.phone}`}</p>
                            </div>
                            <span
                                style={{ color: 'blue', cursor: 'pointer' }}
                                onClick={handleAddress}
                            >
                                Thay đổi địa chỉ
                            </span>

                            <div className="payment-summary">
                                <div><strong>Tiền hàng:</strong> {totalPrice - shippingFees[shippingMethod]} đ 💵</div>
                                <div><strong>Phí giao hàng:</strong> {shippingFees[shippingMethod]} đ 🚚</div>
                                <div className="total-price"><strong>Tổng tiền:</strong> {totalPrice} đ 💸</div>
                            </div>
                            {(paymentMethod === 'paypal') ? (
                                <><PayPalButton
                                    amount="0.01"
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={onSuccessPaypal}
                                /></>
                            ) : (
                                <Button
                                    type="primary"
                                    className="confirm-button"
                                    onClick={handleAddOrder}
                                >
                                    Xác nhận thanh toán ✅
                                </Button>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Cập nhật thông tin"
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
