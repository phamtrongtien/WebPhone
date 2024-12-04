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
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutationHooks(data => UserService.sigUpUser(data));
  const { data, isSuccess, isError } = mutation;

  // Kiểm tra mật khẩu
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm số và ký tự đặc biệt.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleOnchangeEmail = (value) => setEmail(value);
  const handleOnchangePassword = (value) => {
    setPassword(value);
    validatePassword(value);
  };
  const handleOnchangeName = (value) => setName(value);
  const handleOnchangePhone = (value) => setPhone(value);
  const handleOnchangeConfirmPassword = (value) => setConfirmPassword(value);

  const handleSigup = () => {
    if (!validatePassword(password)) {
      return;
    }
    if (password !== confirmpassword) {
      message.error('Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsLoading(true);
    mutation.mutate(
      { name, email, password, confirmpassword, phone },
      {
        onSuccess: (data) => {
          console.log('Đăng ký thành công:', data);
        },
        onError: (error) => {
          console.log('Lỗi đăng ký:', error);
        }
      }
    );
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    if (isSuccess) {
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
              <Image src={anhdk} preview={false} alt="anhdk" />
              <div>
                <h4 style={{ color: '#0077CC' }}>Mua sắm tại BEEBEE</h4>
                <h4 style={{ color: '#0077CC' }}>
                  Siêu ưu đãi mỗi ngày <HeartOutlined />
                </h4>
              </div>
            </WrapperImageContainer>
          </WrapperContainerRight>
          <WrapperContainerLeft>
            <button onClick={handleSignInClick} style={{ border: 'black' }}>
              <ArrowLeftOutlined />
            </button>
            <h2>Đăng ký tài khoản</h2>

            <InputFormComponent placeholder="tên" value={name} onChange={handleOnchangeName} />
            <InputFormComponent placeholder="số điện thoại" value={phone} onChange={handleOnchangePhone} />
            <InputFormComponent placeholder="abcde@gmail.com" value={email} onChange={handleOnchangeEmail} />
            <InputFormComponent
              placeholder="password"
              type="password"
              value={password}
              onChange={handleOnchangePassword}
            />
            {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
            <InputFormComponent
              placeholder="confirm password"
              type="password"
              value={confirmpassword}
              onChange={handleOnchangeConfirmPassword}
            />

            <WrapperLoginButton>
              {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

              <LoadingComponent isLoading={isLoading}>
                <ButtonComponent
                  disabled={
                    !email.length ||
                    !password.length ||
                    !confirmpassword.length ||
                    !name.length ||
                    !phone.length ||
                    !!passwordError
                  }
                  onClick={handleSigup}
                  size={40}
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '500px',
                    marginTop: '20px',
                    opacity: !email || !password || !name || !phone || !confirmpassword || !!passwordError ? 0.5 : 1
                  }}
                  textButton="Đăng ký"
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
