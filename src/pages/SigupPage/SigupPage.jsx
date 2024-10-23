import React, { useState } from 'react';
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
import { ArrowLeftOutlined, HeartOutlined } from '@ant-design/icons';

const SigupPage = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

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
    console.log('sig-up', name, email, password, confirmpassword, phone)
  }
  const handleSignInClick = () => {
    setFlipped(true);  // Bắt đầu hiệu ứng lật
    setTimeout(() => {
      navigate('/sig-in');  // Điều hướng sau khi hiệu ứng kết thúc
    }, 300);  // 500ms tương ứng với thời gian của hiệu ứng lật
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
              <ButtonComponent
                disabled={!email.length || !password.length || !confirmpassword.length || !name.length || !phone.length}
                onClick={handleSigup}
                size={40}
                styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '200px',
                  marginTop: '20px',
                  opacity: !email || !password || !name || !phone || !confirmpassword ? 0.5 : 1 // giảm độ trong suốt nếu thiếu email hoặc password

                }}
                textButton='Đăng ký'
                styleTextButton={{ color: 'white' }}
              />
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
