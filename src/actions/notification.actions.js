// action types
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

// action creators, REDUX-STORE
export const setNotification = ({message, feature}) => ({
    type: `${feature} ${SET_NOTIFICATION}`,
    payload: message,
    meta: { feature }
});

export const clearNotification = ({feature}) => ({
    type: `${feature} ${CLEAR_NOTIFICATION}`,
    payload: '',
    meta: { feature }
});
