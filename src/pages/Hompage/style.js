import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const HomePageContainer = styled.div`
    padding: 0 120px;
     transition: filter 0.3s ease-in-out;

    &.blur {
        filter: blur(5px);  /* Làm mờ nền khi quảng cáo xuất hiện */
        pointer-events: none;  /* Ngăn người dùng tương tác với trang khi quảng cáo đang hiển thị */
    }
`;

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
   
    height: 44px;
    background: rgba(255, 255, 255, 0.5);
    padding: 15px;
    margin: 10px;
    border-radius: 20px;
`;

export const CardsContainer = styled.div`
    margin-top: 20px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content:center; 
    gap: 20px;
    flex-wrap: wrap;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;

`;

export const WrapperButtonMore = styled(ButtonComponent)`
    width: 240px;
    height: 38px;
    border: 1px solid rgb(11,116,229);
    color: rgb(11,116,229);
    border-radius: 4px;
    background: white;

    &:hover {
        color: #fff;
        background-color: rgb(13, 92, 182);
    }
`;

export const WrapperTitleProduct = styled.h2`
    display: inline-block;
    background: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 20px;
`;
