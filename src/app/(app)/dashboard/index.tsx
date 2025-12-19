import { View } from "react-native";
import { useAuthStore } from "@/src/store/AuthStore";
import TutorDashboardScreen from "@/src/features/dashboard/screens/TutorDashboardScreen";
import StudentDashboardScreen from "@/src/features/dashboard/screens/StudentDashboardScreen";
import ParentDashboardScreen from "@/src/features/dashboard/screens/ParentDashboardScreen";

const DashboardScreen = () => {
  const user = useAuthStore((state) => state.user);

  switch (user?.role) {
    case "tutor":
      return <TutorDashboardScreen />;
    case "student":
      return <StudentDashboardScreen />;
    case "parent":
      return <ParentDashboardScreen />;
    default:
      return <View>Invalid Role</View>;
  }
};

export default DashboardScreen;
