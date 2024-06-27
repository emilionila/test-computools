const initialState = {
    authToken: null,
    userData: {}, // Initialize empty user data
};

export default (state = initialState, action:any) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                authToken: action.payload.token,
                userData: action.payload.userData,
            };
        case 'CLEAR_USER':
            return initialState;
        default:
            return state;
    }
};
