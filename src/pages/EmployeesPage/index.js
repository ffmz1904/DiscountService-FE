import React from 'react';
import './styles.scss';
import {Image} from "semantic-ui-react";
import defaultImage from '../../assets/img/default-img.svg';

const EmployeesPage = () => {
    return (
        <div id="EmployeesPage" className="Page">
            <SearchBar />
            <EmployeesList />
        </div>
    );
};

const SearchBar = () => {
    return(
        <div className="SearchBar">
            Search Bar
        </div>
    );
}

const EmployeesList = () => {
    return(
        <div className="EmployeesList">
            <div className="header">
                <div className="logo"/>
                <div className="name">Ф.І.О.</div>
                <div className="date">Дата</div>
            </div>
            <EmployeesListItem />
            <EmployeesListItem />
            <EmployeesListItem />
            <EmployeesListItem />
        </div>
    );
}

const EmployeesListItem = () => {
    return(
        <div className="EmployeesListItem">
            <div className="logo">
                <Image src={defaultImage} />
            </div>
            <div className="name">Ф.І.О.</div>
            <div className="date">Дата</div>
        </div>
    );
}

export default EmployeesPage;