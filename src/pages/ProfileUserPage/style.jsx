import styled from "styled-components";

export const WrapperContentProfile = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  width: 1000px;
  margin: 20px auto;
  gap:30px;
  border-radius: 15px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)); /* Gradient nền nhẹ */
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Thêm bóng mờ */
`;

export const WrapperLable = styled.label`
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #0073e6; /* Đổi màu chữ khi hover */
  }
`;
export const WrapperHeaderF = styled.h1`
    margin-bottom: 10px;
    margin-right: 800px;
`;

export const WrapperInput = styled.div`
  display: flex;
  flex-wrap: wrap; /* Cho phép các phần tử wrap xuống dòng khi hết chỗ */
  gap: 20px; /* Khoảng cách giữa các trường */
  margin-bottom: 20px; /* Thêm khoảng cách dưới mỗi trường */
`;

export const WrapperButton = styled.div`
  margin-top: 30px; /* Tăng khoảng cách giữa các trường và nút */
  display: flex;
  justify-content: center; /* Căn giữa nút */
`;

export const ButtonUpdate = styled.button`
  padding: 12px 25px;
  background: #64b5f6;
  color: white;
  border: none;
  border-radius: 30px; /* Tạo nút bo tròn hơn */
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Thêm bóng cho nút */
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Tăng bóng khi hover */
  }

  &:active {
    background-color: #397d3a;
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Trở lại bóng ban đầu khi click */
  }
`;

