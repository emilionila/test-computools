import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: '#d1d1d1',
        borderWidth: 1,
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    button: {
        backgroundColor: '#a1ccef',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        marginBottom: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    errorText: {
        color: '#ff2b2b',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    additionalText: {
        color: '#a1ccef',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        textAlign: 'center',
    }
});
