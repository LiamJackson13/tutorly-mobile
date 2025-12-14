import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DevAccountDropdown from "@/src/features/profiles/components/AccountSwitcherDropdown";
import {router} from "expo-router";
import {useAuthStore} from "@/src/features/auth/store/AuthStore";


function formatTime(d: Date) {
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
}

function LiveClock() {
    const [time, setTime] = useState(() => formatTime(new Date()));

    useEffect(() => {
        const id = setInterval(() => setTime(formatTime(new Date())), 1000);
        return () => clearInterval(id);
    }, []);

    return <Text style={styles.clock}>Current time: {time}</Text>;
}


export function TutorDashboardScreen() {
    const user = useAuthStore((state) => state.user);
    const date = new Date();
    return (
        /*
        TODO: Implement Tutor Dashboard UI
        [x] Welcome message
        [x] Current date
        [] Quick stats cards:
        [] Total students
        [] Pending homework reviews
        [] Outstanding payments
        [] This month sessions
        [] Today's schedule (upcoming sessions)
        [] Quick action buttons:
        [] Schedule session
        [] Assign homework
        [] Record payment
        [] Add student
        [] Recent activity feed
        [] Bottom navigation
        */

        <View style={styles.container}>

            <DevAccountDropdown/>
            <Text style={styles.welcomeText}>Welcome {user!.name}!</Text>
            <Text>Today&#39;s date: {date.toDateString()}</Text>
            <LiveClock/>
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
            </TouchableOpacity></View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    clock: {
        fontSize: 16,
        marginBottom: 12,
    },
})