import { Drawer } from 'antd'
import React, { Children } from 'react'

const DrawerComponent = ({ Children, title = 'Drawer', placement = 'right', isOpen = false, ...rests }) => {
    return (
        <>

            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {Children}
            </Drawer>
        </>
    )
}

export default DrawerComponent
