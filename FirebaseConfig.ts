import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBRxSGzREszC2NtuZXBGBjkGUH_roqrWBg",
    authDomain: "testcomputools-d2943.firebaseapp.com",
    projectId: "testcomputools-d2943",
    storageBucket: "testcomputools-d2943.appspot.com",
    messagingSenderId: "888675506860",
    appId: "1:888675506860:web:f625dcfe37360e99ec5d09"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
