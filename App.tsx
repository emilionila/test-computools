import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './app/screens/Login';
import Feed from './app/screens/Tabs/Feed';
import Profile from './app/screens/Tabs/Profile';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null as User | null,
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

export default function App() {
    const currentUser = useSelector((state: any) => state.user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user: User | null) => {
            if (user) {
                console.log('User logged in:', user);
                dispatch(setCurrentUser(user));
            } else {
                console.log('User logged out');
                dispatch(setCurrentUser(null));
            }
        }, (error) => {
            console.error('Firebase auth state change error:', error);
        });

        return () => unsubscribe();
    }, [dispatch]);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {currentUser ? (
                        <Stack.Screen name="InsideTabs" component={InsideLayout} options={{ headerShown: false }} />
                    ) : (
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

function InsideLayout() {
    return (
        <Tab.Navigator
            style={{ paddingTop: 60, backgroundColor: '#a1ccef' }}
            screenOptions={({ route }: any) => ({
                tabBarLabelStyle: { fontSize: 14, color: '#fff', fontWeight: '600', letterSpacing: 1 },
                tabBarStyle: { backgroundColor: '#a1ccef' },
            })}
            tabBarOptions={{
                activeTintColor: '#bababa',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
