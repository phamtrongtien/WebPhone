import React from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperTypeProduct, HomePageContainer, CardsContainer } from './style';
import slider1 from '../../assets/img/slider1.webp';
import slider2 from '../../assets/img/slider2.webp';
import slider3 from '../../assets/img/slider3.webp';
import slider4 from '../../assets/img/slider4.webp';
import CardComponent from '../../components/CardComponent/CardComponent';

const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Lap Top'];

    return (
        <HomePageContainer>
            <WrapperTypeProduct>
                {arr.map((item) => (
                    <TypeProduct name={item} key={item} />
                ))}
            </WrapperTypeProduct>
            <div className='container'>
                <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                <CardsContainer>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </CardsContainer>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: "10px" }}>
                    <WrapperButtonMore textButton='xem thêm' type='outline' styleTextButton={{ fontWeight: '500' }} />

                </div>
            </div>
        </HomePageContainer>
    );
};

export default HomePage;
