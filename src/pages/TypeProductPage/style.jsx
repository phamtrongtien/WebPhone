import styled from "styled-components";
import { Row, Col, Pagination } from 'antd';

export const WrapperRow = styled(Row)`
    padding: 0 120px;
    flex-wrap: nowrap;
    
`;

export const WrapperCol = styled(Col)`
    /* Thêm margin bên phải cho cột NavBar */
    &:first-child {
        margin-right: 20px; /* Thay đổi giá trị này để điều chỉnh khoảng cách */
    }
border-radius: 20px;
`;
export const WrapperProducts = styled.div`
    margin: 10px;
    display: flex;
    flex-wrap: wrap; // Cho phép các card wrap nếu cần
    gap: 20px; // Khoảng cách giữa các card
    padding: 10px; // Khoảng cách trên của các card
`;


export const WrapperPagination = styled(Pagination)`
padding: 10px;
`