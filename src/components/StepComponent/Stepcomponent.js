import { Steps } from 'antd';
import React from 'react';

const StepComponent = ({ current = 0, items = [] }) => {
    const { Step } = Steps;
    return (
        <Steps current={current}>
            {items.map((item, index) => (
                <Step
                    key={index}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </Steps>
    );
};

export default StepComponent;
