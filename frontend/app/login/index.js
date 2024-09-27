import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
const { height, width } = Dimensions.get("window");
const index = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/greenbg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.text}>SMART CROP</Text>
        {/* Buttons container */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/login/loginPage")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/login/signupPage")}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // Centers everything inside the background?
    alignItems: "center",
    height: height,
  },
  text: {
    color: "white",
    fontSize: 58,
    fontWeight: "bold",
    margin: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15, // Adjust as per your preference
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1, // Makes the buttons take equal width
    backgroundColor: "#E1EBEE", // Semi-transparent white
    paddingVertical: 10,
    paddingHorizontal: 0, // Remove horizontal padding to let flex take full width
    borderRadius: 10,
    marginHorizontal: 5, // Small margin between buttons
    alignItems: "center", // Center text horizontally
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
