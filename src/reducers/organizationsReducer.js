import {ORGANIZATIONS} from "../utils/constants/action_constants";

const defaultState = {
    organizations: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ORGANIZATIONS.GET_DATA:
            return { ...action.data };
        default:
            return state;
    }
}