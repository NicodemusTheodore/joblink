import { View, Text, StyleSheet } from "react-native";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
      <Text>OWO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;
