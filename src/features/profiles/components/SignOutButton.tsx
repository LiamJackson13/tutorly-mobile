import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useSignOut} from "@/src/features/profiles/hooks/useSignOut";

const SignOutButton = (props: any) => {
    const {handleSignOut, signOutError, isLoading} = useSignOut();

    const onSignOut = async () => {
        await handleSignOut();
    };

    return <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => onSignOut()}><Text
        style={styles.logoutText}>Sign out</Text></TouchableOpacity>;
}

export default SignOutButton;

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: '#FF3B30',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        width: '80%',
        alignSelf: 'center',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})