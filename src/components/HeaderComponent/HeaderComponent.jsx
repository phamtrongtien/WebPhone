import React from 'react'
import { Badge, Col } from 'antd';
import { WrapperAccout, Wrapperheader, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputsearch from '../ButtonInputSearch/ButtonInputsearch';

const HeaderComponent = () => {
    return (
        <div>
            <Wrapperheader >
                <Col span={6}><WrapperTextHeader>BEEBEE</WrapperTextHeader></Col>
                <Col span={11}>
                    <ButtonInputsearch
                        placeholder='Tìm kiếm sản phẩm'
                        textButton='Search'
                        size='large'
                        style={{ width: 100 }}
                        bordered={false}
                    />
                </Col>

                <Col span={6} style={{ display: "flex", gap: "20px", alignItems: 'center' }}>
                    <WrapperAccout>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        <div>
                            <WrapperTextHeaderSmall>
                                Đăng nhập/ Đăng ký
                            </WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>
                                    Tài Khoản
                                </WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>

                    </WrapperAccout>
                    <div>
                        <Badge count={4} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: "white" }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>

                    </div>
                </Col>
            </Wrapperheader>
        </div>
    )
}

export default HeaderComponent;
