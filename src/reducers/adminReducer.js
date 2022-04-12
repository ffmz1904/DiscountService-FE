import {AUTH} from '../utils/constants/action_constants';

const defaultState = {
    isAuth: false,
    data: {},
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case AUTH.LOGIN:
            return { isAuth: true, data: { ...action.data } };
        case AUTH.LOGOUT:
            return { ...defaultState };
        default:
            return state;
    }
}