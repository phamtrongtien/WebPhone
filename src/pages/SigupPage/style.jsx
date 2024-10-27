import styled from "styled-components";

// Animation for flipping


export const WrapperOuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
`;

export const WrapperCard = styled.div`
  width: 800px;
  height: 445px;
  border-radius: 6px;
  display: flex;
  overflow: hidden;
  perspective: 1000px; // Thêm chiều sâu cho hiệu ứng lật
  transform-style: preserve-3d; // Bảo toàn các kiểu biến đổi 3D

  // Hiệu ứng lật
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  transition: transform 0.3s; // Thời gian lật
`;

export const WrapperInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  backface-visibility: hidden; // Ẩn mặt sau
`;

export const WrapperContainerLeft = styled.div`
  padding: 20px;
  flex: 1;
  background: white; // Nền cho mặt trước
`;

export const WrapperContainerRight = styled.div`
  flex: 0.75;
  background: #d6f0ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  backface-visibility: hidden; // Ẩn mặt sau
`;

export const WrapperImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WrapperTextLight = styled.span`
  color: #89c8f2;
  font-size: 11px;
  cursor: pointer;
`;

export const WrapperHeader = styled.h1`
  color: rgb(255, 57, 69);
`;

export const WrapperLoginButton = styled.div`
  /* margin-top: 20px; */
`;
