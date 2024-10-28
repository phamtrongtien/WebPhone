import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
  WrapperLoginButton,
  WrapperOuterContainer,
  WrapperInnerContainer,
  WrapperImageContainer,
  WrapperHeader,
  WrapperCard
} from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import anhdk from '../../assets/img/anhdk.png';
import { Image } from 'antd';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hook/useMutationHook';
import { ArrowLeftOutlined, HeartOutlined } from '@ant-design/icons';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from '../../components/Message/Message';

const SigupPage = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutationHooks(
    data => UserService.sigUpUser(data)
  );

  const { data, isSuccess, isError } = mutation;  // Đưa phần này lên trước khi sử dụng

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  }
  const handleOnchangePassword = (value) => {
    setPassword(value);
  }
  const handleOnchangeName = (value) => {
    setName(value);
  }
  const handleOnchangePhone = (value) => {
    setPhone(value);
  }
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  }
  const handleSigup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    mutation.mutate({
      name, email, password, confirmpassword, phone
    }, {
      onSuccess: (data) => {
        console.log("Đăng ký thành công:", data);
      },
      onError: (error) => {
        console.log("Lỗi đăng ký:", error);
      }
    });
  }

  useEffect(() => {
    if (isSuccess === true) {
      message.success();
      handleSignInClick();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleSignInClick = () => {
    setFlipped(true);
    setTimeout(() => {
      navigate('/sig-in');
    }, 300);
  };

  return (
    <WrapperOuterContainer>
      <WrapperCard flipped={flipped ? true : undefined}>
        <WrapperInnerContainer>
          <WrapperContainerRight>
            <WrapperImageContainer>
              <Image src={anhdk} preview={false} alt='anhdk' />
              <div>
                <h4 style={{ color: '#0077CC' }}>Mua sắm tại BEEBEE</h4>
                <h4 style={{ color: '#0077CC' }}>Siêu ưu đãi mỗi ngày <HeartOutlined /></h4>
              </div>
            </WrapperImageContainer>
          </WrapperContainerRight>
          <WrapperContainerLeft>
            <button onClick={handleSignInClick} style={{ background: 'none', border: 'none' }}>
              <ArrowLeftOutlined />
            </button>
            <WrapperHeader>Xin chào</WrapperHeader>
            <h2>Đăng ký tài khoản</h2>

            <InputFormComponent placeholder='tên' value={name} onChange={handleOnchangeName} />
            <InputFormComponent placeholder='số điện thoại' value={phone} onChange={handleOnchangePhone} />
            <InputFormComponent placeholder='abcde@gmail.com' value={email} onChange={handleOnchangeEmail} />
            <InputFormComponent placeholder='password' type='password' value={password} onChange={handleOnchangePassword} />
            <InputFormComponent placeholder='conformpassword' type='password' value={confirmpassword} onChange={handleOnchangeConfirmPassword} />

            <WrapperLoginButton>
              {data?.status === "ERR" && <span style={{ color: 'red' }}>{data?.message}</span>}

              <LoadingComponent isLoading={isLoading}>
                <ButtonComponent
                  disabled={!email.length || !password.length || !confirmpassword.length || !name.length || !phone.length}
                  onClick={handleSigup}
                  size={40}
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '500px',
                    marginTop: '20px',
                    opacity: !email || !password || !name || !phone || !confirmpassword ? 0.5 : 1
                  }}
                  textButton='Đăng ký'
                  styleTextButton={{ color: 'white' }}
                />
              </LoadingComponent>
            </WrapperLoginButton>
            <p>
              bạn đã có tài khoản
              <button
                onClick={handleSignInClick}
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <WrapperTextLight>đăng nhập</WrapperTextLight>
              </button>
            </p>
          </WrapperContainerLeft>
        </WrapperInnerContainer>
      </WrapperCard>
    </WrapperOuterContainer>
  );
};

export default SigupPage;



