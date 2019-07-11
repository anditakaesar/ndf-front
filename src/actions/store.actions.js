// feature name
export const STORE = '[Store]';

// action types
export const FETCH_STORE = `${STORE} FETCH_STORE`;
export const FETCH_ALL_STORE = `${STORE} FETCH_ALL_STORE`;
export const SET_ALL_STORE = `${STORE} SET_ALL_STORE`;
export const SET_STORE = `${STORE} SET_STORE`;
export const CLEAR_ALL_STORE = `${STORE} CLEAR_ALL_STORE`;
export const ADD_STORE = `${STORE} ADD_STORE`;
export const INSERT_STORE = `${STORE} INSERT_STORE`;
export const UPDATE_STORE = `${STORE} UPDATE_STORE`;
export const DELETE_STORE = `${STORE} DELETE_STORE`;
export const REMOVE_STORE = `${STORE} REMOVE_STORE`;

// action creators, API
export const fetchAllStore = () => ({
    type: FETCH_ALL_STORE,
    payload: null
});

export const insertStore = ({query}) => ({
    type: INSERT_STORE,
    payload: query
});

export const updateStore = ({query}) => ({
    type: UPDATE_STORE,
    payload: query
});

export const deleteStore = ({query}) => ({
    type: DELETE_STORE,
    payload: query
});

// action creators, REDUX-STORE
export const clearAllStore = () => ({
    type: CLEAR_ALL_STORE,
    payload: null
});

export const setAllStore = ({query}) => ({
    type: SET_ALL_STORE,
    payload: query
});

export const setStore = ({query}) => ({
    type: SET_STORE,
    payload: query
});

export const addStore = ({query}) => ({
    type: ADD_STORE,
    payload: query
});

export const removeStore = ({query}) => ({
    type: REMOVE_STORE,
    payload: query
});