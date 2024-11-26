import React from 'react';
import { useNavigate } from 'react-router-dom';

const TypeProduct = ({ name }) => {
    const navigate = useNavigate();

    const handleNavigateType = (type) => {
        const normalizedType = type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_');
        // Đặt đối tượng state bên ngoài template string
        navigate(`/product/${normalizedType}`, { state: type });
    };

    return (
        <div
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigateType(name)} // Sử dụng arrow function
        >
            {name}
        </div>
    );
};

export default TypeProduct;
