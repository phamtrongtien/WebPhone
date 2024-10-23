import { Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { WrapperInputStyle } from './style'; // Đảm bảo rằng WrapperInputStyle đã được định nghĩa đúng
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const InputFormComponent = ({ placeholder, type = 'text', value, onChange, ...restProps }) => {
    const [valueInput, setValueInput] = useState(value || '');

    useEffect(() => {
        setValueInput(value);
    }, [value]); // Cập nhật giá trị khi props value thay đổi

    const handleChange = (e) => {
        setValueInput(e.target.value); // Cập nhật giá trị của input
        onChange(e.target.value); // Gọi hàm onChange từ component cha để truyền giá trị
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            {type === 'password' ? (
                <Input.Password
                    placeholder={placeholder}
                    value={valueInput}
                    onChange={handleChange}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    {...restProps}
                />
            ) : (
                <WrapperInputStyle
                    placeholder={placeholder}
                    value={valueInput}
                    onChange={handleChange}
                    {...restProps}
                />
            )}
        </div>
    );
};

export default InputFormComponent;
