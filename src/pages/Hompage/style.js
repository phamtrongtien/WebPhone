import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

// Container chính của trang Home
export const HomePageContainer = styled.div`
    padding: 50px 100px;
    background: linear-gradient(
        106.37deg,
        #b3e5fc 29.63%, /* Lam nhạt */
        #c8e6c9 51.55%, /* Lục nhạt */
        #f1f8e9 90.85% /* Trắng xanh nhạt */
    );
    border-radius: 15px;
    color: #333333;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);

    &.blur {
        filter: blur(5px);
        pointer-events: none;
    }
`;

// Banner khuyến mãi
export const PromoBanner = styled.div`
    background: linear-gradient(90deg, #ff6a00, #ff9e2c);
    color: #fff;
    padding: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    border-radius: 15px;
    margin-bottom: 40px;
    box-shadow: 0 10px 25px rgba(255, 94, 0, 0.3);
    position: relative;
    overflow: hidden;
    transition: transform 0.5s ease, box-shadow 0.5s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(255, 94, 0, 0.5);
    }

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 70%);
        animation: rotate 5s linear infinite;
        transform: translate(-50%, -50%);
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg) translate(-50%, -50%);
        }
        100% {
            transform: rotate(360deg) translate(-50%, -50%);
        }
    }
`;

// Wrapper cho các loại sản phẩm
export const WrapperTypeProduct = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 30px;
    padding: 20px;
    margin: 30px 0;
   
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
`;

// Container cho các thẻ sản phẩm
export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    margin: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.3) 100%);
        opacity: 0.6;
        pointer-events: none;
    }
`;

// Card sản phẩm riêng lẻ
export const CardComponent = styled.div`
    background: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    padding: 20px;
    width: 300px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin-bottom: 15px;
    }

    h3 {
        font-size: 18px;
        color: #333;
        margin-bottom: 10px;
        text-transform: capitalize;
    }

    p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
    }
`;

// Nút "Xem thêm"
export const WrapperButtonMore = styled(ButtonComponent)`
    display: inline-block;
    padding: 15px 30px;
    border: none;
    color: #fff;
    background: linear-gradient(90deg, #00c6ff, #0072ff);
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, #0072ff, #00c6ff);
        transform: translateY(-5px) scale(1.05);
        box-shadow: 0 6px 20px rgba(0, 114, 255, 0.6);
    }
`;

// Tiêu đề cho từng phần
export const SectionTitle = styled.h2`
    font-size: 28px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 30px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    position: relative;

    &::after {
        content: "";
        display: block;
        width: 80px;
        height: 4px;
        margin: 10px auto 0;
        background: linear-gradient(90deg, #00c6ff, #0072ff);
    }
`;

// Phần sản phẩm theo nhu cầu
export const NeedSection = styled.div`
    margin-top: 50px;
    background: rgba(255, 255, 255, 0.7);
    padding: 50px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
`;

// Wrapper cho tiêu đề từng sản phẩm
export const WrapperTitleProduct = styled.h2`
    display: inline-block;
    background: rgba(255, 255, 255, 0.7);
    padding: 15px 25px;
    border-radius: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.9);
    }
`;
