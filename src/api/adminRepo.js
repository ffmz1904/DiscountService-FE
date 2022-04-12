import {$host, $authHost} from "./index";

export const login = async (loginData) => {
    try {
        const {data} = await $host.post('api/auth/login', loginData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const registration = async (registerData) => {
    try {
        const {data} = await $host.post('api/auth/registration', registerData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const authorize = async () => {
    try {
        const {data} = await $authHost.get('api/auth/authorize');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
}
