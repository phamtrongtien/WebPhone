import { Col, Image, Row, Button, Select } from "antd";
import React, { useState } from "react";
import conan from "../../assets/img/conan.webp";
import conanDetail from "../../assets/img/conanDetail.webp";
import conanDetail1 from "../../assets/img/conanDetail1.webp";
import {
  WrapperAddressProduct,
  WrapperColImage,
  WrapperImageSmall,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperProductDetail,
  WrapperStyleNameProduct,
  WrapperStyleTextSale,
  WrapperQualityProduct,
} from "./style";
import { WrapperDiscountText, WrapperReportText } from "../CardComponent/style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailComponent = () => {
  const [quantity, setQuantity] = useState(3); // Số lượng mặc định là 3
  const [selectedColor, setSelectedColor] = useState("Red"); // Màu mặc định

  // Hàm giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1); // Điều kiện giảm không thấp hơn 1
  };

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1); // Tăng số lượng lên 1
  };

  // Hàm chọn màu sắc
  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  return (
    <WrapperProductDetail>
      <Col span={10}>
        <Image src={conan} alt="conan" />
        <Row style={{ flexWrap: "nowrap", paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperColImage span={4}>
            <WrapperImageSmall src={conanDetail1} alt="dt1" />
          </WrapperColImage>
          <WrapperColImage span={4}>
            <WrapperImageSmall src={conanDetail} alt="dt1" />
          </WrapperColImage>
          <WrapperColImage span={4}>
            <WrapperImageSmall src={conanDetail1} alt="dt1" />
          </WrapperColImage>
          <WrapperColImage span={4}>
            <WrapperImageSmall src={conanDetail} alt="dt1" />
          </WrapperColImage>
          <WrapperColImage span={4}>
            <WrapperImageSmall src={conanDetail1} alt="dt1" />
          </WrapperColImage>
        </Row>
      </Col>
      <Col span={14} style={{ paddingLeft: "10px" }}>
        <WrapperStyleNameProduct>
          Conan Hoạt Hình Màu - Kẻ Hành Pháp Zero Tập 1
        </WrapperStyleNameProduct>
        <WrapperReportText>
          <span style={{ margin: "4px" }}>
            <span>4.96</span>
            <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
          </span>
          <WrapperStyleTextSale>| Đã bán 1000+</WrapperStyleTextSale>
        </WrapperReportText>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            200000đ
            <WrapperDiscountText> -5%</WrapperDiscountText>
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span> Giao đến</span>
          <span className="address"> Mộ Lao, Hà Đông, Hà Nội</span>
          <span className="change-address">-Đổi địa chỉ</span>

          <p>Với nội dung lôi cuốn và hấp dẫn</p>
        </WrapperAddressProduct>

        {/* Thêm lựa chọn màu sắc */}
        <div style={{ marginBottom: "10px" }}>
          <span style={{ fontSize: "16px", fontWeight: "500" }}>Chọn Màu: </span>
          <Select
            defaultValue={selectedColor}
            style={{ width: 120 }}
            onChange={handleColorChange}
          >
            <Select.Option value="Red">Đỏ</Select.Option>
            <Select.Option value="Blue">Xanh Dương</Select.Option>
            <Select.Option value="Black">Đen</Select.Option>
            <Select.Option value="White">Trắng</Select.Option>
          </Select>
        </div>

        {/* Chỉnh sửa số lượng */}
        <div style={{ margin: "10px 0 20px", padding: "10px 0", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
          <div style={{ marginBottom: "5px" }}>
            Số lượng
          </div>
          <WrapperQualityProduct>
            {/* Điều chỉnh số lượng với button - và + */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                icon={<MinusOutlined />}
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                style={{ marginRight: 8 }}
              />
              <span style={{ margin: "0 8px" }}>{quantity}</span>
              <Button
                icon={<PlusOutlined />}
                onClick={increaseQuantity}
                style={{ marginLeft: 8 }}
              />
            </div>
          </WrapperQualityProduct>
        </div>

        {/* Nút mua */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ButtonComponent
            size={40}
            styleButton={{
              background: "rgb(255, 57, 69)",
              height: "48px",
              width: "200px",
            }}
            textButton="Chọn Mua"
            styleTextButton={{ color: "white" }}
          ></ButtonComponent>
          <ButtonComponent
            size={40}
            styleButton={{
              background: "white",
              height: "48px",
              width: "200px",
              border: "1px solid rgb(13,92,182)",
            }}
            textButton="Mua Trả sau lãi suất 0%"
            styleTextButton={{ color: "rgb(13,92,182)", fontSize: "15px" }}
          ></ButtonComponent>
        </div>
      </Col>
    </WrapperProductDetail>
  );
};

export default ProductDetailComponent;
