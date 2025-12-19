import { View, Text } from "react-native";
import { QuickStats } from "../components/QuickStats/QuickStats";

const ParentDashboardScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Parent Dashboard Screen</Text>
      <QuickStats />
    </View>
  );
};

export default ParentDashboardScreen;
