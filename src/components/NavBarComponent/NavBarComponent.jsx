import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WrapperNavbar, WrapperContent, WrapperLableText, WrapperTextPrice } from './style';
import { Checkbox, Rate } from 'antd';
import * as ProductService from '../../services/ProductService';
import TypeProduct from '../TypeProduct/TypeProduct';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const NavBarComponent = ({ onPriceFilter, onStarFilter }) => {
    const [value, setValue] = useState(3); // Default star rating value is 3
    const [typeProduct, setTypeProduct] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
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
            const priceRanges = [
                { range: 'Dưới 1 triệu', filter: (item) => item.price < 1_000_000 },
                { range: 'Từ 2 triệu đến 5 triệu', filter: (item) => item.price >= 2_000_000 && item.price <= 5_000_000 },
                { range: 'Trên 5 triệu', filter: (item) => item.price > 5_000_000 }
            ];
            const types = [...new Set(products.map((item) => item.type))].sort();

            setProductData({
                text: types,
                checkbox: products.map((item) => ({ value: item.id, label: item.category })),
                star: products.map((item) => item.rating),
                price: priceRanges
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
            setIsExpanded(false); // Hide the "See more" button if clicked outside
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    // Handle star filter change
    const handleStarFilterChange = (star) => {
        setValue(star); // Update the value immediately
        if (onStarFilter) {
            onStarFilter(star); // Pass the selected star filter to the parent
        }
    };

    // Handle toggle expand
    const handleToggleExpand = () => setIsExpanded(true);

    // Handle price filter click
    const handlePriceClick = (priceFilter) => {
        if (onPriceFilter) {
            onPriceFilter(priceFilter); // Pass the price filter to the parent
        }
    };

    // Render content based on type
    const renderContent = (type) => {
        switch (type) {
            case 'Danh mục':
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
                        onChange={handleStarFilterChange}
                        value={value} // Ensure value is updated
                    />
                );
            case 'price':
                return productData.price.map((range, index) => (
                    <div
                        key={index}
                        style={{ cursor: 'pointer', marginBottom: '8px', color: '#007bff' }}
                        onClick={() => handlePriceClick(range.filter)} // Handle price filter
                    >
                        {range.range}
                    </div>
                ));
            default:
                return null;
        }
    };

    return (
        <WrapperNavbar>
            {['Danh mục', 'star', 'price'].map((type, i) => (
                <React.Fragment key={type}>
                    <WrapperContent
                        style={{ cursor: 'pointer' }}
                        ref={type === 'text' ? wrapperRef : null} // Attach ref to the label 1 section
                    >
                        <WrapperLableText>{type}</WrapperLableText>{renderContent(type)}
                    </WrapperContent>
                </React.Fragment>
            ))}
        </WrapperNavbar>
    );
};

export default NavBarComponent;
