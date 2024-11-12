import { Input } from 'antd'
import React from 'react'

const InputComponent = ({ size, placeholder, style, ...rests }) => {
    return (
        <Input
            size={size}
            placeholder={placeholder}

            style={style}
            {...rests}
            variant="filled"
        />


    )
}

export default InputComponent
