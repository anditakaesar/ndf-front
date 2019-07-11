import { combineReducers } from 'redux';
import { userReducer } from './user.reducers';
import { notificationsReducer } from './notification.reducers';
import { storesReducer } from './store.reducers';
import { memberReducer } from './member.reducers';
import { metaReducer } from './meta.reducers';

export const rootReducer = combineReducers({
    user: userReducer,
    notifications: notificationsReducer,
    stores: storesReducer,
    members: memberReducer,
    meta: metaReducer
});