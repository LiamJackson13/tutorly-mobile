import { useAuthStore } from "@/src/store/AuthStore";
import { Text } from "react-native";
import { ParentProfileScreen } from "./ParentProfileScreen";
import { StudentProfileScreen } from "./StudentProfileScreen";
import { TutorProfileScreen } from "./TutorProfileScreen";

// Smart component that auto-selects based on role
export function ProfileScreen() {
  const user = useAuthStore((state) => state.user);

  switch (user?.role) {
    case "tutor":
      return <TutorProfileScreen />;
    case "student":
      return <StudentProfileScreen />;
    case "parent":
      return <ParentProfileScreen />;
    default:
      return <Text>Invalid Role</Text>;
  }
}

// Also export individual screens if needed elsewhere
export { ParentProfileScreen } from "./ParentProfileScreen";
export { StudentProfileScreen } from "./StudentProfileScreen";
export { TutorProfileScreen } from "./TutorProfileScreen";
