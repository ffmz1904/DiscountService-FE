import React from 'react';
import './styles.scss';

const DefaultAvatar = ({name, width = null}) => {
    const styles = width !== null ? {width: `${width}px`, height: `${width}px`} : {};
    const abbrLetters = name.split(' ').map(el => el[0].toUpperCase());
    const abbr = name.length >= 2 ? abbrLetters[0] + abbrLetters[1] : abbrLetters[0];
    return (
        <div className="DefaultAvatar" style={styles }>
            <span>{abbr}</span>
        </div>
    );
};

export default DefaultAvatar;