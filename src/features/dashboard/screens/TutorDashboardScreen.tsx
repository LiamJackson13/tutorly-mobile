import { Text, View } from "react-native";
import { QuickStats } from "../components/QuickStats/QuickStats";

const TutorDashboardScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tutor Dashboard Screen</Text>
      <QuickStats />
    </View>
  );
};

export default TutorDashboardScreen;
