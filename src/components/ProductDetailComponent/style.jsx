import styled from "styled-components";
import { Image, Row, Col, Input, Button, List, Pagination } from "antd";

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

export const CommentSection = styled.div`
  margin-top: 30px;
  padding: 20px;
`;

export const CommentTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const CommentTextArea = styled(Input.TextArea)`
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 12px;
  font-size: 1rem;
  width: 100%;
  resize: none;
  margin-bottom: 10px;
  &:focus {
    border-color: #4e9df5;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #4e9df5;
  color: white;
  height: 40px;
  width: 200px;
  font-size: 1rem;
  &:hover {
    background-color: #357ab7;
  }
`;

export const CommentList = styled(List)`
  margin-top: 20px;
`;

export const CommentItem = styled(List.Item)`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const CommentAuthor = styled.strong`
  font-size: 1.5rem;
  margin-left: 3px;
  color: #333;
`;

export const CommentDate = styled.span`
  font-size: 0.9rem;
  color: #888;
  margin-left: 10px;


`;

export const CommentText = styled.p`
  font-size: 1.5rem;
  color: #444;
  margin-left: 15px;
  margin-top:0px;
  margin-bottom: 0px;
`;

export const PaginationWrapper = styled(Pagination)`
  margin-top: 20px;
  text-align: center;
`;