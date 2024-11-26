import React, { useState, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperRow, WrapperCol, WrapperProducts, WrapperPagination } from './style';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import * as ProductService from '../../services/ProductService';

const TypeProductPage = () => {
    const { type } = useParams();
    const { state } = useLocation();
    const [products, setProducts] = useState([]); // Khởi tạo mặc định là mảng rỗng
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await ProductService.getProductType(type || state);
                if (response && response.status === 'OK') {
                    setProducts(response.data || []);
                    console.log(products)// Đảm bảo dữ liệu luôn là mảng
                    setTotalProducts(response.data.total || 0);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
                setProducts([]); // Đặt lại thành mảng rỗng nếu có lỗi
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [type, state]);

    const onChangePage = async (page) => {
        setCurrentPage(page);
        setLoading(true);
        try {
            const response = await ProductService.getProductAll(type || state, page);
            if (response && response.status === 'OK') {
                setProducts(response.data.products || []);
            }
        } catch (error) {
            console.error('Lỗi khi thay đổi trang:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <WrapperRow>
                <WrapperCol span={4}>
                    <NavBarComponent />
                </WrapperCol>
                <WrapperCol
                    span={20}
                    style={{
                        padding: '0 120px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        background: 'rgba(255, 255, 255, 0.54)',
                    }}
                >
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <WrapperProducts>
                            {products && products.length > 0 ? ( // Kiểm tra products trước khi gọi .length
                                products.map((product) => (
                                    <CardComponent key={product.id} product={product} />
                                ))
                            ) : (
                                <div>Không có sản phẩm</div>
                            )}
                        </WrapperProducts>
                    )}
                    <WrapperPagination
                        current={currentPage}
                        total={totalProducts}
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
