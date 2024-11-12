import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperRow, WrapperCol, WrapperProducts, WrapperPagination } from './style'; // Import styled components
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import * as ProductService from '../../services/ProductService'; // Giả sử bạn có service để lấy sản phẩm theo loại

const TypeProductPage = () => {
    const { type } = useParams(); // Lấy loại sản phẩm từ URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Hàm lấy sản phẩm theo loại và trang
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await ProductService.getProductAll(type, currentPage); // Gọi API lấy sản phẩm
                setProducts(response.data); // Giả sử API trả về { data: [...] }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [type, currentPage]);

    const onChangePage = (page) => {
        setCurrentPage(page); // Cập nhật trang hiện tại
    };

    return (
        <Fragment>
            <WrapperRow>
                <WrapperCol span={4}>
                    <NavBarComponent />
                </WrapperCol>
                <WrapperCol span={20} style={{ padding: '0 120px', marginTop: '10px', marginBottom: '10px', background: 'rgba(255, 255, 255, 0.54)' }}>
                    {loading ? (
                        <div>Loading...</div> // Hiển thị khi đang tải dữ liệu
                    ) : (
                        <WrapperProducts>
                            {products.length > 0 ? (
                                products.map(product => (
                                    <CardComponent key={product.id} product={product} />
                                ))
                            ) : (
                                <div>Không có sản phẩm</div> // Thông báo nếu không có sản phẩm
                            )}
                        </WrapperProducts>
                    )}
                    <WrapperPagination
                        current={currentPage}
                        total={100} // Bạn có thể lấy tổng số sản phẩm từ API nếu có
                        onChange={onChangePage}
                        style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                </WrapperCol>
            </WrapperRow>
            <FooterComponent />
        </Fragment>
    );
};

export default TypeProductPage;
