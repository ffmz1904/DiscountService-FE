import React from 'react';
import './styles.scss';
import * as ROUTE from '../../routes/routesConstant';
import Logo from "../Logo";
import {Icon} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

const AppNavBar = () => {
    return (
        <div id="AppNavBar">
            <NavLink to={ROUTE.DASHBOARD_ROUTE}>
                <Logo size={20}/>
            </NavLink>
            <div className="tabWrapper">
                <NavBarTab
                    icon='user outline'
                    path={ROUTE.ORGANIZATIONS_ROUTE}
                    name='Організації'
                />
                <NavBarTab
                    icon='user outline'
                    path={ROUTE.EMPLOYEES_ROUTE}
                    name='Працівники'
                />
                <NavBarTab
                    icon='user outline'
                    path={ROUTE.PROFILE_ROUTE}
                    name='Профіль'
                />
            </div>
        </div>
    );
};

const NavBarTab = ({
    path,
    icon,
    name,
}) => {
    return (
        <div className="navBarTab">
            <NavLink to={path} activeClassName='navBarTabActive'>
                <Icon name={icon} />
                <span className="tabName">{name}</span>
            </NavLink>
        </div>
    );
}

export default AppNavBar;