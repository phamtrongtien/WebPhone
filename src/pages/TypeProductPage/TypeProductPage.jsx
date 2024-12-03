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
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [priceFilter, setPriceFilter] = useState(null); // Lưu bộ lọc giá
    const [starFilter, setStarFilter] = useState(null); // Lưu bộ lọc sao

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await ProductService.getProductType(type || state);
            if (response && response.status === 'OK') {
                let allProducts = response.data || [];

                // Lọc theo mức giá nếu có
                if (priceFilter) {
                    allProducts = allProducts.filter(priceFilter);
                }

                // Lọc theo sao nếu có
                if (starFilter) {
                    allProducts = allProducts.filter(starFilter);
                }

                setProducts(allProducts);
                setTotalProducts(allProducts.length);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [type, state, priceFilter, starFilter]); // Thêm starFilter vào dependency

    const handlePriceFilter = (filter) => {
        setPriceFilter(() => filter);
    };

    const handleStarFilter = (star) => {
        // Thiết lập bộ lọc sao dựa trên giá trị được chọn
        let starFilterFunc;
        switch (star) {
            case 5:
                starFilterFunc = (product) => product.rating >= 4.5; // Rating từ 4.5 trở lên
                break;
            case 4:
                starFilterFunc = (product) => product.rating >= 3.5 && product.rating < 4.5; // Rating từ 3.5 đến 4.4
                break;
            case 3:
                starFilterFunc = (product) => product.rating >= 2.5 && product.rating < 3.5; // Rating từ 2.5 đến 3.4
                break;
            case 2:
                starFilterFunc = (product) => product.rating >= 1.5 && product.rating < 2.5; // Rating từ 1.5 đến 2.4
                break;
            case 1:
                starFilterFunc = (product) => product.rating < 1.5; // Rating dưới 1.5
                break;
            default:
                starFilterFunc = null;
        }
        setStarFilter(() => starFilterFunc); // Cập nhật bộ lọc sao
    };

    const onChangePage = async (page) => {
        setCurrentPage(page);
        setLoading(true);
        try {
            const response = await ProductService.getProductAll(type || state, page);
            if (response && response.status === 'OK') {
                let allProducts = response.data.products || [];

                // Lọc theo mức giá nếu có
                if (priceFilter) {
                    allProducts = allProducts.filter(priceFilter);
                }

                // Lọc theo sao nếu có
                if (starFilter) {
                    allProducts = allProducts.filter(starFilter);
                }

                setProducts(allProducts);
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
                    <NavBarComponent onPriceFilter={handlePriceFilter} onStarFilter={handleStarFilter} />
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
                            {products.length > 0 ? (
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
