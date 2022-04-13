import {ORGANIZATION_DETAILS} from "../utils/constants/action_constants";
import * as OrganizationRepo from "../api/organizationRepo";

const setData = data => ({ type: ORGANIZATION_DETAILS.GET_DATA, data });

export const fetchDataAction = (orgId) => async dispatch => {
    const organizationData = await OrganizationRepo.getById(orgId);
    const myOrganizationData = await OrganizationRepo.getMyOrganization();

    dispatch(setData({
        orgData: organizationData,
        myOrgData: myOrganizationData,
    }));
}