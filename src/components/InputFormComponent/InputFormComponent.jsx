import { Input } from 'antd';
import React, { useState } from 'react';
import { WrapperInputStyle } from './style'; // Đảm bảo rằng WrapperInputStyle đã được định nghĩa đúng
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const InputFormComponent = ({ placeholder, type = 'text', ...rests }) => {
    const [valueInput, setValueInput] = useState('');

    const handleChange = (e) => {
        setValueInput(e.target.value); // Cập nhật giá trị của input
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            {type === 'password' ? (
                <Input.Password
                    placeholder={placeholder}
                    value={valueInput}
                    onChange={handleChange}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    {...rests}
                />
            ) : (
                <WrapperInputStyle
                    placeholder={placeholder}
                    value={valueInput}
                    onChange={handleChange}
                    {...rests}
                />
            )}
        </div>
    );
};

export default InputFormComponent;
