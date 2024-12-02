import { Card } from "antd";
import styled from "styled-components";

export const StyleNameProduct = styled.div`
 font-size: 12px;
 font-weight: 400;
 line-height: 16px;
 color: rgb(56,56,61);
 margin-bottom: 4px;
`
export const WrapperCardStyle = styled(Card)`
width: 200px;
& img{
    height: 180px;
    width: 200px;
}
position: relative;
background-color: ${props => props.disabled ? '#ccc' : '#fff'};
cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`
export const WrapperReportText = styled.div`
font-size: 10px;
color: rpg(128,128,137);
display: flex;
align-items: center;
`

export const WrapperPriceText = styled.div`
color: rgb(255,66,78);
font-size: 16px;
font-weight: 500;
margin: 6px 0px 4px;
`
export const WrapperDiscountText = styled.span`
color: rgb(255,66,78);
font-size: 12px;
font-weight: 400;
`

export const WrapperStyleTextSale = styled.span`
font-size:15px;
line-height: 24px;
color: rgb(120,120,120);
`