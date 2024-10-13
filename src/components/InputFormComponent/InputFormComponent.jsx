import { Input } from 'antd'
import React from 'react'

const InputFormComponent = ({ props }) => {

    const { placeholder = 'Nhập text' } = props;
    return (
        <div>
            <Input placeholder={placeholder} />
        </div>
    )
}

export default InputFormComponent
