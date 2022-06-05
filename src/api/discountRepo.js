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

export const updatePersonalDiscount = async (userId, updateData) => {
    try {
        const {data} = await $authHost.put(`api/discount/personal/${userId}`, updateData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
}

export const removePersonalDiscount = async (userId) => {
    try {
        const {data} = await $authHost.delete(`api/discount/personal/${userId}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
}