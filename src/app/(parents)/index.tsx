import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";

const ParentDashboard = () => {
    return (
        <View style={styles.container}>
            <Text>Parent Dashboard</Text>
            <TouchableOpacity
                onPress={() => router.push("/(students)")}>
                <Text>
                    Go to Student Dashboard
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push("/(tutors)")}>
                <Text>
                    Go to Tutor Dashboard
                </Text>
            </TouchableOpacity></View>
    )
}

export default ParentDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})