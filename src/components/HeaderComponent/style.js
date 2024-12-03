import { Row } from "antd";
import styled from "styled-components"
export const Wrapperheader = styled(Row)`
    padding: 10px 120px;
    background: rgba(255, 255, 255, 0.6);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0; /* Đặt vị trí cố định ở đầu trang */
    z-index: 1000; /* Đảm bảo header luôn ở trên các phần tử khác */
`;
export const WrapperTextHeader = styled.span`
font-size: 18px;
color: black;
font-weight: bold;
cursor: pointer;
`
export const WrapperAccout = styled.div`
display: flex;
align-items: center;
color: black;
gap:10px;
cursor: pointer;
font-size: 12px;
`
export const WrapperTextHeaderSmall = styled.span`
font-size: 12px;
color:black;
white-space: nowrap;
`