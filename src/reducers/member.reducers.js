import { SET_ALL_MEMBER, ADD_MEMBER, SET_MEMBER, REMOVE_MEMBER } from "../actions/member.actions";

const initstateMembers = [];

export const memberReducer = (members = initstateMembers, action) => {
    let newMembers;
    let memberIndex;

    switch (action.type) {

        case SET_ALL_MEMBER:
            return action.payload;

        case ADD_MEMBER:
            newMembers = [...members];
            newMembers.push(action.payload);
            return newMembers;
        
        case SET_MEMBER:
            newMembers = [...members];
            memberIndex = newMembers.findIndex(member => member.id === action.payload.id);
            newMembers[memberIndex] = action.payload;
            return newMembers;

        case REMOVE_MEMBER:
            newMembers = [...members];
            newMembers = newMembers.filter(member => member.id !== action.payload.id);
            return newMembers;

        default:
            return members;
    }
}