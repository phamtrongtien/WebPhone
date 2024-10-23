import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight, WrapperLoginButton, WrapperOuterContainer, WrapperInnerContainer, WrapperImageContainer, WrapperHeader, WrapperCard } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import anhdk from '../../assets/img/anhdk.png';
import { Image } from 'antd';
import { ArrowLeftOutlined, HeartOutlined } from '@ant-design/icons';

import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hook/useMutationHook';
const SiginPage = () => {
    const navigate = useNavigate();
    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    console.log(mutation)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flipped, setFlipped] = useState(false);

    const handleSignUpClick = () => {
        setFlipped(true);  // Bắt đầu hiệu ứng lật
        setTimeout(() => {
            navigate('/sig-up');  // Điều hướng sau khi hiệu ứng kết thúc
        }, 300);  // 500ms tương ứng với thời gian của hiệu ứng lật
    };
    const handleBackHome = () => {
        setFlipped(true);  // Bắt đầu hiệu ứng lật
        setTimeout(() => {
            navigate('/');  // Điều hướng sau khi hiệu ứng kết thúc
        }, 300);  // 500ms tương ứng với thời gian của hiệu ứng lật
    };
    const handleOnchangeEmail = (value) => {
        setEmail(value);
    }
    const handleOnchangePassword = (value) => {
        setPassword(value);
    }
    const handleSigin = () => {
        mutation.mutate({
            email,
            password
        })
        console.log(email, password)
    }
    return (
        <WrapperOuterContainer>
            <WrapperCard flipped={flipped ? true : undefined}>

                <WrapperInnerContainer>
                    <WrapperContainerLeft>
                        <button onClick={handleBackHome} style={{ background: 'none', border: 'none' }}>
                            <ArrowLeftOutlined />
                        </button>
                        <WrapperHeader>Xin chào</WrapperHeader>
                        <h2>Đăng nhập</h2>
                        <InputFormComponent placeholder='abcde@gmail.com' value={email} onChange={handleOnchangeEmail} />
                        <InputFormComponent placeholder='password' type='password' value={password} onChange={handleOnchangePassword} />

                        <WrapperLoginButton>
                            <ButtonComponent
                                onClick={handleSigin}
                                size={40}
                                styleButton={{
                                    background: '#0077CC',
                                    height: '48px',
                                    width: '200px',
                                    marginTop: '20px',
                                    opacity: !email || !password ? 0.5 : 1 // giảm độ trong suốt nếu thiếu email hoặc password
                                }}
                                textButton='Đăng nhập'
                                styleTextButton={{ color: 'white' }}
                            />

                        </WrapperLoginButton>
                        <p><WrapperTextLight>Quên mật khẩu ?</WrapperTextLight></p>
                        <p>chưa có tài khoản    <button onClick={handleSignUpClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><WrapperTextLight>Tạo tài khoản</WrapperTextLight></button></p>
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
