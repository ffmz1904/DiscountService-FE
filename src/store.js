import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

// import errorReducer from './reducers/error';
import adminReducer from "./reducers/adminReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import organizationsReducer from "./reducers/organizationsReducer";
import organizationDetailsReducer from "./reducers/organizationDetailsReducer";
import employeesReducer from "./reducers/employeesReducer";
import profileReducer from "./reducers/profileReducer";

const initialState = {};

const middlewares = [
    thunk
];

const composedEnhancers = compose(
    applyMiddleware(...middlewares)
);

const reducers = {
    admin: adminReducer,
    dashboard: dashboardReducer,
    organizations: organizationsReducer,
    organizationDetails: organizationDetailsReducer,
    employees: employeesReducer,
    profile: profileReducer,
};

const rootReducer = combineReducers({ ...reducers });

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

//for development
window.store = store;

export default store;

