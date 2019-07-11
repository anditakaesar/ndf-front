import { SET_MEMBER_META, SET_MEMBER_META_PAGE } from "../actions/member.actions";

// provide default to prevent undefined object
const initialMeta = {
    members: {
        page: null
    }
}

export const metaReducer = (meta = initialMeta, action) => {
    switch (action.type) {
        case SET_MEMBER_META:
            return {...meta, members: action.payload };

        case SET_MEMBER_META_PAGE:
            return {...meta, members: { ...meta.members, page: action.payload }};

        default:
            return meta;
    }
}