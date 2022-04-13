import React from 'react';
import './styles.scss';
import {Button, Image} from "semantic-ui-react";
import defaultImg from "../../assets/img/default-img.svg";
import {logoutAction} from "../../actions/adminActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const ProfilePage = ({ logoutAction }) => {
    const logoutHandler = () => {
        logoutAction();
    }

    return (
        <div id="ProfilePage" className="Page">
            <TopBar
                onLogoutTap={logoutHandler}
            />
            <MyOrganization data={{name: 'OrgAnization', description: "TYTYTY...."}}/>
        </div>
    );
};

const actions = {logoutAction};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
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
                    <div className="empCount">Працівників: 12</div>
                </div>
            </div>
            <div className="description">
                <h5>Опис:</h5>
                <div className="text">{data.description}</div>
            </div>
        </div>
    );
}