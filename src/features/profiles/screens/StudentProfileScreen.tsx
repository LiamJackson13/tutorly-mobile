import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ProfileHeader} from "../components/ProfileHeader";
import {useAuthStore} from "@/src/features/auth/store/AuthStore";
import SignOutButton from "@/src/features/profiles/components/SignOutButton";

export function StudentProfileScreen() {
    const user = useAuthStore((state) => state.user);
    if (!user) {
        return (<Text>Loading...</Text>);
    }
    return (
        <ScrollView style={styles.container}>
            <ProfileHeader name={user.name} role={user.role}
                           email={user.email}/>

            {/* Student-specific sections */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Progress</Text>
                <Text>Total Sessions: 10</Text>
                <Text>Homework Completed: 8</Text>
                <Text>Average Grade: B+</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Academic
                    Information</Text>
                <Text>Grade Level: 11</Text>
                <Text>School: Springfield High</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Tutors</Text>
                {/* List of tutors */}
            </View>
            <SignOutButton/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#fff"},
    section: {padding: 20},
    sectionTitle: {fontSize: 18, fontWeight: "600", marginBottom: 12},
});