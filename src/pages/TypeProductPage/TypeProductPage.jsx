import React, { Fragment } from 'react';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperRow, WrapperCol, WrapperProducts } from './style'; // Import styled components
import { Pagination } from 'antd';
import FooterComponent from '../../components/FooterComponent/FooterComponent';


const TypeProductPage = () => {
    const onChange = (page) => {
        console.log(`Current Page: ${page}`);
    };

    return (
        <Fragment>
            <WrapperRow>
                <WrapperCol span={4}>
                    <NavBarComponent />
                </WrapperCol>
                <WrapperCol span={20} style={{ padding: '0 120px', background: '#efefef' }}>
                    <WrapperProducts>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts>
                    <Pagination
                        defaultCurrent={2}
                        total={100}
                        onChange={onChange}
                        style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                </WrapperCol>
            </WrapperRow>
            <FooterComponent />

        </Fragment>
    );
};

export default TypeProductPage;
