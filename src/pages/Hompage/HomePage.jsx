import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct } from './style';

const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Lap Top'];

    return (
        <div style={{ padding: '0 120px' }}>
            <WrapperTypeProduct>
                {arr.map((item) => (
                    <TypeProduct name={item} key={item} />
                ))}
            </WrapperTypeProduct>
            HomePage
        </div>
    );
};

export default HomePage;
