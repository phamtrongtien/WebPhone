import styled from "styled-components";

export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 700px;
  margin: 20px auto;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.6);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Thêm bóng cho hộp */
`;

export const WrapperLable = styled.label`
  color: #333;
  font-size: 14px;
  line-height: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const WrapperButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
`;

export const ButtonUpdate = styled.button`
  padding: 10px 20px;
  background: #64B5F6;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049; /* Đổi màu khi hover */
    transform: translateY(-2px); /* Hiệu ứng nâng nút khi hover */
  }

  &:active {
    background-color: #397d3a; /* Màu khi nhấn nút */
    transform: translateY(0); /* Trả về trạng thái ban đầu */
  }
`;
