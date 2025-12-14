import {useAuthStore} from "@/src/features/auth/store/AuthStore";
import {Text} from "react-native";
import React from "react";
import {TutorDashboardScreen} from "./TutorDashboardScreen";
import {StudentDashboardScreen} from "./StudentDashboardScreen";
import {ParentDashboardScreen} from "./ParentDashboardScreen";

// Smart component that auto-selects based on role
export function DashboardScreen() {
    const user = useAuthStore((state) => state.user);

    switch (user?.role) {
        case "tutor":
            return <TutorDashboardScreen/>;

        case "student":
            return <StudentDashboardScreen/>;
        case "parent":
            return <ParentDashboardScreen/>;
        default:
            return <Text>Invalid Role</Text>;
    }
}

// Also export individual screens if needed elsewhere
export {TutorDashboardScreen} from "./TutorDashboardScreen";
export {StudentDashboardScreen} from "./StudentDashboardScreen";
export {ParentDashboardScreen} from "./ParentDashboardScreen";