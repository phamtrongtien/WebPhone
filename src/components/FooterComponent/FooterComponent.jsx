import React from 'react';
import { FooterContainer, FooterContent, FooterLinks, FooterLogo, FooterText } from './style';

const FooterComponent = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterLogo>
                    {/* Thêm logo nếu có */}
                    <img src="/path-to-logo.png" alt="Logo" />
                </FooterLogo>
                <FooterLinks>
                    <a href="/about">Về chúng tôi</a>
                    <a href="/contact">Liên hệ</a>
                    <a href="/privacy-policy">Chính sách bảo mật</a>
                    <a href="/terms">Điều khoản sử dụng</a>
                </FooterLinks>
            </FooterContent>
            <FooterText>
                © 2024 Your Company. All rights reserved.
            </FooterText>
        </FooterContainer>
    );
};

export default FooterComponent;
