import * as OrganizationRepo from "../api/organizationRepo";
import {PROFILE} from "../utils/constants/action_constants";

const setData = data => ({ type: PROFILE.GET_DATA, data });
const updateData = data => ({ type: PROFILE.UPDATE_DATA, data });

export const fetchDataAction = () => async dispatch => {
    const orgData = await OrganizationRepo.getMyOrganization();
    dispatch(setData({ orgData }));
}

export const updateOrgDataAction = (data) => async dispatch => {
    const orgData = await OrganizationRepo.updateMyOrganization(data);
    dispatch(updateData({ orgData }));
}