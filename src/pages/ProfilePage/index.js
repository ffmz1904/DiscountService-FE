import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Button, Image} from "semantic-ui-react";
import defaultImg from "../../assets/img/default-img.svg";
import {logoutAction} from "../../actions/adminActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchDataAction} from "../../actions/profileActions";
import LoaderWidget from "../../components/LoaderWidget";

const ProfilePage = ({
    fetchDataAction,
    logoutAction,
    data,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDataAction()
            .then(() => setIsLoading(false));
    }, [fetchDataAction]);

    const logoutHandler = () => {
        logoutAction();
    }

    if (isLoading) {
        return <LoaderWidget />
    }

    return (
        <div id="ProfilePage" className="Page">
            <TopBar
                onLogoutTap={logoutHandler}
            />
            <MyOrganization data={data.orgData}/>
        </div>
    );
};

const actions = {logoutAction, fetchDataAction};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = ({profile}) => ({
    data: profile,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfilePage);

const TopBar = ({onLogoutTap}) => {
    return(
        <div className="TopBar">
            <Button onClick={() => onLogoutTap()}>Вийти</Button>
        </div>
    );
}

const MyOrganization = ({data}) => {
    return(
        <div className="MyOrgContainer">
            <div className="columns">
                <div className="left">
                    <div className="logo">
                        <Image src={defaultImg} />
                    </div>
                </div>
                <div className="right">
                    <div className="name">{data.name}</div>
                    <div className="empCount">Працівників: {data.employeesCount}</div>
                </div>
            </div>
            <div className="description">
                <h5>Опис:</h5>
                <div className="text">{data.description}</div>
            </div>
        </div>
    );
}