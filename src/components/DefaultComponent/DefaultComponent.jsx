import React from 'react'
import HeaderComponent from '../HeadrComponent/HeaderComponent'

const DefaultComponent = ({ children }) => {
    return (
        <div>
            <HeaderComponent />
            <div>{children}</div>
        </div>
    )
}

export default DefaultComponent
