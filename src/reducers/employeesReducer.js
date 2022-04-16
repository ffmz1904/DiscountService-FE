import {EMPLOYEES} from "../utils/constants/action_constants";

const defaultState = {
    employees: [],
    searchString: '',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case EMPLOYEES.GET_DATA:
            return { ...state, ...action.data };
        case EMPLOYEES.ADD_EMPLOYEE:
            return { ...state, employees: [ ...state.employees, action.data]};
        case EMPLOYEES.UPDATE_EMPLOYEE:
            return { ...state, employees: [ ...state.employees.map(el => el._id === action.data._id
                    ? { ...action.data }
                    : el
                )]};
        case EMPLOYEES.REMOVE_EMPLOYEE:
            return { ...state, employees: [ ...state.employees.filter(el => el._id !== action.id) ]};
        case EMPLOYEES.UPDATE_SEARCH_STRING:
            return { ...state, searchString: action.data };
        default:
            return state;
    }
}