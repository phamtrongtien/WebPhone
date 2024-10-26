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
`;

export const FooterLogo = styled.div`
    margin-bottom: 15px;

    img {
        width: 120px;
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

export const FooterText = styled.p`
    font-size: 14px;
    color: #666;
`;
