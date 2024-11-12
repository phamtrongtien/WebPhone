import React, { useEffect, useState } from 'react'
import { Badge, Col, Popover } from 'antd';
import { WrapperAccout, Wrapperheader, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputsearch from '../ButtonInputSearch/ButtonInputsearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slices/userSlide'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleNavigateLogin = () => navigate("/sig-in");
    const handleBackHome = () => navigate('/');
    const handleUserCard = () => navigate('/order');
    const [userName, setUserName] = useState();

    const [loading, setLoading] = useState(false);
    // Rename function to something appropriate like logoutUser
    const handleLogout = async () => {
        // Call a logout service to clear user data
        setLoading(true)
        await UserService.logoutUser(); // Make sure you have a logout function in your service
        dispatch(resetUser())
        setLoading(false)
    };
    const handleProfile = () => {
        navigate('/profile-user');
    }
    useEffect(() => {
        setUserName(user?.name)
    }, [user?.name])
    const content = (
        <div style={{ cursor: 'pointer' }}>
            <p onClick={handleLogout}>Đăng xuất</p>
            <p onClick={handleProfile}>Thông tin người dùng</p>
        </div>
    );

    return (
        <Wrapperheader>
            <Col span={6}>
                <WrapperTextHeader onClick={handleBackHome}>BEEBEE</WrapperTextHeader>
            </Col>
            <Col span={11}>
                <ButtonInputsearch
                    placeholder='Tìm kiếm sản phẩm'
                    textButton='Search'
                    size='large'
                    style={{ width: 100 }}
                />
            </Col>

            <Col span={6} style={{ display: "flex", gap: "20px", alignItems: 'center' }}>
                <LoadingComponent isLoading={loading}>

                    <WrapperAccout>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        {user?.access_token ? (
                            <Popover content={content} trigger="click">
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <span>{user.name || user.email}</span>
                                    <img src={user.avatar}
                                        style={{
                                            margin: '5px',
                                            borderRadius: '50%',  // Làm cho ảnh có hình tròn
                                            width: '30px',       // Chiều rộng ảnh
                                            height: '30px',      // Chiều cao ảnh
                                            objectFit: 'cover',   // Đảm bảo ảnh không bị biến dạng
                                        }}
                                    />
                                </div>

                            </Popover>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                <WrapperTextHeaderSmall>Đăng nhập/ Đăng ký</WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperAccout>
                </LoadingComponent>
                <div onClick={handleUserCard} style={{ cursor: 'pointer' }}>
                    <Badge count={4} size='small'>
                        <ShoppingCartOutlined style={{ fontSize: '30px', color: "black" }} />
                    </Badge>
                    <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                </div>
            </Col>
        </Wrapperheader>
    );
}

export default HeaderComponent;
