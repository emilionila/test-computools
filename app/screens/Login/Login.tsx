import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const validateInputs = () => {
        if (!email || !password) {
            setError("Email and password are required.");
            return false;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email.");
            return false;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        setError("");
        return true;
    };

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            setError("Failed to sign in. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            setError("Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    autoCapitalize="none"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                {isLogin ? (
                    <>
                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}
                        {loading ? (
                            <ActivityIndicator size="large" color="#a1ccef" />
                        ) : (
                            <>
                                <TouchableOpacity style={styles.button} onPress={signIn}>
                                    <Text style={styles.buttonText}>LogIn</Text>
                                </TouchableOpacity>
                                    <Text style={styles.additionalText} onPress={()=> setIsLogin(false)}>Create Account</Text>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}
                        {loading ? (
                            <ActivityIndicator size="large" color="#a1ccef" />
                        ) : (
                            <>
                                <TouchableOpacity style={styles.button} onPress={signUp}>
                                    <Text style={styles.buttonText}>Create Account</Text>
                                </TouchableOpacity>
                                <Text style={styles.additionalText} onPress={()=> setIsLogin(true)}>LogIn</Text>
                            </>
                        )}
                    </>
                )}

            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;
