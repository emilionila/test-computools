import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 60,
        gap: 50,
        flex: 1,
        justifyContent: 'space-between',
    },
    userCard: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#dcdcdc',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#8e8e8e',
    },
    txt: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
    },
    userAvatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    }
})
