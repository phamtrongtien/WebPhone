import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight, WrapperLoginButton, WrapperOuterContainer, WrapperInnerContainer, WrapperImageContainer, WrapperHeader, WrapperCard } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import anhdk from '../../assets/img/anhdk.png';
import { Image } from 'antd';
import { ArrowLeftOutlined, HeartOutlined } from '@ant-design/icons';

import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hook/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from '../../components/Message/Message';


const SiginPage = () => {
    const navigate = useNavigate();
    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    const [isLoading, setIsLoading] = useState(false);
    const { data, isSuccess, isError } = mutation;  // Đưa phần này lên trước khi sử dụng
    useEffect(() => {
        if (isSuccess === true) {
            message.success();
            navigate('/');
            console.log('data', data);
            localStorage.setItem('access_token', data?.access_token)
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);
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
        setIsLoading(true); // Bắt đầu hiển thị spinner

        // Tự động tắt spinner sau 1 giây
        setTimeout(() => {
            setIsLoading(false); // Ẩn spinner sau 1 giây
        }, 1000);

        // Gọi API đăng nhập
        mutation.mutate({
            email,
            password
        });

        console.log(email, password);
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
                        {data?.status === "ERR" && <span style={{ color: 'red' }}>{data?.message}</span>}

                        <WrapperLoginButton>
                            <LoadingComponent isLoading={isLoading}>
                                <ButtonComponent
                                    onClick={handleSigin}
                                    size={40}
                                    styleButton={{
                                        background: '#0077CC',
                                        height: '48px',
                                        width: '500px',
                                        marginTop: '20px',
                                        opacity: !email || !password ? 0.5 : 1 // giảm độ trong suốt nếu thiếu email hoặc password
                                    }}
                                    textButton='Đăng nhập'
                                    styleTextButton={{ color: 'white' }}
                                />

                            </LoadingComponent>
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
