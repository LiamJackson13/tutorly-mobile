import {StyleSheet, TouchableOpacity} from "react-native";

const LogoutButton = (props: any) => {

    const handleLogout = () => {
        // TODO: Implement logout functionality here
    }

    return <TouchableOpacity style={styles.logoutButton}>Logout</TouchableOpacity>;
}

export default LogoutButton;

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: '#FF3B30',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    }
})