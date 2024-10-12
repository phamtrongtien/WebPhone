import React from 'react';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperRow, WrapperCol } from './style'; // Import styled components

const TypeProductPage = () => {
    return (
        <WrapperRow>
            <WrapperCol span={4} >
                <NavBarComponent />
            </WrapperCol>
            <WrapperCol span={20} style={{
                marginTop: '18.62px',
                display: 'flex',
                flexWrap: 'wrap', // Cho phép các card wrap nếu cần
                gap: '20px' // Khoảng cách giữa các card
            }}>
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />

            </WrapperCol>
        </WrapperRow>
    );
}

export default TypeProductPage;
