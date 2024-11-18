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

    // Hàm fetch sản phẩm mới (8 sản phẩm mới nhất)
    const fetchNewProducts = async () => {
        const response = await ProductService.getProductAll();
        const newProducts = response.data.sort((a, b) => b.id - a.id).slice(0, 8); // Sắp xếp theo id giảm dần và lấy 8 sản phẩm đầu tiên
        return newProducts;
    };

    // Hàm fetch sản phẩm bán chạy (8 sản phẩm có lượt bán nhiều nhất)
    const fetchBestSellingProducts = async () => {
        const response = await ProductService.getProductAll();
        const bestSellingProducts = response.data.sort((a, b) => b.sales - a.sales).slice(0, 8); // Sắp xếp theo lượt bán giảm dần
        return bestSellingProducts;
    };

    // Hàm fetch sản phẩm đánh giá tốt nhất (4 sản phẩm có rating cao nhất)
    const fetchTopRatedProducts = async () => {
        const response = await ProductService.getProductAll();
        const topRatedProducts = response.data.sort((a, b) => b.rating - a.rating).slice(0, 4); // Sắp xếp theo rating giảm dần
        return topRatedProducts;
    };

    // Fetch các sản phẩm
    const { data: newProducts, isLoading: isLoadingNew, error: errorNew } = useQuery({
        queryKey: ['newProducts'],
        queryFn: fetchNewProducts
    });
    const { data: bestSellingProducts, isLoading: isLoadingBestSelling, error: errorBestSelling } = useQuery({
        queryKey: ['bestSellingProducts'],
        queryFn: fetchBestSellingProducts
    });
    const { data: topRatedProducts, isLoading: isLoadingTopRated, error: errorTopRated } = useQuery({
        queryKey: ['topRatedProducts'],
        queryFn: fetchTopRatedProducts
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

    if (isLoadingNew || isLoadingBestSelling || isLoadingTopRated) return <div>Đang tải...</div>;
    if (errorNew || errorBestSelling || errorTopRated) return <div>Lỗi: {errorNew?.message || errorBestSelling?.message || errorTopRated?.message}</div>;

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

                    {/* Sản phẩm mới */}
                    <NeedSection>
                        <SectionTitle>🌟 Sản Phẩm Mới</SectionTitle>
                        <CardsContainer>
                            {newProducts?.map((product) => (
                                <CardComponent
                                    key={product.id}
                                    product={product}
                                    onClick={() => handleProductDetail(product.id)}
                                />
                            ))}
                        </CardsContainer>
                    </NeedSection>

                    {/* Sản phẩm bán chạy */}
                    <NeedSection>
                        <SectionTitle>🔥 Sản Phẩm Bán Chạy</SectionTitle>
                        <CardsContainer>
                            {bestSellingProducts?.map((product) => (
                                <CardComponent
                                    key={product.id}
                                    product={product}
                                    onClick={() => handleProductDetail(product.id)}
                                />
                            ))}
                        </CardsContainer>
                    </NeedSection>

                    {/* Sản phẩm được đánh giá tốt nhất */}
                    <NeedSection>
                        <SectionTitle>⭐ Sản Phẩm Được Đánh Giá Tốt Nhất</SectionTitle>
                        <CardsContainer>
                            {topRatedProducts?.map((product) => (
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
