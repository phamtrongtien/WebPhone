import React, { useState } from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperTypeProduct, HomePageContainer, CardsContainer, SectionTitle, PromoBanner, NeedSection } from './style';
import slider1 from '../../assets/img/slider1.webp';
import slider2 from '../../assets/img/slider2.webp';
import slider3 from '../../assets/img/slider3.webp';
import slider4 from '../../assets/img/slider4.webp';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useNavigate } from 'react-router-dom';
import AdvertisementComponent from '../../components/AdvertisementComponent/AdvertisementComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import Chatbot from '../../components/Chatbot/Chatbot';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';

const HomePage = () => {
    const arr = ['TV', 'Tủ Lạnh', 'Laptop'];
    const navigate = useNavigate();
    const [showAd, setShowAd] = useState(true);

    // Hàm fetch sản phẩm
    const fetchProductAll = async () => {
        const response = await ProductService.getProductAll();
        return response.data; // Giả sử API trả về { data: [...] }
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: fetchProductAll,
        refetchOnWindowFocus: true,  // Tự động làm mới khi người dùng quay lại trang
        refetchInterval: 60000, // Làm mới mỗi phút (60 giây)
    });

    // Xử lý khi người dùng đóng quảng cáo
    const handleCloseAd = () => {
        setShowAd(false);
    };

    // Xử lý điều hướng đến trang danh mục
    const handleCategory = () => {
        navigate('/type');
    };

    // Xử lý điều hướng đến chi tiết sản phẩm
    const handleProductDetail = (id) => {
        navigate(`/product-detail/${id}`);
    };

    if (isLoading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error.message}</div>;

    return (
        <>
            {showAd && <AdvertisementComponent onClose={handleCloseAd} />}
            <HomePageContainer className={showAd ? 'blur' : ''}>
                {/* Banner khuyến mãi */}
                <PromoBanner>
                    🔥 Giảm giá lên đến 50% cho sản phẩm điện tử!
                </PromoBanner>

                {/* Loại sản phẩm */}
                <WrapperTypeProduct>
                    {arr.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))}
                </WrapperTypeProduct>

                <div className="container">
                    {/* Slider */}
                    <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />

                    <NeedSection>
                        {/* Sản phẩm mới */}
                        <SectionTitle>🌟 Sản Phẩm Mới</SectionTitle>
                        <CardsContainer>
                            {data?.map((product) => (
                                <CardComponent
                                    key={product.id}
                                    product={product}
                                    onClick={() => handleProductDetail(product.id)}
                                />
                            ))}
                        </CardsContainer>
                    </NeedSection>

                </div>
                <div className="see-more">
                    <WrapperButtonMore onClick={handleCategory} textButton="Xem thêm" type="outline" styleTextButton={{ fontWeight: '500' }} />
                </div>
            </HomePageContainer>
            <Chatbot />
            <FooterComponent />
        </>
    );
};

export default HomePage;
