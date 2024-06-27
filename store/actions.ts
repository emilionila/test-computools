import AsyncStorage from '@react-native-async-storage/async-storage';

export const LogIn = (token:string, userData={}) => {
    AsyncStorage.setItem('authToken', token);
    return {
        type: 'SET_USER',
        payload: { token, userData },
    };
};


export const LogOut = () => {
    AsyncStorage.removeItem('authToken');
    return {
        type: 'CLEAR_USER',
    };
};
