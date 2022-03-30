import * as ROUTE from './routesConstant';
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import EmployeesPage from "../pages/EmployeesPage";

export const publicRoutes = [
    {
        path: ROUTE.AUTH_ROUTE,
        Component: AuthPage,
    },
];

export const authRoutes = [
    {
        path: ROUTE.DASHBOARD_ROUTE,
        Component: DashboardPage,
    },
    {
        path: ROUTE.PROFILE_ROUTE,
        Component: ProfilePage,
    },
    {
        path: ROUTE.EMPLOYEES_ROUTE,
        Component: EmployeesPage,
    },
    // {
    //     path: ROUTE.DELIVERY_MEN_EARNING_ROUTE + '/:id',
    //     Component: DeliveryManEarningPage,
    // },
];
