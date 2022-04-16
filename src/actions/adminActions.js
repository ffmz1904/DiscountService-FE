import {AUTH} from "../utils/constants/action_constants";
import * as AdminRepo from '../api/adminRepo';

const setLogin = data => ({ type: AUTH.LOGIN, data });
const setLogout = () => ({ type: AUTH.LOGOUT });

export const authorizeAction = () => async dispatch => {
    const response = await AdminRepo.authorize();
    if (response.error) {
        localStorage.removeItem('token');
        localStorage.removeItem('undefined');
        dispatch(setLogout());
        return;
    }
    dispatch(setLogin(response));
}

export const loginAction = (loginData) => async dispatch => {
    const response = await AdminRepo.login(loginData);

    localStorage.setItem('token', response.tokens.accessToken);
    localStorage.setItem('undefined', response.tokens.refreshToken);
    dispatch(setLogin(response.admin));
    return true;
}

export const logoutAction = () => async dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('undefined');
    dispatch(setLogout());
}

export const registrationAction = (registrationData) => async dispatch => {
    const response = await AdminRepo.registration(registrationData);

    localStorage.setItem('token', response.tokens.accessToken);
    localStorage.setItem('undefined', response.tokens.refreshToken);
    dispatch(setLogin(response.admin));
    return true;
}


