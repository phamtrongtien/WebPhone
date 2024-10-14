import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight, WrapperLoginButton, WrapperOuterContainer, WrapperInnerContainer, WrapperImageContainer, WrapperHeader, WrapperCard } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import anhdk from '../../assets/img/anhdk.png';
import { Image } from 'antd';
import { ArrowLeftOutlined, HeartOutlined } from '@ant-design/icons';

const SiginPage = () => {
    const navigate = useNavigate();
    const [flipped, setFlipped] = useState(false);

    const handleSignUpClick = () => {
        setFlipped(true);  // Bắt đầu hiệu ứng lật
        setTimeout(() => {
            navigate('/sig-up');  // Điều hướng sau khi hiệu ứng kết thúc
        }, 300);  // 500ms tương ứng với thời gian của hiệu ứng lật
    };

    return (
        <WrapperOuterContainer>
            <WrapperCard flipped={flipped}>
                <WrapperInnerContainer>
                    <WrapperContainerLeft>
                        <button style={{ background: 'none', border: 'none' }}>
                            <ArrowLeftOutlined />
                        </button>
                        <WrapperHeader>Xin chào</WrapperHeader>
                        <h2>Đăng nhập và tạo tài khoản</h2>
                        <InputFormComponent placeholder='abcde@gmail.com' />
                        <InputFormComponent placeholder='password' type='password' />
                        <WrapperLoginButton>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: '#0077CC',
                                    height: '48px',
                                    width: '200px',
                                    marginTop: '20px'
                                }}
                                textButton='Đăng nhập'
                                styleTextButton={{ color: 'white' }}
                            />
                        </WrapperLoginButton>
                        <p><WrapperTextLight>Quên mật khẩu ?</WrapperTextLight></p>
                        <p>chưa có tài khoản =><button onClick={handleSignUpClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><WrapperTextLight>Tạo tài khoản</WrapperTextLight></button></p>
                    </WrapperContainerLeft>
                    <WrapperContainerRight>
                        <WrapperImageContainer>
                            <Image src={anhdk} preview={false} alt='anhdk' />
                            <div>
                                <h4 style={{ color: '#0077CC' }}>Mua sắm tại BEEBEE</h4>
                                <h4 style={{ color: '#0077CC' }}>Siêu ưu đãi mỗi ngày <HeartOutlined /></h4>
                            </div>
                        </WrapperImageContainer>
                    </WrapperContainerRight>
                </WrapperInnerContainer>
            </WrapperCard>
        </WrapperOuterContainer>
    );
};

export default SiginPage;
