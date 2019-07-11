import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/notification.actions';
import { initialState } from '../initialState';

export const notificationsReducer = (notifications = initialState.notifications, action) => {
    switch (true) {
        case action.type.includes(SET_NOTIFICATION):
            return [action.payload];
        
        case action.type.includes(CLEAR_NOTIFICATION):
            return notifications;

        default:
            return notifications;
    }
};