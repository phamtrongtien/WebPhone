import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

// Trang chính
export const HomePageContainer = styled.div`
    padding: 0 120px;
    margin-top: 20px;
    transition: filter 0.3s ease-in-out;
    background-color:none; /* Nền trắng */
    border-radius: 10px;
    color: #333; /* Văn bản màu tối cho dễ đọc */
    
    &.blur {
        filter: blur(5px);
        pointer-events: none;
    }
`;

// Phần banner khuyến mãi
export const PromoBanner = styled.div`
    background-color: rgba(0, 198, 255,0.5);
    color: #fff; /* Màu xanh sáng cho văn bản */
    padding: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    border-radius: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease-in-out;
    
    &:hover {
        transform: scale(1.05); /* Hiệu ứng zoom khi hover */
    }
`;

// Các loại sản phẩm
export const WrapperTypeProduct = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 24px;
    /* height: 60px; */
    background: #fff; /* Nền trắng */
    padding: 15px;
    margin: 20px 0;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

// Các thẻ sản phẩm
export const CardsContainer = styled.div`
  
    padding: 40px;
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
    background: #fff; /* Nền trắng */
    border-radius: 20px;
    margin: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }
`;

// Nút xem thêm
export const WrapperButtonMore = styled(ButtonComponent)`
    width: 240px;
    height: 38px;
    border: 1px solid #6ec1e4;
    color: #6ec1e4;
    border-radius: 4px;
    background: #fff; /* Nền trắng */
    font-weight: 500;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        color: #fff;
        background-color: #6ec1e4;
    }
`;

// Tiêu đề cho các phần
export const SectionTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333; /* Màu chữ tối */
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    transition: color 0.3s ease;
    
    &:hover {
        color: #00c6ff; /* Màu khi hover */
    }
`;

// Phần sản phẩm theo nhu cầu
export const NeedSection = styled.div`
    margin-top: 40px;
    background: rgba(255,255,255,0.4); /* Nền trắng */
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgba(255,255,255,0.7); /* Nền sáng hơn khi hover */
    }
`;

export const WrapperTitleProduct = styled.h2`
    display: inline-block;
    background: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 20px;
`;
