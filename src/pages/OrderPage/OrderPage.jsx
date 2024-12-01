import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Typography, Table, Input, Select, message, Card, Checkbox, Modal, Form } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slices/orderSlice';
import { converPrice } from '../../utils';
import { useMutationHooks } from '../../hook/useMutationHook';
import * as UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const OrderPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [address, setAddress] = useState('Mộ Lao, Hà Đông, Hà Nội');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [deletedItem, setDeletedItem] = useState(null);
    const [undoVisible, setUndoVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [stateUser, setStateUser] = useState({
        name: '',
        phone: null,
        address: '',
        city: ''
    });


    useEffect(() => {
        if (user) {
            setStateUser({
                name: user.name || '',
                phone: user.phone || null,
                address: user.address || '',
                city: user.city || '',
            });
        }
    }, [user]); // Chạy lại khi 'user' thay đổi


    const dispatch = useDispatch();
    const shippingFee = 20000; // Phí giao hàng cố định
    const [inOpenModelUpdateInfo, setInOpenModelUpdateInfo] = useState(false);
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data;

            const res = UserService.updateUser(id, { ...rests }, token);
            return res;
        }
    );


    const handleCheckboxChange = (productId, checked) => {
        setSelectedProducts((prevSelected) =>
            checked ? [...prevSelected, productId] : prevSelected.filter((id) => id !== productId)
        );
    };

    const increaseQuantity = (productId) => {
        dispatch(increaseAmount({ idProduct: productId }));
    };

    const decreaseQuantity = (productId) => {
        dispatch(decreaseAmount({ idProduct: productId }));
    };

    const removeItem = (productId) => {
        const itemToRemove = order.orderItems.find((item) => item.product === productId);
        dispatch(removeOrderProduct({ idProduct: productId }));
        setDeletedItem(itemToRemove);
        setUndoVisible(true);
        setTimeout(() => {
            setUndoVisible(false);
            setDeletedItem(null);
        }, 5000);
    };

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

    const totalPrice = selectedProducts.length
        ? order.orderItems.reduce(
            (total, item) =>
                selectedProducts.includes(item.product)
                    ? total + item.price * item.amount
                    : total,
            0
        ) + shippingFee
        : 0;

    const handleConfirmOrder = () => {
        if (!address.trim() || !user.phone || !user.address || !user.name || !user.city) {
            setInOpenModelUpdateInfo(true);
            message.error('Vui lòng cập nhật đầy đủ thông tin về địa chỉ, tên và số điện thoại 💔');
        } else if (!selectedProducts?.length) {
            message.error("Hãy lựa chọn sản phẩm bạn muốn mua.");
        } else {
            message.success('Đơn hàng của bạn đã được xác nhận! 🎉');
            navigate('/payment')
        }
    };

    const handleCancelUpdate = () => {
        setInOpenModelUpdateInfo(false);
    };

    const handleOkInfo = () => {
        const { name, address, city, phone } = stateUser;

        if (name && address && city && phone) {
            mutationUpdate.mutate(
                { id: user?.id, token: user?.access_token, ...stateUser },
                {
                    onSuccess: (response) => {
                        dispatch({
                            type: 'user/updateUser',
                            payload: {
                                name: stateUser.name,
                                phone: stateUser.phone,
                                address: stateUser.address,
                                city: stateUser.city,
                            },
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
    const handleAddress = () => {
        setInOpenModelUpdateInfo(true)
    };

    return (
        <div className="order-page">
            <Title level={2} className="page-title">Thông tin đặt hàng 🛒</Title>
            <h1>Tổng đặt hàng: {order.orderItems.length}</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card className="order-card">
                        <Table
                            dataSource={order.orderItems}
                            pagination={false}
                            rowKey="product"
                            className="order-table"
                        >
                            <Table.Column
                                title="Chọn"
                                width={30}
                                render={(text, record) => (
                                    <Checkbox
                                        checked={selectedProducts.includes(record.product)}
                                        onChange={(e) =>
                                            handleCheckboxChange(record.product, e.target.checked)
                                        }
                                    />
                                )}
                            />
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
                                render={(text, record) => `${converPrice(record)} VNĐ`}
                            />
                            <Table.Column
                                title="Tổng"
                                width={70}
                                render={(text, record) =>
                                    `${converPrice(record) * record.amount} VNĐ`
                                }
                            />
                            <Table.Column
                                className='hoatdong'
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
                        <Title level={4}>Địa chỉ giao nhận hàng 🏠</Title>
                        <div className="address-input">
                            <p>{`${user.address}  Thành phố-${user.city}`}</p>
                            <p>{`Phone-${user.phone}`}</p>
                        </div>

                        <span
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={handleAddress}

                        >Thay đổi địa chỉ</span>
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
                        <div className="order-summary">
                            <div>
                                <strong>Tiền hàng:</strong> {totalPrice - shippingFee} đ 💵
                            </div>
                            <div>
                                <strong>Phí giao hàng:</strong> {shippingFee} đ 🚚
                            </div>
                            <div className="total-price">
                                <strong>Tổng tiền:</strong> {totalPrice} đ 💸
                            </div>
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
            <Modal
                title={"Cập nhật thông tin"}
                open={inOpenModelUpdateInfo}
                onCancel={handleCancelUpdate}
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
                        <Button onClick={handleOkInfo} type="primary">
                            Lưu thông tin
                        </Button>
                    </Form>
                </div>
            </Modal>
            <FooterComponent />
        </div>
    );
};

export default OrderPage;
