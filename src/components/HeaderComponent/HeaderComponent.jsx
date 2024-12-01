import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover } from 'antd';
import { WrapperAccout, Wrapperheader, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputsearch from '../ButtonInputSearch/ButtonInputsearch';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slices/userSlide';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { searchProduct } from '../../redux/slices/productSlice';

const HeaderComponent = ({ isHidenCart = false, isAdminPage = false, isName = false }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const order = useSelector((state) => state.order);

    // Hàm đăng xuất
    const handleLogout = async () => {
        setLoading(true);
        try {
            await UserService.logoutUser(); // Gọi API đăng xuất (nếu có)
            localStorage.removeItem('access_token'); // Xóa token khỏi localStorage
            localStorage.removeItem('user_info');    // Xóa thông tin người dùng (nếu có)
            dispatch(resetUser()); // Đặt lại trạng thái người dùng trong Redux
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateLogin = () => navigate("/sig-in");
    const handleBackHome = () => navigate('/');
    const handleUserCard = () => navigate('/order');
    const handleProfile = () => navigate('/profile-user');
    const handleAdminPage = () => navigate('/admin');

    useEffect(() => {
        setUserName(user?.name);
    }, [user?.name]);

    const content = (
        <div style={{ cursor: 'pointer' }}>
            {!isAdminPage ? (
                <>
                    <p onClick={handleLogout}>Đăng xuất</p>
                    <p onClick={handleProfile}>Thông tin người dùng</p>
                    {user.isAdmin && (
                        <p onClick={handleAdminPage}>Quản lý hệ thống</p>
                    )}
                </>
            ) : (
                <>
                    <p onClick={handleBackHome}>Đăng xuất</p>
                </>
            )}
        </div>
    );

    const onSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value));
    };

    return (
        <Wrapperheader>
            <Col span={6}>
                {!isName ? (
                    <WrapperTextHeader onClick={handleBackHome}>BEEBEE</WrapperTextHeader>
                ) : (<WrapperTextHeader>Dashboard</WrapperTextHeader>)}
            </Col>
            <Col span={11}>
                <ButtonInputsearch
                    placeholder='Tìm kiếm sản phẩm'
                    textButton='Search'
                    size='large'
                    style={{ width: 100 }}
                    onChange={onSearch}
                />
            </Col>

            <Col span={6} style={{ display: "flex", gap: "20px", alignItems: 'center' }}>
                <LoadingComponent isLoading={loading}>
                    <WrapperAccout>
                        {!isAdminPage && (<UserOutlined style={{ fontSize: '30px' }} />)}
                        {user?.access_token ? (
                            <Popover content={content} trigger="click">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>{user.name || user.email}</span>
                                    <img src={user.avatar}
                                        style={{
                                            margin: '5px',
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            objectFit: 'cover',
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
                {!isHidenCart && (
                    <div onClick={handleUserCard} style={{ cursor: 'pointer' }}>
                        <Badge count={order?.orderItems?.length} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: "black" }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                    </div>
                )}
            </Col>
        </Wrapperheader>
    );
}

export default HeaderComponent;
