import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Image, Input} from "semantic-ui-react";
import defaultImage from "../../assets/img/default-img.svg";
import {connect} from "react-redux";
import {fetchDataAction, filterOrganizationAction} from "../../actions/organizationsActions";
import {bindActionCreators} from "redux";
import LoaderWidget from "../../components/LoaderWidget";
import {useHistory} from "react-router-dom";
import {ORGANIZATIONS_ROUTE} from "../../routes/routesConstant";

const OrganizationsPage = ({
    fetchDataAction,
    filterOrganizationAction,
    data,
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
            <SearchBar
                searchString={data.searchString}
                onFilterChanged={filterOrganizationAction}
            />
            <OrganizationsList
                data={data.organizations}
                searchString={data.searchString}
                myOrgId={myOrgId}
            />
        </div>
    );
};

const actions = {fetchDataAction, filterOrganizationAction};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = ({organizations, admin}) => ({
    data: organizations,
    myOrgId: admin.data.organizationId
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizationsPage);

const SearchBar = ({searchString, onFilterChanged}) => {
    return(
        <div className="SearchBar">
            <div className="searchWrapper">
                <Input
                    placeholder="Пошук..."
                    value={searchString}
                    onChange={(e) => onFilterChanged(e.target.value)}
                />
            </div>
        </div>
    );
}

const OrganizationsList = ({data, myOrgId, searchString}) => {
    const organizations = searchString === ''
        ? data
        : data.filter(el => {
            const parts = el.name.split(' ');
            const exist = parts.filter(part => part.toLowerCase().includes(searchString.toLowerCase()));
            return exist.length !== 0 || el.name.toLowerCase().includes(searchString.toLowerCase());
        });

    return(
        <div className="OrganizationsList">
            <div className="header">
                <div className="logo"/>
                <div className="name">Назва</div>
                <div className="description">Опис</div>
                <div className="discount">Знижка <br/> (для вас / надана)</div>
            </div>
            { organizations.length
                ? organizations.map(el => <OrganizationsListItem
                    key={el._id}
                    data={el}
                    discountForYou={el.discounts.filter(discount => discount.id === myOrgId)[0]}
                />)
                : <div className="empty">Організацій не знайдено</div>
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
