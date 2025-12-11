import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProfileHeader } from "../components/ProfileHeader";

export function StudentProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        name="Liam Jackson"
        role="student"
        email="liam.jackson@example.com"
      />

      {/* Student-specific sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <Text>Total Sessions: 10</Text>
        <Text>Homework Completed: 8</Text>
        <Text>Average Grade: B+</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Information</Text>
        <Text>Grade Level: 11</Text>
        <Text>School: Springfield High</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Tutors</Text>
        {/* List of tutors */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
});
