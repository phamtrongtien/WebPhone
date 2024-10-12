import React from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct } from './style';
import slider1 from '../../assets/img/slider1.webp';
import slider2 from '../../assets/img/slider2.webp';
import slider3 from '../../assets/img/slider3.webp';
import slider4 from '../../assets/img/slider4.webp';
import CardComponent from '../../components/CardComponent/CardComponent';


const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Lap Top'];

    return (
        <div style={{ padding: '0 120px' }}>
            <WrapperTypeProduct>
                {arr.map((item) => (
                    <TypeProduct name={item} key={item} />
                ))}
            </WrapperTypeProduct>
            <div className='container' style={{ marginTop: "20px" }}>
                <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                <div style={{ marginTop: '20px', display: 'flex', alignItems: "center", gap: '20px' }}>
                    <CardComponent />
                </div>
            </div>

        </div>
    );
};

export default HomePage;
