import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";

const StudentDashboard = () => {
    return (
        <View style={styles.container}>
            <Text>Student Dashboard</Text>
            <TouchableOpacity
                onPress={() => router.push("/(tutors)")}>
                <Text>
                    Go to Tutor Dashboard
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push("/(parents)")}>
                <Text>
                    Go to Parent Dashboard
                </Text>
            </TouchableOpacity></View>
    )
}

export default StudentDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})