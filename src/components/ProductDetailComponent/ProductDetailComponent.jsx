import { Col, Image, Row, Button, Select, Rate } from "antd";
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
import * as ProductService from "../../services/ProductService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ProductDetailComponent = ({ productId }) => {
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1); // Số lượng mặc định là 3
  const [selectedColor, setSelectedColor] = useState("Red"); // Màu mặc định
  const [userRating, setUserRating] = useState(null); // Rating given by the user


  // Hàm lấy chi tiết sản phẩm
  const fetchGetDetailsProduct = async ({ queryKey }) => {
    const id = queryKey[1]; // Lấy productId từ queryKey
    const res = await ProductService.getProductById(id);
    return res.data;
  };
  const updateRating = useMutation({
    mutationFn: (rating) => ProductService.updateProduct(productId, rating),
    onSuccess: (updatedProduct) => {
      // Optionally, you can re-fetch the product to update the state with the latest rating
      console.log('Rating updated', updatedProduct);
    }
  });
  const { isLoading: isLoadingProduct, isError, error, data: products } = useQuery({
    queryKey: ['products-details', productId], // Đảm bảo productId được đưa vào queryKey
    queryFn: fetchGetDetailsProduct,
    enabled: !!productId, // Chỉ thực thi nếu productId có giá trị
  });

  if (isLoadingProduct) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const increaseQuantity = () => {
    if (quantity < products.countInStock) {
      setQuantity(quantity + 1); // Increase quantity if it doesn't exceed stock
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1); // Decrease quantity if it's greater than 1
  };


  // Hàm chọn màu sắc
  const handleColorChange = (value) => {
    setSelectedColor(value);
  };
  const handleRatingChange = (value) => {
    setUserRating(value);
    updateRating.mutate(value); // Update the rating on the server
  };
  const hasRated = userRating !== null;
  console.log("produt", products)
  return (
    <WrapperProductDetail>
      <Col span={10}>
        <Image src={products.image} alt="conan" style={{ width: '500px' }} />
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
          {products.name}
        </WrapperStyleNameProduct>
        <WrapperAddressProduct>
          {products.description}
          <p></p>
        </WrapperAddressProduct>
        {!hasRated && (
          <div>
            <span>Đánh giá sản phẩm: </span>
            <Rate value={userRating} onChange={handleRatingChange} />
          </div>
        )}
        <WrapperReportText>
          <span style={{ margin: "4px" }}>
            <span>{products.rating}</span>
            <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
          </span>
          <WrapperStyleTextSale>| Đã bán {products.selled}</WrapperStyleTextSale>
        </WrapperReportText>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            {products.price}đ
            <WrapperDiscountText> -{products.discount} %</WrapperDiscountText>
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>

        <WrapperAddressProduct>
          <span> Giao đến </span>
          <span className="address">{user.address}</span>
          <span className="change-address"> -Đổi địa chỉ </span>

        </WrapperAddressProduct>.
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
            Số lượng còn lại  {products.countInStock}
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
          />
          <ButtonComponent
            size={40}
            styleButton={{
              background: "white",
              height: "48px",
              width: "200px",
              border: "1px solid rgb(13,92,182)",
            }}
            textButton="Mua ngay"
            styleTextButton={{ color: "rgb(13,92,182)" }}
          />
        </div>
      </Col>
    </WrapperProductDetail>
  );
};

export default ProductDetailComponent;
