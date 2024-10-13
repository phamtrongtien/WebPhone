import React from 'react';
import { StarFilled } from '@ant-design/icons';
import { WrapperReportText } from './style'; // Import style từ file style

const RatingComponent = () => {
    return (
        <WrapperReportText>
            <span style={{ margin: '4px' }}>
                <span>4.96</span><StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
            </span>
            <span>| Đã bán 1000+</span>
        </WrapperReportText>
    );
};

export default RatingComponent;
