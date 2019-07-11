import { 
    FETCH_ALL_STORE,
    STORE, 
    setAllStore, 
    INSERT_STORE, 
    addStore, 
    CLEAR_ALL_STORE, 
    DELETE_STORE,
    removeStore,
    UPDATE_STORE,
    setStore
} from '../actions/store.actions';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.actions';
import { setNotification } from '../actions/notification.actions';
import { API_URL } from '../helper/env';

const STORES_URL = `${API_URL}/store`;

export const storeMiddlewares = () => (next) => (action) => {
    next(action);
    
    switch (action.type) {
        case FETCH_ALL_STORE:
            // fetch all store
            next(apiRequest({
                body: {},
                method: 'GET',
                url: STORES_URL,
                config: {
                    headers: {'Content-Type': 'application/json'}
                },
                feature: STORE
            }));
            next(setNotification({message: 'fetching all store', feature: STORE}));
            break;

        case INSERT_STORE:
            // put new store
            next(apiRequest({
                body: action.payload,
                method: 'POST',
                url: STORES_URL,
                config: {
                    headers: {'Content-Type': 'application/json'}
                },
                feature: STORE
            }));
            next(setNotification({message: 'adding store', feature: STORE}));
            break;

        case CLEAR_ALL_STORE:
            next(setAllStore({ query: []}));
            next(setNotification({ message: 'store cache cleared', feature: STORE }));
            break;

        case DELETE_STORE:
            next(apiRequest({
                body: {},
                method: 'DELETE',
                url: `${STORES_URL}/delete/${action.payload.id}`,
                config: {
                    headers: {'Content-Type': 'application/json'}
                },
                feature: STORE
            }));
            next(setNotification({ message: `deleting store ${action.payload.storename}`, feature: STORE}));
            break;

        case UPDATE_STORE:
            let body = {
                storename: action.payload.storename,
                storedesc: action.payload.storedesc,
                storephone: action.payload.storephone
            };

            next(apiRequest({
                body: body,
                method: 'PUT',
                url: `${STORES_URL}/${action.payload.id}`,
                config: {
                    headers: {'Content-Type': 'application/json'}
                },
                feature: STORE
            }));
            
            next(setNotification({ message: `updating store`, feature: STORE}));
            break;

        case `${STORE} ${API_SUCCESS}`:
            let message = action.payload.message;
            if (action.payload.stores !== undefined) { // check for fetching all store
                next(setAllStore({ query: action.payload.stores }));
                message = 'fetching stores done';
            } else if (action.payload.store !== undefined && action.payload.beforeUpdate === undefined) { // check for single store
                next(addStore({ query: action.payload.store }));
                message = 'add store complete';
            } else if (action.payload.deletedStore !== undefined) {
                next(removeStore({ query: action.payload.deletedStore }));
            } else if (action.payload.beforeUpdate !== undefined) {
                next(setStore({ query: action.payload.store }));
            }

            next(setNotification({message: message, feature: STORE}));
            break;

        case `${STORE} ${API_ERROR}`:;
            next(setNotification({message: 'error fetching stores', feature: STORE}));
            break;
        
        default:
            break;
    }
}