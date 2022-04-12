import {$authHost} from "./index";

export const getAll = async () => {
    try {
        const {data} = await $authHost.get('api/employee');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getById = async (id) => {
    try {
        const {data} = await $authHost.get(`api/employee/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getEmployeesForOrganization = async (orgId) => {
    try {
        const {data} = await $authHost.get(`api/employee/org/${orgId}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const create = async (employeeData) => {
    try {
        const {data} = await $authHost.post('api/employee', employeeData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};