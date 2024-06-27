import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {styles} from "./styles";

interface ICustomButtonProps {
    onPress: () => void;
    title: string;
}

const CustomButton = ({onPress, title}:ICustomButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
