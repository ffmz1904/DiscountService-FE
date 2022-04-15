import {ORGANIZATION_DETAILS} from "../utils/constants/action_constants";

const defaultState = {
    orgData: {},
    myOrgData: {},
    isEmpty: true,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ORGANIZATION_DETAILS.GET_DATA:
            return { ...action.data, isEmpty: false};
        case ORGANIZATION_DETAILS.UPDATE_MY_ORG:
            return { ...state, myOrgData: action.data };
        default:
            return state;
    }
}