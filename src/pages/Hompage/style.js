import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const HomePageContainer = styled.div`
    padding: 0 120px;
`;

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    border-bottom: solid;
    height: 44px;
`;

export const CardsContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content:center; 
    gap: 20px;
    flex-wrap: wrap;
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
