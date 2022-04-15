import {$authHost} from "./index";

export const updateDiscount = async (orgId, updateData) => {
    try {
        const {data} = await $authHost.put(`api/discount/${orgId}`, updateData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
}

export const removeDiscount = async (orgId) => {
    try {
        const {data} = await $authHost.delete(`api/discount/${orgId}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
}