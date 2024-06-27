import { createStore, combineReducers } from 'redux';
import AuthReducers from './reducers';

const RootReducers = combineReducers({
    // red
    AuthReducers,
})

export const store = createStore(RootReducers);
