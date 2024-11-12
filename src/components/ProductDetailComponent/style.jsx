import styled from "styled-components";
import { Image, Row, Col } from "antd";

export const WrapperImageSmall = styled(Image)`
  height: 64px;
  width: 64px;
`;

export const WrapperColImage = styled(Col)`
  flex-basis: unset;
`;

export const WrapperStyleNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 300;
  line-height: 32px;
  word-break: break-word;
`;

export const WrapperStyleTextSale = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperPriceProduct = styled.div`
  background: rgb(250, 250, 250);
  border-radius: 4px;
`;

export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
  padding: 10px;
`;

export const WrapperAddressProduct = styled.div`
  span.address {
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  span.change-address {
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    color: rgb(11, 116, 229);
    flex-shrink: 0;
  }
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  width: 100px;
`;

export const WrapperProductDetail = styled(Row)`
  background: rgb(255, 255, 255, 0.54);
  padding: 16px;
  border-radius: 20px;
`;
