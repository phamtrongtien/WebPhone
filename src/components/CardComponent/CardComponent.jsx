import React from 'react';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons';
import like from '../../assets/img/like.png';
import { useNavigate } from 'react-router-dom';
import { converPrice } from '../../utils';

const CardComponent = ({ product }) => {
    const navigate = useNavigate();

    // Function to navigate to the product detail page
    const handleCardDetail = (id) => {
        navigate(`/product/details/${id}`);
    };

    return (
        <WrapperCardStyle
            onClick={() => product.countInStock !== 0 && handleCardDetail(product._id)}  // Call the function on click
            hoverable
            style={{ width: '180px', position: 'relative' }}
            cover={<img alt={product.name} src={product.image} />}
            disabled={product.countInStock === 0}
        >
            <img
                src={like}
                alt="like"
                style={{
                    width: '20px',
                    height: "20px",
                    position: 'absolute',
                    top: 10, left: 10,
                    zIndex: 10, // Đảm bảo biểu tượng "like" luôn nằm trên hình ảnh
                }}
            />
            <StyleNameProduct>{product.name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ margin: '4px' }}>
                    <span>{product.rating.toFixed(2)}</span>
                    <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span>| Đã bán {product.selled}+</span>
            </WrapperReportText>
            <WrapperPriceText>
                {converPrice(product)}VNĐ
                <WrapperDiscountText> -{product.discount}%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent;
