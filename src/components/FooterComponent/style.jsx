import styled from 'styled-components';

export const FooterContainer = styled.footer`
    background-color: #f1f1f1;
    padding: 20px 0;
    text-align: center;
    bottom: 0;
    width: 100%;
`;

export const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const FooterLogo = styled.div`
    margin-bottom: 15px;

    img {
        width: 120px;
        height: auto;
    }
`;

export const FooterLinks = styled.div`
    margin-bottom: 15px;

    a {
        margin: 0 10px;
        color: #333;
        text-decoration: none;
        font-size: 14px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const FooterContact = styled.div`
    margin-top: 15px;
    text-align: left;
    max-width: 400px;

    h4 {
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
    }

    p {
        margin: 5px 0;
        color: #666;
        font-size: 14px;
    }
`;

export const FooterSocials = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 20px;
`;

export const SocialIcon = styled.a`
    display: inline-block;
    width: 30px;
    height: 30px;

    img {
        width: 100%;
        height: 100%;
    }
`;

export const FooterText = styled.p`
    font-size: 14px;
    color: #666;
    margin-top: 20px;
`;

/* Responsive Design */

