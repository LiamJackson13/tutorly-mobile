import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {UserOnlyGuard} from "@/src/features/auth/components/UserOnly";
import {useAuthStore} from "@/src/store/AuthStore";

const Dashboard = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <UserOnlyGuard>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.greeting}>
                                Hello, {user!.email}👋
                            </Text>
                            <Text style={styles.subtitle}>Ready to learn today?</Text>
                        </View>
                        <TouchableOpacity style={styles.profileButton}>
                            <Text style={styles.profileIcon}>👤</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for tutors, subjects..."
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Quick Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Sessions</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>5</Text>
                            <Text style={styles.statLabel}>Tutors</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>8.5</Text>
                            <Text style={styles.statLabel}>Avg Rating</Text>
                        </View>
                    </View>

                    {/* Upcoming Sessions */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sessionCard}>
                            <View style={styles.sessionLeft}>
                                <View style={styles.sessionIcon}>
                                    <Text style={styles.sessionEmoji}>📚</Text>
                                </View>
                                <View>
                                    <Text style={styles.sessionTitle}>Math Tutoring</Text>
                                    <Text style={styles.sessionSubtitle}>with John Smith</Text>
                                    <Text style={styles.sessionTime}>Today, 3:00 PM</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.joinButton}>
                                <Text style={styles.joinButtonText}>Join</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sessionCard}>
                            <View style={styles.sessionLeft}>
                                <View style={styles.sessionIcon}>
                                    <Text style={styles.sessionEmoji}>🔬</Text>
                                </View>
                                <View>
                                    <Text style={styles.sessionTitle}>Science Lab</Text>
                                    <Text style={styles.sessionSubtitle}>with Sarah Davis</Text>
                                    <Text style={styles.sessionTime}>Tomorrow, 10:00 AM</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.joinButton}>
                                <Text style={styles.joinButtonText}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Popular Tutors */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Popular Tutors</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.tutorCard}>
                                <View style={styles.tutorAvatar}>
                                    <Text style={styles.tutorAvatarText}>👨‍🏫</Text>
                                </View>
                                <Text style={styles.tutorName}>John Smith</Text>
                                <Text style={styles.tutorSubject}>Mathematics</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingText}>⭐ 4.8</Text>
                                </View>
                            </View>

                            <View style={styles.tutorCard}>
                                <View style={styles.tutorAvatar}>
                                    <Text style={styles.tutorAvatarText}>👩‍🏫</Text>
                                </View>
                                <Text style={styles.tutorName}>Sarah Davis</Text>
                                <Text style={styles.tutorSubject}>Science</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingText}>⭐ 4.9</Text>
                                </View>
                            </View>

                            <View style={styles.tutorCard}>
                                <View style={styles.tutorAvatar}>
                                    <Text style={styles.tutorAvatarText}>👨‍💻</Text>
                                </View>
                                <Text style={styles.tutorName}>Mike Johnson</Text>
                                <Text style={styles.tutorSubject}>Programming</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingText}>⭐ 4.7</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                        <View style={styles.actionsGrid}>
                            <TouchableOpacity style={styles.actionCard}>
                                <Text style={styles.actionIcon}>📅</Text>
                                <Text style={styles.actionText}>Schedule</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionCard}>
                                <Text style={styles.actionIcon}>💬</Text>
                                <Text style={styles.actionText}>Messages</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionCard}>
                                <Text style={styles.actionIcon}>📊</Text>
                                <Text style={styles.actionText}>Progress</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionCard}>
                                <Text style={styles.actionIcon}>⚙️</Text>
                                <Text style={styles.actionText}>Settings</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </UserOnlyGuard>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: "white",
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    profileButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
    },
    profileIcon: {
        fontSize: 24,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 24,
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    searchIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    statsContainer: {
        flexDirection: "row",
        paddingHorizontal: 24,
        marginBottom: 24,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#007AFF",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    seeAllText: {
        fontSize: 14,
        color: "#007AFF",
        fontWeight: "600",
    },
    sessionCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    sessionLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    sessionIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    sessionEmoji: {
        fontSize: 24,
    },
    sessionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 2,
    },
    sessionSubtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    sessionTime: {
        fontSize: 12,
        color: "#999",
    },
    joinButton: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    joinButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    tutorCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginRight: 12,
        width: 140,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    tutorAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    tutorAvatarText: {
        fontSize: 32,
    },
    tutorName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
        textAlign: "center",
    },
    tutorSubject: {
        fontSize: 12,
        color: "#666",
        marginBottom: 8,
    },
    ratingContainer: {
        backgroundColor: "#fff8e1",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    ratingText: {
        fontSize: 12,
        color: "#f57c00",
        fontWeight: "600",
    },
    actionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 12,
    },
    actionCard: {
        backgroundColor: "white",
        width: "48%",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    actionIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    actionText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
});
