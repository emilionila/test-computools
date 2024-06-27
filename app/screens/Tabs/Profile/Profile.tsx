import {Text, View, Image} from "react-native";
import {styles} from "./styles";
import {FIREBASE_AUTH} from "../../../../FirebaseConfig";
import CustomButton from "../../../components/CustomButton";
import {useEffect, useState} from "react";

const Profile = () => {
    const [name, setName] = useState("test");
    const [email, setEmail] = useState("test@");
    const [image, setImage] = useState("");

    useEffect(() => {
        getUserAvatar();
    }, []);

    const getUserAvatar = async () => {
        try {
            const response = await fetch('https://reqres.in/api/users/2');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            setName(userData.data.first_name);
            setImage(userData.data.avatar);
        } catch (error) {
            console.error('Error fetching user avatar:', error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.userCard}>
                <Image
                    src={image}
                    alt="user image"
                    style={styles.userAvatar}
                />
                <Text style={styles.txt}>{`Name: ${name}`}</Text>
                <Text style={styles.txt}>{`Email: ${email}`}</Text>

            </View>
            <CustomButton
                onPress={()=> FIREBASE_AUTH.signOut()}
                title={'Log Out'}
            />
        </View>
    )
}
export default Profile;
