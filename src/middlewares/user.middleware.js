import { USER, LOGIN_USER, LOGOUT_USER, setUser, VERIFY_USER } from '../actions/user.actions';
import { API_SUCCESS, API_ERROR, apiRequest } from '../actions/api.actions';
import { setAllStore } from '../actions/store.actions';
import { initialState } from '../initialState';
import { setNotification } from '../actions/notification.actions';
import { API_URL } from '../helper/env';
import { setAllMember, setMemberMeta } from '../actions/member.actions';

const LOGIN_URL = `${API_URL}/auth`;

export const userMiddleware = () => (next) => (action) => {
    next(action);

    switch (action.type) {
        case LOGIN_USER:
            next(apiRequest({
                body: {
                    username: action.payload.username,
                    password: action.payload.password
                }, 
                method: 'POST', 
                url: `${LOGIN_URL}/login`, 
                config: {
                    headers: {'Content-Type': 'application/json'}
                }, 
                feature: USER
            }));
            next(setNotification({message: 'logging in', feature: USER}));
            break;

        case LOGOUT_USER:
            next(setUser({ user: initialState.user }));
            next(setAllStore({ query: []}));
            next(setAllMember({ members: []}));
            next(setMemberMeta({ meta: {}}));
            next(setNotification({ message: 'user logged out', feature: USER}));
            break;

        case VERIFY_USER:
            next(apiRequest({
                body: {},
                method: 'GET', 
                url: `${LOGIN_URL}/verify`,
                config: {
                    headers: {'Content-Type': 'application/json'}
                }, 
                feature: USER
            }));
            next(setNotification({ message: 'refreshing user state', feature: USER}));
            break;

        case `${USER} ${API_SUCCESS}`:
            let message = action.payload.message;;
            if (action.payload.user !== undefined) {
                let user = action.payload.user;
                user.token = action.payload.token;
                user.isAuthenticated = true;
                next(setUser({ user }));
            }
            
            if (action.payload.verified !== undefined && action.payload.verified === false) {
                next(setUser({ user: initialState.user }));
            }

            next(setNotification({message: message, feature: USER}));
            break;
        
        case `${USER} ${API_ERROR}`:
            next(setNotification({message: action.payload, feature: USER}));
            break;
        
        default:
            break;
    }
}