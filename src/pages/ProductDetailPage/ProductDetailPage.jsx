import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'

const ProductDetailPage = () => {
    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            <h5 style={{ margin: '0px' }}>Trang chủ</h5>
            <div >
                <ProductDetailComponent />
            </div>
            <FooterComponent />

        </div>
    )
}

export default ProductDetailPage
