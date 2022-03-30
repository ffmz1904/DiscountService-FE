import React from 'react';
import './styles.scss';
import {Image} from "semantic-ui-react";
import defaultImage from "../../assets/img/default-img.svg";

const OrganizationsPage = () => {
    return (
        <div id="OrganizationsPage" className="Page">
            <SearchBar />
            <OrganizationsList />
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

const OrganizationsList = () => {
    return(
        <div className="OrganizationsList">
            <div className="header">
                <div className="logo"/>
                <div className="name">Назва</div>
                <div className="description">Опис</div>
                <div className="discount">Знижка</div>
            </div>
            <OrganizationsListItem />
            <OrganizationsListItem />
            <OrganizationsListItem />
            <OrganizationsListItem />
        </div>
    );
}

const OrganizationsListItem = () => {
    return(
        <div className="OrganizationsListItem">
            <div className="logo">
                <Image src={defaultImage} />
            </div>
            <div className="name">Ф.І.О.</div>
            <div className="description">Опис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта ф
                Опис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта ф
                Опис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта ф
                Опис іаплві ітаілтпіл та іфта фОпис іаплві ітаілтпіл та іфта ф
            </div>
            <div className="discount">5%</div>
        </div>
    );
}
export default OrganizationsPage;