import { View, Text } from "react-native";
import { useAuthStore } from "../../../auth/store/AuthStore";
import TutorQuickStats from "./TutorQuickStats";
import StudentQuickStats from "./StudentQuickStats";
import ParentQuickStats from "./ParentQuickStats";

export const QuickStats = () => {
  const user = useAuthStore((state) => state.user);

  switch (user?.role) {
    case "tutor":
      return <TutorQuickStats />;
    case "student":
      return <StudentQuickStats />; 
    case "parent":
      return <ParentQuickStats />;

    default:
      return <Text>Invalid User Role</Text>;
  }
};
