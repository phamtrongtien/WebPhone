import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputsearch = (props) => {
    const { size, placeholder, bordered, textButton, backgroundColorInput = "white", backgroundColorButton = '#89c8f2' } = props;
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={false}
                style={{ backgroundColor: backgroundColorInput, borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined />}
                styleButton={{ backgroundColor: backgroundColorButton, borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', border: !bordered && 'none' }}
                textButton={textButton}
                styleTextButton={{ color: 'white' }}
            >


            </ButtonComponent>
        </div>
    )
}

export default ButtonInputsearch
