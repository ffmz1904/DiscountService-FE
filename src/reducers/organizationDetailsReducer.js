import {ORGANIZATION_DETAILS} from "../utils/constants/action_constants";

const defaultState = {
    orgData: {},
    myOrgData: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ORGANIZATION_DETAILS.GET_DATA:
            return { ...action.data };
        default:
            return state;
    }
}