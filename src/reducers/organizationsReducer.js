import {ORGANIZATIONS} from "../utils/constants/action_constants";

const defaultState = {
    organizations: [],
    searchString: '',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ORGANIZATIONS.GET_DATA:
            return { ...state, ...action.data };
        case ORGANIZATIONS.UPDATE_SEARCH_STRING:
            return {...state, searchString: action.data};
        default:
            return state;
    }
}