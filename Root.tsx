import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import App from './App';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export const { setCurrentUser } = userSlice.actions;

const Root = () => (
    <Provider store={store}>
        <App />
        </Provider>
);

export default Root;
