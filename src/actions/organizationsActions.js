import {ORGANIZATIONS} from "../utils/constants/action_constants";
import * as OrganizationRepo from "../api/organizationRepo";

const setData = data => ({ type: ORGANIZATIONS.GET_DATA, data });

export const fetchDataAction = () => async dispatch => {
    const organizations = await OrganizationRepo.getAll();

    const data = {
        organizations,
    };

    dispatch(setData(data));
}