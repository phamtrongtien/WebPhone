
import React, { useState } from 'react';
import { WrapperContent, WrapperLableText, WrapperNavbar, WrapperTextPrice, WrapperTextValue } from './style';
import { Checkbox, Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const NavBarComponent = () => {
    const [value, setValue] = useState(3);

    const renderContent = (type, options) => {
        const components = {
            text: options.map((option, index) => (
                <WrapperTextValue key={index}>{option}</WrapperTextValue>
            )),
            checkbox: (
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }} onChange={(checkedValues) => console.log('Checked values:', checkedValues)}>
                    {options.map((option) => (
                        <Checkbox key={option.value} value={option.value}>
                            {option.label}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            ),
            star: options.map((_, index) => (
                <Rate key={index} tooltips={desc} onChange={setValue} value={value} />
            )),
            price: options.map((option, index) => (
                <WrapperTextPrice key={index}>{option}</WrapperTextPrice>
            ))
        };
        return components[type] || null;
    };

    return (
        <WrapperNavbar>
            {['text', 'checkbox', 'star', 'price'].map((type, i) => (
                <React.Fragment key={i}>
                    <WrapperLableText>Label{i + 1}</WrapperLableText>
                    <WrapperContent>
                        {renderContent(type, {
                            text: ['Tủ lạnh', 'TV', 'Máy giặt'],
                            checkbox: [
                                { value: 'a', label: 'A' },
                                { value: 'b', label: 'B' }
                            ],
                            star: ['3'],
                            price: ['dưới 40', 'từ 40 đến 50', 'trên 50']
                        }[type])}
                    </WrapperContent>
                </React.Fragment>
            ))}
        </WrapperNavbar>
    );
};

export default NavBarComponent;
