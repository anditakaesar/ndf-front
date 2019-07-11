import { FETCH_ALL_MEMBER, MEMBER, setAllMember, setMemberMeta, FETCH_ALL_MEMBER_PAGE } from "../actions/member.actions";
import { setNotification } from "../actions/notification.actions";
import { API_SUCCESS, API_ERROR, apiRequest } from "../actions/api.actions";
import { API_URL } from "../helper/env";

const MEMBER_URL = `${API_URL}/customer`;

export const memberMiddlewares = () => (next) => (action) => {
    next(action);

    switch (action.type) {
        case FETCH_ALL_MEMBER:
            next(apiRequest({
                body: {},
                method: 'GET',
                url: MEMBER_URL,
                config: {
                    headers: {'Content-Type': 'application/json'}
                },
                feature: MEMBER
            }));
            next(setNotification({message: 'fetching all member...', feature: MEMBER}));
            break;

        case FETCH_ALL_MEMBER_PAGE:
            const { page, limit } = action.meta;
            next(apiRequest({
                body: {},
                method: 'GET',
                url: `${MEMBER_URL}/?page=${page}&limit=${limit}`,
                config: {
                    headers: {'Content-Type': 'application/json'}
                },
                feature: MEMBER
            }));
            next(setNotification({message: `fetching all member, page ${page}`, feature: MEMBER}));
            break;

        case `${MEMBER} ${API_SUCCESS}`:
            let message = action.payload.message;
            if (action.payload.customers !== undefined) {
                next(setAllMember({ members: action.payload.customers }));
                message = 'fetching all members done';

                if (action.payload.meta !== undefined) {
                    next(setMemberMeta({ meta: action.payload.meta }));
                }
            }

            next(setNotification({message: message, feature: MEMBER}));
            break;

        case `${MEMBER} ${API_ERROR}`:
            next(setNotification({message: 'error api member', feature: MEMBER}));
            break;

        default:
            break;
    }
}