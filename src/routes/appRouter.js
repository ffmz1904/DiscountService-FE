import React from 'react';
import { authRoutes, publicRoutes } from "./routes";
import {Navigate, Route, Routes} from "react-router-dom";
import PrivatePageWrapper from "../components/privatePageWrapper";
import {AUTH_ROUTE, DASHBOARD_ROUTE} from "./routesConstant";

const AppRouter = ({ isAuth }) => {
    return (
        <>
            {
                isAuth ?
                    <PrivatePageWrapper
                        child={
                            <Routes>
                                { isAuth && authRoutes.map(({path, Component}) =>
                                    <Route key={path} path={path} element={Component} exact/>
                                )}
                                <Route path="*" element={<Navigate to={DASHBOARD_ROUTE} />}/>
                            </Routes>
                        }
                    />
                    :
                    <Routes>
                        {publicRoutes.map(({path, Component}) =>
                            <Route key={path} path={path} element={Component} exact/>
                        )}
                        <Route path="*" element={<Navigate to={AUTH_ROUTE} />}/>
                    </Routes>
            }
        </>
    );
};

export default AppRouter;