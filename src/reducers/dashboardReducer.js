import {DASHBOARD} from "../utils/constants/action_constants";

const defaultState = {
    orgData: null,
    organizations: [],
    employees: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case DASHBOARD.GET_DATA:
            return { ...action.data };
        default:
            return state;
    }
}