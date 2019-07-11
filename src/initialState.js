export const initialState = {
    stores: [], // this is indicate a store entity
    user: { // this indicate a store
        token: '',
        username: '',
        password: '',
        isAuthenticated: false
    },
    error: {
        message: ''
    },
    notifications: []
}