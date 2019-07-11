// feature name
export const USER = '[User]';

// action types
export const FETCH_USER = `${USER} FETCH_USER`;
export const FETCH_ALL_USER = `${USER} FETCH_ALL_USER`;
export const SET_USER = `${USER} SET_USER`;
export const LOGIN_USER = `${USER} LOGIN_USER`;
export const LOGOUT_USER = `${USER} LOGOUT_USER`;
export const CREATE_USER = `${USER} CREATE_USER`;
export const UPDATE_USER = `${USER} UPDATE_USER`;
export const DELETE_USER = `${USER} DELETE_USER`;
export const SET_USER_IP = `${USER} SET_USER_IP`;
export const VERIFY_USER = `${USER} VERIFY_USER`;

// action creators, API
export const getUser = ({id}) => ({
    type: FETCH_USER, 
    payload: id
});

export const userLogin = ({user}) => ({
    type: LOGIN_USER, 
    payload: user
});

export const verifyUser = () => ({
    type: VERIFY_USER
});

// action creators, REDUX-STORE
export const setUser = ({user}) => ({
    type: SET_USER,
    payload: user
});

export const userLogout = () => ({
    type: LOGOUT_USER, 
    payload: null
});

export const setUserIp = ({ip}) => ({
    type: SET_USER_IP,
    payload: ip
});
