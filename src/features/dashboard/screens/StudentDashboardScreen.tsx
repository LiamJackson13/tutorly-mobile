import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DevAccountDropdown from "@/src/features/profiles/components/AccountSwitcherDropdown";
import {router} from "expo-router";

export function StudentDashboardScreen() {
    return (
        <View style={styles.container}>
            <DevAccountDropdown/>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})