import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        backgroundColor: '#e6e6e6',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 5,
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    loader: {
        marginVertical: 20,
    },
})
