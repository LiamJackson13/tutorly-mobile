import { View, Text } from "react-native";

const StudentQuickStats = () => {
  // Homework due today, homework overdue, upcoming sessions this week, completion rate
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Quick Stats
      </Text>
    </View>
  );
};

export default StudentQuickStats;
