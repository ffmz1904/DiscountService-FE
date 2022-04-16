import {ORGANIZATION_DETAILS} from "../utils/constants/action_constants";
import * as OrganizationRepo from "../api/organizationRepo";
import * as DiscountRepo from "../api/discountRepo";
import * as EmployeesRepo from "../api/employeeRepo";

const setData = data => ({ type: ORGANIZATION_DETAILS.GET_DATA, data });
const updateMyOrg = data => ({ type: ORGANIZATION_DETAILS.UPDATE_MY_ORG, data });
const updateSearchString = data => ({ type: ORGANIZATION_DETAILS.UPDATE_SEARCH_STRING, data });

export const fetchDataAction = (orgId) => async dispatch => {
    const organizationData = await OrganizationRepo.getById(orgId);
    const myOrganizationData = await OrganizationRepo.getMyOrganization();
    const employees = await EmployeesRepo.getEmployeesForOrganization(organizationData._id);

    dispatch(setData({
        orgData: organizationData,
        myOrgData: myOrganizationData,
        employees,
    }));
}

export const setDiscountAction = (orgId, data) => async dispatch => {
    const myOrganizationData = await DiscountRepo.updateDiscount(orgId, data);
    dispatch(updateMyOrg(myOrganizationData));
}

export const removeDiscountAction = (orgId) => async dispatch => {
    const myOrganizationData = await DiscountRepo.removeDiscount(orgId);
    dispatch(updateMyOrg(myOrganizationData));
}

export const filterEmployeeAction = value => async dispatch => {
    dispatch(updateSearchString(value));
}