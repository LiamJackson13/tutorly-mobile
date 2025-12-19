import { View, Text } from "react-native";
import { QuickStats } from "../components/QuickStats/QuickStats";

const StudentDashboardScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Student Dashboard Screen</Text>
      <QuickStats />
    </View>
  );
};

export default StudentDashboardScreen;
