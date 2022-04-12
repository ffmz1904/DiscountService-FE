import {$authHost} from "./index";

export const getAll = async () => {
    try {
        const {data} = await $authHost.get('api/org');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getById = async (id) => {
    try {
        const {data} = await $authHost.get(`api/org/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getMyOrganization = async () => {
    try {
        const {data} = await $authHost.get('api/org/my');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};