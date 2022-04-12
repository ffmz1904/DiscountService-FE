import {AUTH} from "../utils/constants/action_constants";
import * as AdminRepo from '../api/adminRepo';

const setLogin = data => ({ type: AUTH.LOGIN, data });
const setLogout = () => ({ type: AUTH.LOGIN });

export const authorizeAction = () => async dispatch => {
    const response = await AdminRepo.authorize();
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

