import React from 'react';
import { FooterContainer, FooterContent, FooterLinks, FooterLogo, FooterText, FooterContact, FooterSocials, SocialIcon } from './style';

const FooterComponent = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterLogo>
                    {/* Thêm logo nếu có */}
                    <span>BEEBEE</span>
                </FooterLogo>

                <FooterLinks>
                    <a href="/about">Về chúng tôi</a>
                    <a href="/contact">Liên hệ</a>
                    <a href="/privacy-policy">Chính sách bảo mật</a>
                    <a href="/terms">Điều khoản sử dụng</a>
                </FooterLinks>

                <FooterContact>
                    <h4>Liên hệ với chúng tôi</h4>
                    <p>Email: support@yourcompany.com</p>
                    <p>Điện thoại: +84 123 456 789</p>
                    <p>Địa chỉ:Mộ Lao - Hà Đông - Hà Nội- Việt Nam</p>
                </FooterContact>

                {/* <FooterSocials>
                    <h4>Theo dõi chúng tôi</h4>
                    <SocialIcon href="https://facebook.com" target="_blank">
                        <img src="/icons/facebook-icon.png" alt="Facebook" />
                    </SocialIcon>
                    <SocialIcon href="https://twitter.com" target="_blank">
                        <img src="/icons/twitter-icon.png" alt="Twitter" />
                    </SocialIcon>
                    <SocialIcon href="https://instagram.com" target="_blank">
                        <img src="/icons/instagram-icon.png" alt="Instagram" />
                    </SocialIcon>
                    <SocialIcon href="https://linkedin.com" target="_blank">
                        <img src="/icons/linkedin-icon.png" alt="LinkedIn" />
                    </SocialIcon>
                </FooterSocials> */}
            </FooterContent>

            <FooterText>
                © 2024 Your Company. All rights reserved.
            </FooterText>
        </FooterContainer>
    );
};

export default FooterComponent;
