import {ORGANIZATIONS} from "../utils/constants/action_constants";
import * as OrganizationRepo from "../api/organizationRepo";

const setData = data => ({ type: ORGANIZATIONS.GET_DATA, data });
const updateSearchString = data => ({ type: ORGANIZATIONS.UPDATE_SEARCH_STRING, data });

export const fetchDataAction = () => async dispatch => {
    const organizations = await OrganizationRepo.getAll();

    const data = {
        organizations,
    };

    dispatch(setData(data));
}

export const filterOrganizationAction = value => async dispatch => {
    dispatch(updateSearchString(value));
}