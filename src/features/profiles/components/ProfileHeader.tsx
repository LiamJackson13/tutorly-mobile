import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

type ProfileHeaderProps = {
    name: string;
    role: "student" | "tutor" | "parent" | null;
    email: string;
    avatarEmoji?: string;
    onEditPress?: () => void;
};

export const ProfileHeader = (
    {
        name,
        role,
        email,
        avatarEmoji = "👤",
        onEditPress,
    }: ProfileHeaderProps) => {
    const getRoleBadgeColor = () => {
        switch (role) {
            case "student":
                return "#007AFF";
            case "tutor":
                return "#34C759";
            case "parent":
                return "#FF9500";
            default:
                return "#666";
        }
    };

    const getRoleLabel = () => {
        switch (role) {
            case "student":
                return "🎓 Student";
            case "tutor":
                return "👨‍🏫 Tutor";
            case "parent":
                return "👪 Parent";
            default:
                return role;
        }
    };

    return (
        <View style={styles.container}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    <Text
                        style={styles.avatarEmoji}>{avatarEmoji}</Text>
                </View>
                <TouchableOpacity style={styles.editAvatarButton}>
                    <Text style={styles.editAvatarText}>✏️</Text>
                </TouchableOpacity>
            </View>

            {/* User Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>

                {/* Role Badge */}
                <View
                    style={[
                        styles.roleBadge,
                        {backgroundColor: getRoleBadgeColor() + "20"},
                    ]}
                >
                    <Text
                        style={[styles.roleText, {color: getRoleBadgeColor()}]}>
                        {getRoleLabel()}
                    </Text>
                </View>
            </View>

            {/* Edit Button */}
            {onEditPress && (
                <TouchableOpacity style={styles.editButton}
                                  onPress={onEditPress}>
                    <Text style={styles.editButtonText}>Edit
                        Profile</Text>
                </TouchableOpacity>
            )}

            {/* Stats Row */}
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>Sessions</Text>
                </View>
                <View style={styles.statDivider}/>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>4.8</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statDivider}/>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Reviews</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    avatarEmoji: {
        fontSize: 48,
    },
    editAvatarButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#007AFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "white",
    },
    editAvatarText: {
        fontSize: 14,
    },
    infoContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#666",
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
    },
    roleBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    roleText: {
        fontSize: 14,
        fontWeight: "600",
    },
    editButton: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 20,
    },
    editButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    statsRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#f0f0f0",
    },
});