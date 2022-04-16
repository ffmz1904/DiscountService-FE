import {EMPLOYEES} from "../utils/constants/action_constants";
import * as EmployeesRepo from "../api/employeeRepo";

const setData = data => ({ type: EMPLOYEES.GET_DATA, data });
const addEmployee = data => ({ type: EMPLOYEES.ADD_EMPLOYEE, data });
const updateEmployee = data => ({ type: EMPLOYEES.UPDATE_EMPLOYEE, data });
const removeEmployee = data => ({ type: EMPLOYEES.REMOVE_EMPLOYEE, id: data });
const updateSearchString = data => ({ type: EMPLOYEES.UPDATE_SEARCH_STRING, data });

export const fetchDataAction = (orgId) => async dispatch => {
    const employees = await EmployeesRepo.getEmployeesForOrganization(orgId);

    const data = {
        employees,
    };

    dispatch(setData(data));
}

export const createEmployeeAction = (data) => async dispatch => {
    const employee = await EmployeesRepo.create(data);
    dispatch(addEmployee(employee));
}

export const updateEmployeeAction = (employeeId, data) => async dispatch => {
    const employee = await EmployeesRepo.update(employeeId, data);
    dispatch(updateEmployee(employee));
}

export const removeEmployeeAction = (id) => async dispatch => {
    const result = await EmployeesRepo.remove(id);
    dispatch(removeEmployee(id));
}

export const filterEmployeeAction = value => async dispatch => {
    dispatch(updateSearchString(value));
}