import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";

const TutorDashboard = () => {
    return (
        <View style={styles.container}>
            <Text>Tutor Dashboard</Text>
            <TouchableOpacity
                onPress={() => router.push("/(students)")}>
                <Text>
                    Go to Student Dashboard
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push("/(parents)")}>
                <Text>
                    Go to Parent Dashboard
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TutorDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})