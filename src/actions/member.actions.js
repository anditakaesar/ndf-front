// feature name
export const MEMBER = '[Member]';

// action types, API
export const FETCH_ALL_MEMBER = `${MEMBER} FETCH_ALL_MEMBER`;
export const FETCH_ALL_MEMBER_PAGE = `${MEMBER} FETCH_ALL_MEMBER_PAGE`;
export const FETCH_MEMBER = `${MEMBER} FETCH_MEMBER`;
export const CREATE_MEMBER = `${MEMBER} CREATE_MEMBER`;
export const UPDATE_MEMBER = `${MEMBER} UPDATE_MEMBER`;
export const DELETE_MEMBER = `${MEMBER} DELETE_MEMBER`;

// action types, REDUX-STORE
export const SET_ALL_MEMBER = `${MEMBER} SET_ALL_MEMBER`;
export const ADD_MEMBER = `${MEMBER} ADD_MEMBER`;
export const SET_MEMBER = `${MEMBER} SET_MEMBER`;
export const REMOVE_MEMBER = `${MEMBER} REMOVE_MEMBER`;
export const SET_MEMBER_META = `${MEMBER} SET_MEMBER_META`;
export const SET_MEMBER_META_PAGE = `${MEMBER} SET_MEMBER_META_PAGE`;

// action creators, API
export const fetchAllMember = () => ({
    type: FETCH_ALL_MEMBER,
    payload: null
});

export const fetchAllMemberPage = ({ page, limit }) => ({
    type: FETCH_ALL_MEMBER_PAGE,
    payload: null,
    meta: { page: page, limit: limit }
});

export const fetchMember = ({id}) => ({
    type: FETCH_MEMBER,
    payload: id
});

export const createMember = ({member}) => ({
    type: CREATE_MEMBER,
    payload: member
});

export const updateMember = ({member}) => ({
    type: UPDATE_MEMBER,
    payload: member
});

export const deleteMember = ({member}) => ({
    type: DELETE_MEMBER,
    payload: member
});

// action creators, REDUX-STORE
export const setAllMember = ({members}) => ({
    type: SET_ALL_MEMBER,
    payload: members
});

export const addMember = ({member}) => ({
    type: ADD_MEMBER,
    payload: member
});

export const setMember = ({member}) => ({
    type: SET_MEMBER,
    payload: member
});

export const removeMember = ({member}) => ({
    type: REMOVE_MEMBER,
    payload: member
});

export const setMemberMeta = ({meta}) => ({
    type: SET_MEMBER_META,
    payload: meta
});

export const setMemberMetaPage = ({page}) => ({
    type: SET_MEMBER_META_PAGE,
    payload: page
});