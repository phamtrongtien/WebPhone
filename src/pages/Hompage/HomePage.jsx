import React, { useState } from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperTypeProduct, HomePageContainer, CardsContainer } from './style';
import slider1 from '../../assets/img/slider1.webp';
import slider2 from '../../assets/img/slider2.webp';
import slider3 from '../../assets/img/slider3.webp';
import slider4 from '../../assets/img/slider4.webp';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useNavigate } from 'react-router-dom';
import AdvertisementComponent from '../../components/AdvertisementComponent/AdvertisementComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const HomePage = () => {
    const arr = ['TV', 'Tủ Lạnh', 'Laptop'];
    const navigate = useNavigate();
    const [showAd, setShowAd] = useState(true); // Trạng thái hiển thị quảng cáo

    const handleCategory = () => {
        navigate('/type');
    };

    const handleProductDetail = () => {
        navigate('/product-detail');
    };

    const handleCloseAd = () => {
        setShowAd(false);
    };

    return (
        <>
            {showAd && <AdvertisementComponent onClose={handleCloseAd} />}
            <HomePageContainer className={showAd ? 'blur' : ''}> {/* Thêm class 'blur' nếu showAd là true */}
                <WrapperTypeProduct>
                    {arr.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))}
                </WrapperTypeProduct>
                <div className='container'>
                    <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                    <CardsContainer>
                        {[...Array(12)].map((_, index) => (
                            <CardComponent onClick={handleProductDetail} key={index} />
                        ))}
                    </CardsContainer>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore onClick={handleCategory} textButton='Xem thêm' type='outline' styleTextButton={{ fontWeight: '500' }} />
                    </div>
                </div>
                <FooterComponent />
            </HomePageContainer>
        </>
    );
};

export default HomePage;
