import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

// importing icons
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
const Index = () => {
  const router = useRouter();

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    else if (currentHour < 16) return "Good Afternoon";
    else return "Good Evening";
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", padding: 10, paddingTop: 30 }}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* For top bar */}
      <View style={styles.topBar}>
        <Text style={styles.greetingText}>{getGreeting()}</Text>
        <FontAwesome6 
        onPress = {() => router.push("/home/user")}
        name="circle-user" size={46} color="black" />
      </View>

      {/* For Middle section */}
      <View style={styles.middlePart}>
        <Entypo name="tree" size={300} color="green" />
        <Text style={styles.middleText}>How can I help You?</Text>
      </View>

      {/* For bottom part */}
      <View style={styles.bottomPart}>
        <Pressable
          onPress={() => router.push("/home/cropHelp")}
          style={styles.pressButton}
        >
          <Text style={styles.pressButtonsText}>Crop Help</Text>
        </Pressable>
        <Pressable style={styles.pressButton}>
          <Text style={styles.pressButtonsText}>Disease Predictor</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  greetingText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#001F3F",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  middlePart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  middleText: {
    fontSize: 35,
    fontWeight: "bold",
    padding: 2,
    paddingTop: 35,
  },
  bottomPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  pressButtonsText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  pressButton: {
    backgroundColor: "#001F3F",
    paddingHorizontal: 33,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
