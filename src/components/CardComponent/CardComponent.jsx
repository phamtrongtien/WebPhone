import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'
import like from '../../assets/img/like.png';


const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: '180px' }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img
                src={like}
                alt="like"
                style={{
                    width: '20px',
                    height: "20px",
                    position: 'absolute',
                    top: 0, left: 0,
                    borderTopLeftRadius: '3px'
                }} />
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReportText>
                <span style={{ margin: '4px' }}>
                    <span>4.96</span><StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span>| Đã bán 1000+</span>

            </WrapperReportText>
            <WrapperPriceText>1000000đ<WrapperDiscountText> -5%</WrapperDiscountText></WrapperPriceText>

        </WrapperCardStyle>
    )
}

export default CardComponent
