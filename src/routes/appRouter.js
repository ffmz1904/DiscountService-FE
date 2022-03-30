import React from 'react';
import { authRoutes, publicRoutes } from "./routes";
import {Redirect, Route, Switch} from "react-router-dom";
import {AUTH_ROUTE, DASHBOARD_ROUTE} from "./routesConstant";
import PrivatePageWrapper from "../components/PrivatePageWrapper";

const AppRouter = ({ isAuth }) => {
    return (
        <>
            {
                isAuth ?
                    <PrivatePageWrapper
                        child={
                            <Switch>
                                { isAuth && authRoutes.map(({path, Component}) =>
                                    <Route key={path} path={path} component={Component} exact/>
                                )}
                                <Redirect to={DASHBOARD_ROUTE} />
                            </Switch>
                        }
                    />
                    :
                    <Switch>
                        {publicRoutes.map(({path, Component}) =>
                            <Route key={path} path={path} component={Component} exact/>
                        )}
                        <Redirect to={AUTH_ROUTE} />
                    </Switch>
            }
        </>
    );
};

export default AppRouter;