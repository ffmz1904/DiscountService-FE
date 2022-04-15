import {EMPLOYEES} from "../utils/constants/action_constants";

const defaultState = {
    employees: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case EMPLOYEES.GET_DATA:
            return { ...action.data };
        case EMPLOYEES.ADD_EMPLOYEE:
            return { ...state, employees: [ ...state.employees, action.data]};
        case EMPLOYEES.UPDATE_EMPLOYEE:
            return { ...state, employees: [ ...state.employees.map(el => el._id === action.data._id
                    ? { ...action.data }
                    : el
                )]};
        case EMPLOYEES.REMOVE_EMPLOYEE:
            return { ...state, employees: [ ...state.employees.filter(el => el._id !== action.id) ]};
        default:
            return state;
    }
}