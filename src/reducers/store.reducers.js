import { SET_ALL_STORE, ADD_STORE, REMOVE_STORE, SET_STORE } from '../actions/store.actions';

const initstateStores = [];

export const storesReducer = (stores = initstateStores, action) => {
    let newStores;
    let storeIndex;

    switch (action.type) {
        
        case SET_ALL_STORE:
            return action.payload;
        
        case ADD_STORE:
            newStores = [...stores];
            newStores.push(action.payload);
            return newStores;

        case REMOVE_STORE:
            newStores = [...stores];
            newStores = newStores.filter(store => store.id !== action.payload.id);
            return newStores;

        case SET_STORE:
            newStores = [...stores];
            storeIndex = newStores.findIndex(store => store.id === action.payload.id);
            newStores[storeIndex] = action.payload;
            return newStores;

        default:
            return stores;
    }
};