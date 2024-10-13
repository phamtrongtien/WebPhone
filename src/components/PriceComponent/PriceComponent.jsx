import React from 'react';
import { WrapperPriceText, WrapperDiscountText } from './style'; // Import style từ file style

const PriceComponent = () => {
    return (
        <WrapperPriceText>
            1000000đ
            <WrapperDiscountText> -5%</WrapperDiscountText>
        </WrapperPriceText>
    );
};

export default PriceComponent;
