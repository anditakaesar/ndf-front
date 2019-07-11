import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userMiddleware } from './middlewares/user.middleware';
import { apiMiddleware } from './middlewares/api.middlewares';
import { storeMiddlewares } from './middlewares/store.middlewares';
import { memberMiddlewares } from './middlewares/member.middleware';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['notifications']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// middleware array
const featureMiddleware = [
    userMiddleware,
    storeMiddlewares,
    memberMiddlewares
];

// core middleware
const coreMiddleware = [
    apiMiddleware
];

// development
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export let store = createStore(
    persistedReducer, 
    storeEnhancers(
        applyMiddleware(...featureMiddleware, ...coreMiddleware)
    ));
export let persistor = persistStore(store);