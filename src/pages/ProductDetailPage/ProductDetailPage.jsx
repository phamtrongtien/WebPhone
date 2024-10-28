import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'

const ProductDetailPage = () => {
    return (
        <>
            <div style={{ padding: '0 120px', background: 'rgba(255, 255, 255, 0.0001)' }}>
                <h3 style={{ margin: '20px', padding: '10px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.54)' }}>Trang chủ</h3>
                <div style={{ margin: '20px' }}>
                    <ProductDetailComponent />
                </div>

            </div>
            <FooterComponent />
        </>


    )
}

export default ProductDetailPage
