import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProfileHeader } from "../components/ProfileHeader";

export function TutorProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        name={"John Doe"}
        role="tutor"
        email={"john.doe@example.com"}
      />

      {/* Tutor-specific sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Statistics</Text>
        <Text>Total Sessions: {25}</Text>
        <Text>Average Rating: {4.8}</Text>
        <Text>Students Taught: {15}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Information</Text>
        <Text>Business Name: {"John's Tutoring"}</Text>
        <Text>Hourly Rate: ${50}</Text>
        <Text>Subjects: {"Math, Science, English"}</Text>
      </View>

      {/* More tutor-specific content */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
});
