import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Image} from "semantic-ui-react";
import defaultImage from "../../assets/img/default-img.svg";
import {connect} from "react-redux";
import {fetchDataAction} from "../../actions/organizationsActions";
import {bindActionCreators} from "redux";
import LoaderWidget from "../../components/LoaderWidget";

const OrganizationsPage = ({
    fetchDataAction,
    organizations,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDataAction().then(() => setIsLoading(false));
    }, [fetchDataAction]);

    if (isLoading) {
        return <LoaderWidget />
    }

    return (
        <div id="OrganizationsPage" className="Page">
            <SearchBar />
            <OrganizationsList data={organizations} />
        </div>
    );
};

const actions = {fetchDataAction};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = ({organizations}) => ({
    organizations: organizations.organizations
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizationsPage);

const SearchBar = () => {
    return(
        <div className="SearchBar">
            Search Bar
        </div>
    );
}

const OrganizationsList = ({data}) => {
    return(
        <div className="OrganizationsList">
            <div className="header">
                <div className="logo"/>
                <div className="name">Назва</div>
                <div className="description">Опис</div>
                <div className="discount">Знижка</div>
            </div>
            {
                data.map(el => <OrganizationsListItem key={el._id} data={el} />)
            }
        </div>
    );
}

const OrganizationsListItem = ({data}) => {
    return(
        <div className="OrganizationsListItem">
            <div className="logo">
                <Image src={defaultImage} />
            </div>
            <div className="name">{data.name}</div>
            <div className="description">{data.description}</div>
            <div className="discount">5%</div>
        </div>
    );
}
