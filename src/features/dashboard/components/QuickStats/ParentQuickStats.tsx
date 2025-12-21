import { View, Text } from "react-native";

const ParentQuickStats = () => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Quick Stats
      </Text>
      {/* Sessions This Month */}
      <Text>Sessions This Month: 8</Text>
      {/* Homework Completion Rate */}
      <Text>Homework Completion Rate: 92%</Text>
      {/* Attendance Rate */}
      <Text>Attendance Rate: 95%</Text>
      {/* Payment Status */}
      <Text>Payment Status: Up to Date</Text>
    </View>
  );
};

export default ParentQuickStats;
