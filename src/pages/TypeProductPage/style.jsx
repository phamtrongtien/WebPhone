import styled from "styled-components";
import { Row, Col } from 'antd';

export const WrapperRow = styled(Row)`
    padding: 0 120px;
    flex-wrap: nowrap;
`;

export const WrapperCol = styled(Col)`
    
    /* Thêm margin bên phải cho cột NavBar */
    &:first-child {
        margin-right: 20px; /* Thay đổi giá trị này để điều chỉnh khoảng cách */
    }
`;
