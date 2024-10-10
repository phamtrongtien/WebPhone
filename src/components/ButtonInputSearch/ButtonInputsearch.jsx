import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'

const ButtonInputsearch = (props) => {
    const { size, placeholder, bordered, textButton, backgroundColorInput = "white", backgroundColorButton = 'rgb(50,120,200)' } = props;
    return (
        <div style={{ display: 'flex' }}>
            <Input
                size={size}
                placeholder={placeholder}
                bordered={false}
                style={{ backgroundColor: backgroundColorInput, borderRadius: '0px', border: bordered ? bordered : false }} />
            <Button
                size={size}
                bordered={false}
                icon={<SearchOutlined />}
                style={{ backgroundColor: backgroundColorButton, borderRadius: '0px', border: bordered ? bordered : false }}>
                <span style={{ color: 'white' }}>
                    {textButton}
                </span>
            </Button>
        </div>
    )
}

export default ButtonInputsearch
