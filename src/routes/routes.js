import * as ROUTE from './routesConstant';
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";

export const publicRoutes = [
    {
        path: ROUTE.AUTH_ROUTE,
        Component: AuthPage(),
    },
];

export const authRoutes = [
    {
        path: ROUTE.DASHBOARD_ROUTE,
        Component: DashboardPage(),
    },
    // {
    //     path: ROUTE.DELIVERY_MEN_EARNING_ROUTE + '/:id',
    //     Component: DeliveryManEarningPage,
    // },
];
