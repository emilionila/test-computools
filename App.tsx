import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import Login from "./app/screens/Login";
import Feed from "./app/screens/Tabs/Feed";
import Profile from "./app/screens/Tabs/Profile";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { LogIn, LogOut } from './store/actions';
import { store } from "./store";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const InsideLayout = () => {
    return (
        <Tab.Navigator
            style={{ paddingTop: 60, backgroundColor: '#a1ccef' }}
            screenOptions={({ route }) => ({
                tabBarLabelStyle: { fontSize: 14, color: '#fff', fontWeight: '600', letterSpacing: 1 },
                tabBarStyle: { backgroundColor: '#a1ccef' },
                tabBarActiveTintColor: '#bababa',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

const RootNavigation = () => {
    const token = useSelector((state:any) => state.AuthReducers.authToken);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {token ? (
                    <Stack.Screen name="InsideTabs" component={InsideLayout} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App = () => {
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                dispatch(LogIn(token));
            }
            setInitializing(false);
        };

        loadToken();

        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                dispatch(LogIn(user.uid, user));
            } else {
                dispatch(LogOut());
            }
        });

        return unsubscribe;
    }, [dispatch]);
    if (initializing) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <RootNavigation />
        </View>
    );
};

export default function Main() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
