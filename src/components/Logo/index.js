import React from 'react';
import './styles.scss';

const Logo = ({
    size = null,
}) => {
    return (
        <div className="Logo" style={{fontSize: size}}>
            Discount Service
        </div>
    );
};

export default Logo;