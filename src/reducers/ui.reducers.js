import { SET_LOADER } from '../actions/ui.actions';

const initStateLoader = {
    loading: false
};

export const uiReducer  = (ui = initStateLoader, action) => {
    switch (true) {
        case action.type.includes(SET_LOADER):
            return {...ui, loading: action.payload}
        
        default:
            return ui;
    }
};