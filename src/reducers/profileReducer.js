import {PROFILE} from "../utils/constants/action_constants";

const defaultState = {
    orgData: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case PROFILE.GET_DATA:
            return { ...state, ...action.data };
        default:
            return state;
    }
}