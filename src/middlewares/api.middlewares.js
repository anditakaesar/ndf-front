import { API_REQUEST, apiSuccess, apiError } from '../actions/api.actions';
import Axios from 'axios';
import { store } from '../store';

const _getToken = () => {
    const state = store.getState();
    return state.user.token;
}

export const apiMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);
    Axios.defaults.headers.common['Authorization'] = _getToken();
    const body = action.payload;
    if (action.type.includes(API_REQUEST)) {
        const { method, url, config, feature } = action.meta;

        switch(method) {
            case 'POST':
                axiosPost({ dispatch, body: body, url: url, config: config, feature: feature});
                break;

            case 'GET':
                axiosGet({ dispatch, body: body, url: url, config: config, feature: feature});
                break;

            case 'PUT':
                axiosPut({ dispatch, body: body, url: url, config: config, feature: feature});
                break;

            case 'DELETE':
                axiosDelete({ dispatch, body: body, url: url, config: config, feature: feature});
                break;

            case 'PATCH':
                axiosPatch({ dispatch, body: body, url: url, config: config, feature: feature});
                break;

            default:
                dispatch(apiError({error: `API ${method} is not supported`, feature: feature}));
                break;
            
        }
    }
};

const axiosPost = ({dispatch, body, url, config, feature}) => {
    Axios.post(url, body, config)
        .then(response => {
            dispatch(apiSuccess({response: response.data, feature: feature}));
        })
        .catch(error => {
            let message = error.message;
            if (error.response !== undefined) {
                message = error.response.data.message;
            }

            dispatch(apiError({error: message, feature: feature}));
        });
};

const axiosGet = ({dispatch, body, url, config, feature}) => {
    Axios.get(url, body, config)
        .then(response => {
            dispatch(apiSuccess({response: response.data, feature: feature}));
        })
        .catch(error => {
            let message = error.message;
            if (error.response !== undefined) {
                message = error.response.data.message;
            }

            dispatch(apiError({error: message, feature: feature}));
        });
};

const axiosPut = ({dispatch, body, url, config, feature}) => {
    Axios.put(url, body, config)
        .then(response => {
            dispatch(apiSuccess({response: response.data, feature: feature}));
        })
        .catch(error => {
            let message = error.message;
            if (error.response !== undefined) {
                message = error.response.data.message;
            }

            dispatch(apiError({error: message, feature: feature}));
        });
};

const axiosDelete = ({dispatch, body, url, config, feature}) => {
    Axios.delete(url, body, config)
        .then(response => {
            dispatch(apiSuccess({response: response.data, feature: feature}));
        })
        .catch(error => {
            let message = error.message;
            if (error.response !== undefined) {
                message = error.response.data.message;
            }

            dispatch(apiError({error: message, feature: feature}));
        });
};

const axiosPatch = ({dispatch, body, url, config, feature}) => {
    Axios.patch(url, body, config)
        .then(response => {
            dispatch(apiSuccess({response: response.data, feature: feature}));
        })
        .catch(error => {
            let message = error.message;
            if (error.response !== undefined) {
                message = error.response.data.message;
            }

            dispatch(apiError({error: message, feature: feature}));
        });
};