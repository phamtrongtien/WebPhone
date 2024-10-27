import styled from 'styled-components';

export const AdvertisementContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;  /* Nổi trên các phần tử khác */
    background-color: white;
    border: 2px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: center;
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #333;

    &:hover {
        color: red;
    }
`;

export const AdImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    margin-top: 20px;
`;
