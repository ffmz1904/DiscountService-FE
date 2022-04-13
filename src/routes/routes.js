import * as ROUTE from './routesConstant';
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import EmployeesPage from "../pages/EmployeesPage";
import OrganizationsPage from "../pages/OrganizationsPage";
import OrganizationDetailsPage from "../pages/OrganizationDetailsPage";

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
    {
        path: ROUTE.ORGANIZATIONS_ROUTE,
        Component: OrganizationsPage,
    },
    {
        path: ROUTE.ORGANIZATIONS_ROUTE + '/:id',
        Component: OrganizationDetailsPage,
    },
    // {
    //     path: ROUTE.DELIVERY_MEN_EARNING_ROUTE + '/:id',
    //     Component: DeliveryManEarningPage,
    // },
];
