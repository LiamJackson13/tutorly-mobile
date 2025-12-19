import { View, Text } from "react-native";

const TutorQuickStats = () => {
  // Total students, sessions this week/today, revenue, tasks due/overdue, unread messages
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Quick Stats
      </Text>
    </View>
  );
};

export default TutorQuickStats;
