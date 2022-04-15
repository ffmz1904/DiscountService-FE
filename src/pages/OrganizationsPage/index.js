import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Image} from "semantic-ui-react";
import defaultImage from "../../assets/img/default-img.svg";
import {connect} from "react-redux";
import {fetchDataAction} from "../../actions/organizationsActions";
import {bindActionCreators} from "redux";
import LoaderWidget from "../../components/LoaderWidget";
import {useHistory} from "react-router-dom";
import {ORGANIZATIONS_ROUTE} from "../../routes/routesConstant";

const OrganizationsPage = ({
    fetchDataAction,
    organizations,
    myOrgId,
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
            <OrganizationsList data={organizations} myOrgId={myOrgId} />
        </div>
    );
};

const actions = {fetchDataAction};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = ({organizations, admin}) => ({
    organizations: organizations.organizations,
    myOrgId: admin.data.organizationId
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

const OrganizationsList = ({data, myOrgId}) => {
    return(
        <div className="OrganizationsList">
            <div className="header">
                <div className="logo"/>
                <div className="name">Назва</div>
                <div className="description">Опис</div>
                <div className="discount">Знижка (для вас / надана)</div>
            </div>
            {
                data.map(el => <OrganizationsListItem
                    key={el._id}
                    data={el}
                    discountForYou={el.discounts.filter(discount => discount.id === myOrgId)[0]}
                />)
            }
        </div>
    );
}

const OrganizationsListItem = ({data, discountForYou}) => {
    const history = useHistory();

    return(
        <div
            className="OrganizationsListItem"
            onClick={() => history.push(ORGANIZATIONS_ROUTE + `/${data._id}`)}
        >
            <div className="logo">
                <Image src={defaultImage} />
            </div>
            <div className="name">{data.name}</div>
            <div className="description">{data.description}</div>
            <div className="discount">
                <span>{ discountForYou ? discountForYou.percent + '%' : '-'} </span>
                /
                <span> {data.discountForOrg ? data.discountForOrg + '%' : '-'}</span>
            </div>
        </div>
    );
}
