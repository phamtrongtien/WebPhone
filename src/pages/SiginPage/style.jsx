import styled, { css } from 'styled-components';

export const WrapperOuterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #f0f2f5;
`;

export const WrapperCard = styled.div`
    perspective: 1000px; /* Giúp tạo hiệu ứng 3D */
    
    ${({ flipped }) =>
        flipped &&
        css`
            transform: rotateY(180deg);
        `}
    transition: transform 0.5s ease-in-out; /* Hiệu ứng lật */
`;

export const WrapperInnerContainer = styled.div`
    width: 800px;
    height: 445px;
    border-radius: 6px;
    background: white;
    display: flex;
    overflow: hidden;
    transform-style: preserve-3d;
`;

export const WrapperContainerLeft = styled.div`
    padding: 20px;
    flex: 1;
`;

export const WrapperContainerRight = styled.div`
    padding: 10px;
    flex: 0.75;
    background: #d6f0ff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

export const WrapperTextLight = styled.span`
    color: #89c8f2;
    font-size: 11px;
    cursor: pointer;
`;

export const WrapperLoginButton = styled.div`
    margin-top: 20px;
`;

export const WrapperHeader = styled.h1`
    margin-bottom: 10px;
`;

export const WrapperImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
`;
