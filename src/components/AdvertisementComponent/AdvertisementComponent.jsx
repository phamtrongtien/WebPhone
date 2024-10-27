import React from 'react';
import { AdvertisementContainer, CloseButton, AdImage } from './style';
import adImage from '../../assets/img/model.png'; // Đường dẫn đến hình ảnh quảng cáo

const AdvertisementComponent = ({ onClose }) => {
    return (
        <AdvertisementContainer>
            <CloseButton onClick={onClose}>✖</CloseButton>
            <AdImage src={adImage} alt="Advertisement" />
        </AdvertisementContainer>
    );
};

export default AdvertisementComponent;
