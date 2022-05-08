import React from 'react';
import './styles.scss';

const DefaultAvatar = ({name, width = null}) => {
    const styles = width !== null ? {width: `${width}px`, height: `${width}px`} : {};

    let abbrLetters;
    let abbr;

    if (name.length) {
        abbrLetters = name.split(' ').map(el => {
            if (el) {
                return el[0].toUpperCase();
            } else {
                return '';
            }
        });
        abbr = abbrLetters.length >= 2 ? abbrLetters[0] + abbrLetters[1] : abbrLetters[0];
    } else  {
        abbr = '';
    }

    return (
        <div className="DefaultAvatar" style={styles }>
            <span>{abbr}</span>
        </div>
    );
};

export default DefaultAvatar;