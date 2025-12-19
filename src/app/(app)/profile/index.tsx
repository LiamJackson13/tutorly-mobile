import { View } from "react-native";

import TutorProfileScreen from "@/src/features/profiles/screens/TutorProfileScreen";
import StudentProfileScreen from "@/src/features/profiles/screens/StudentProfileScreen";
import ParentProfileScreen from "@/src/features/profiles/screens/ParentProfileScreen";
import { useAuthStore } from "@/src/features/auth/store/AuthStore";

const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
 
  switch (user?.role) {
    case "tutor":
      return <TutorProfileScreen />;
    case "student":
      return <StudentProfileScreen />;
    case "parent":
      return <ParentProfileScreen />;
    default:
      return <View>Invalid Role</View>;
  }
};

export default ProfileScreen;
