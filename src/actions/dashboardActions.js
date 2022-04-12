import {DASHBOARD} from "../utils/constants/action_constants";
import * as OrganizationRepo from "../api/organizationRepo";
import * as EmployeeRepo from "../api/employeeRepo";

const setData = data => ({ type: DASHBOARD.GET_DATA, data });

export const fetchDataAction = () => async dispatch => {
    const orgData = await OrganizationRepo.getMyOrganization();
    const organizations = await OrganizationRepo.getAll();
    const employees = await EmployeeRepo.getEmployeesForOrganization(orgData._id);

    const data = {
        orgData,
        organizations,
        employees,
    };

    dispatch(setData(data));
}
