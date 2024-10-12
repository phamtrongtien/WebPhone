import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';

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

    return (
        <div>
            <Slider {...settings}>
                {arrImages.map((img, index) => (
                    <Image src={img} alt="slider" preview={false} style={{ width: "100%", height: '50px', objectFit: 'cover' }} key={index} />
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
