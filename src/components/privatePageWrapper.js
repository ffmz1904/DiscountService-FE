import React from 'react';
import AppNavBar from "./AppNavBar";

const PrivatePageWrapper = ({ child }) => {
    return (
        <div id="privatePageWrapper">
            <AppNavBar />
            <div className="content">
                { child }
            </div>
        </div>
    );
};

export default PrivatePageWrapper;