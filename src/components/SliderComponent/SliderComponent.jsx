import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const SliderComponent = ({ arrImages }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,           // Bật chế độ auto-play
        autoplaySpeed: 2000,     // Thời gian giữa các slide (3000 ms)
    };
    const SliderImage = styled.img`
    width: 640px; /* Đảm bảo slider chiếm toàn bộ chiều rộng */
    height: 361px; /* Chiều cao tự động để giữ tỷ lệ hình ảnh */
     /* Đảm bảo ảnh không bị méo */

    @media (max-width: 768px) {
        height: 200px; /* Giảm chiều cao khi màn hình nhỏ hơn 768px */
    }

    @media (max-width: 480px) {
        height: 150px; /* Giảm chiều cao khi màn hình nhỏ hơn 480px */
    }
`;

    return (
        <div>
            <Slider {...settings}>
                {arrImages.map((img, index) => (
                    <SliderImage src={img} alt="slider" preview={false} style={{ width: "100%", height: '50px', objectFit: 'cover' }} key={index} />
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
