import React from 'react'
import { Col, Flex, Row, Space } from 'antd';
import { WrapperAccout, Wrapperheader, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import Search from 'antd/es/input/Search';
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
                        <ShoppingCartOutlined style={{ fontSize: '30px', color: "white" }} />
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>

                    </div>
                </Col>
            </Wrapperheader>
        </div>
    )
}

export default HeaderComponent;
