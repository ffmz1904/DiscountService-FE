import {ORGANIZATION_DETAILS} from "../utils/constants/action_constants";

const defaultState = {
    orgData: {},
    myOrgData: {},
    employees: [],
    searchString: '',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ORGANIZATION_DETAILS.GET_DATA:
            return { ...state, ...action.data};
        case ORGANIZATION_DETAILS.UPDATE_MY_ORG:
            return { ...state, myOrgData: action.data };
        case ORGANIZATION_DETAILS.UPDATE_SEARCH_STRING:
            return { ...state, searchString: action.data };
        default:
            return state;
    }
}