import { Col, Image, Button, Rate, message, Input, List, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { WrapperAddressProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperProductDetail, WrapperStyleNameProduct, WrapperStyleTextSale, WrapperQualityProduct, CommentSection, CommentTitle, CommentTextArea, SubmitButton, CommentList, CommentItem, CommentAuthor, CommentDate, CommentText, PaginationWrapper } from "./style";
import { WrapperDiscountText, WrapperReportText } from "../CardComponent/style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import * as FeedbackService from '../../services/FeedBackService';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slices/orderSlice";
import { converPrice } from "../../utils";
import axios from "axios";

const ProductDetailComponent = ({ productId }) => {
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState(""); // User comment
  const [comments, setComments] = useState([]); // All comments
  const [currentPage, setCurrentPage] = useState(1); // Current page for comments
  const [pageSize] = useState(5); // Number of comments per page

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productId) return;

    const getCommentsByProductId = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/feedback/get/${productId}`);
        setComments(res.data); // Assuming the response is in the 'data' property
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    getCommentsByProductId();
  }, [productId, comment]);


  // Hàm xóa bình luận
  const handleDeleteComment = async (commentId) => {
    try {
      // Gọi API để xóa bình luận
      await FeedbackService.deleteComment(commentId); // Thực hiện xóa bình luận qua API

      // Cập nhật lại danh sách bình luận
      setComments(comments.filter((comment) => comment._id !== commentId));
      message.success("Bình luận đã được xóa thành công!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      message.error("Có lỗi xảy ra khi xóa bình luận.");
    }
  };
  // Fetch product details
  const fetchGetDetailsProduct = async ({ queryKey }) => {
    const id = queryKey[1];
    const res = await ProductService.getProductById(id);
    return res.data;
  };

  const updateRating = useMutation({
    mutationFn: (rating) => ProductService.updateProductRating(productId, rating, user.id),
    onSuccess: () => {
      message.success("Đánh giá thành công!");
    },
    onError: () => {
      message.warning("Người dùng đã đánh giá sản phẩm này rồi");
    },
  });

  const handleAddComment = async () => {
    if (!user.id) {
      message.warning("Vui lòng đăng nhập để bình luận!");
      navigate("/sig-in", { state: location.pathname });
      return;
    }

    if (!comment.trim()) {
      message.warning("Vui lòng nhập bình luận trước khi gửi!");
      return;
    }

    try {
      const newComment = await FeedbackService.addComment(productId, user.id, comment);
      setComments([...comments, newComment]);
      setComment(""); // Clear comment input after successful submission
      message.success("Gửi bình luận thành công!");
    } catch (error) {
      console.error("Error adding comment:", error);
      message.error("Có lỗi xảy ra khi gửi bình luận.");
    }
  };

  const { isLoading: isLoadingProduct, isError, error, data: products } = useQuery({
    queryKey: ["products-details", productId],
    queryFn: fetchGetDetailsProduct,
    enabled: !!productId,
  });

  if (isLoadingProduct) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const increaseQuantity = () => {
    if (quantity < products.countInStock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleRatingChange = (value) => {
    if (!user.id) {
      message.warning("Vui lòng đăng nhập để đánh giá sản phẩm!");
      navigate("/sig-in", { state: location.pathname });
      return;
    }
    setUserRating(value);
    updateRating.mutate(value);
  };

  const handleAddOrder = () => {
    if (!user.id) {
      navigate("/sig-in", { state: location.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: products.name,
            amount: quantity,
            image: products.image,
            price: products.price,
            product: products?._id,
          },
        })
      );
    }
  };

  // Paginate the comments
  const paginatedComments = comments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <WrapperProductDetail>
      <Col span={10}>
        <Image src={products.image} alt="Product Image" style={{ width: "500px" }} />
      </Col>
      <Col span={14} style={{ paddingLeft: "10px" }}>
        <WrapperStyleNameProduct>{products.name}</WrapperStyleNameProduct>
        <WrapperAddressProduct>{products.description}</WrapperAddressProduct>

        <div>
          <span>Đánh giá sản phẩm: </span>
          <Rate value={userRating} onChange={handleRatingChange} />
        </div>

        <WrapperReportText>
          <span>{products.rating.toFixed(2)}</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
          <WrapperStyleTextSale>| Đã bán {products.selled}</WrapperStyleTextSale>
        </WrapperReportText>

        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            {converPrice(products)} VNĐ
            <WrapperDiscountText> -{products.discount} %</WrapperDiscountText>
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>

        <div style={{ marginBottom: "10px" }}>
          <div style={{ margin: "10px 0 20px", padding: "10px 0" }}>
            <div>Số lượng còn lại: {products.countInStock}</div>
            <WrapperQualityProduct>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button icon={<MinusOutlined />} onClick={decreaseQuantity} disabled={quantity <= 1} />
                <span style={{ margin: "0 8px" }}>{quantity}</span>
                <Button icon={<PlusOutlined />} onClick={increaseQuantity} />
              </div>
            </WrapperQualityProduct>
          </div>

          <ButtonComponent
            size={40}
            styleButton={{
              background: "rgb(255, 57, 69)",
              height: "48px",
              width: "200px",
            }}
            onClick={handleAddOrder}
            textButton="Chọn Mua"
            styleTextButton={{ color: "white" }}
          />
        </div>


      </Col>
      <div>
        <CommentSection>
          <CommentTitle>Bình luận</CommentTitle>
          <CommentTextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Viết bình luận..."
          />
          <SubmitButton
            type="primary"
            onClick={handleAddComment}
            style={{ marginTop: "10px" }}
          >
            Gửi bình luận
          </SubmitButton>

          <CommentList
            dataSource={paginatedComments}
            renderItem={(item) => (
              <CommentItem key={item._id}>
                <div>
                  <CommentAuthor>{item.user.name || 'Unknown User'}</CommentAuthor>
                  <CommentText>{item.comment}</CommentText>
                  <CommentDate>{new Date(item.date).toLocaleString()}</CommentDate>
                </div>

                {/* Chỉ hiển thị nút xóa nếu user.id và item.user._id trùng */}
                {item.user._id === user.id && (
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDeleteComment(item._id)}
                  >
                    Xóa bình luận
                  </Button>
                )}
              </CommentItem>
            )}
          />

          <PaginationWrapper
            current={currentPage}
            total={comments.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
          />
        </CommentSection>
      </div>
    </WrapperProductDetail>


  );
};

export default ProductDetailComponent;
