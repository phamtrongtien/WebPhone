import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WrapperContent, WrapperLableText, WrapperNavbar, WrapperTextPrice } from './style';
import { Checkbox, Rate } from 'antd';
import * as ProductService from '../../services/ProductService';
import TypeProduct from '../TypeProduct/TypeProduct';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const NavBarComponent = () => {
    const [value, setValue] = useState(3);
    const [typeProduct, setTypeProduct] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [productData, setProductData] = useState({
        text: [],
        checkbox: [],
        star: [],
        price: []
    });

    const wrapperRef = useRef(null); // Ref to detect clicks outside

    // Fetch product data
    const fetchAllProduct = useCallback(async () => {
        try {
            const response = await ProductService.getProductAll();
            const products = response.data || [];
            const priceRanges = {
                below1M: products.filter((item) => item.price < 1_000_000).map((item) => item.name),
                between2MTo5M: products.filter((item) => item.price >= 2_000_000 && item.price <= 5_000_000).map((item) => item.name),
                above5M: products.filter((item) => item.price > 5_000_000).map((item) => item.name)
            };
            const types = [...new Set(products.map((item) => item.type))].sort();

            setProductData({
                text: types,
                checkbox: products.map((item) => ({ value: item.id, label: item.category })),
                star: products.map((item) => item.rating),
                price: [
                    { range: 'Dưới 1 triệu', items: priceRanges.below1M },
                    { range: 'Từ 2 triệu đến 5 triệu', items: priceRanges.between2MTo5M },
                    { range: 'Trên 5 triệu', items: priceRanges.above5M }
                ]
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, []);

    // Fetch product types
    const fetchAllTypeProduct = useCallback(async () => {
        const response = await ProductService.getAllType();
        if (response.status === 'OK') {
            setTypeProduct(response.data);
        }
    }, []);

    useEffect(() => {
        fetchAllProduct();
        fetchAllTypeProduct();
    }, [fetchAllProduct, fetchAllTypeProduct]);

    // Handle click outside
    const handleClickOutside = useCallback((e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setShowAll(false); // Hide the "Xem thêm" button if clicked outside
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    // Handle toggle expand
    const handleToggleExpand = () => setIsExpanded(true);

    // Render content based on type
    const renderContent = (type) => {
        switch (type) {
            case 'text':
                const displayedTypes = isExpanded ? typeProduct : typeProduct.slice(0, 6);
                return (
                    <>
                        {displayedTypes.map((item, index) => (
                            <TypeProduct name={item} key={index} />
                        ))}
                        {typeProduct.length > 6 && !isExpanded && (
                            <span
                                onClick={handleToggleExpand}
                                style={{
                                    cursor: 'pointer',
                                    color: '#007bff',
                                    fontWeight: 'bold',
                                    marginLeft: '10px',
                                }}
                            >
                                Xem thêm
                            </span>
                        )}
                    </>
                );
            case 'star':
                return (
                    <Rate
                        tooltips={desc}
                        onChange={setValue}
                        value={value}
                    />
                );
            case 'price':
                return productData.price.map((range, index) => (
                    <div key={index}>
                        <strong>{range.range}</strong>
                        {range.items.length > 0 ? (
                            range.items.map((item, subIndex) => (
                                <WrapperTextPrice key={subIndex}>{item}</WrapperTextPrice>
                            ))
                        ) : (
                            <WrapperTextPrice>Không có sản phẩm</WrapperTextPrice>
                        )}
                    </div>
                ));
            default:
                return null;
        }
    };

    return (
        <WrapperNavbar>
            {['text', 'checkbox', 'star', 'price'].map((type, i) => (
                <React.Fragment key={type}>
                    <WrapperLableText>Label {i + 1}</WrapperLableText>
                    <WrapperContent
                        style={{ cursor: 'pointer' }}
                        ref={type === 'text' ? wrapperRef : null} // Attach ref to the label 1 section
                    >
                        {renderContent(type)}
                    </WrapperContent>
                </React.Fragment>
            ))}
        </WrapperNavbar>
    );
};

export default NavBarComponent;
