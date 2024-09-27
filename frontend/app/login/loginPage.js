import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginPage = () => {
  const router = useRouter();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post("http://192.168.1.7:8000/login", data);

      // Check the response status
      if (response.status === 200) {
        // Store the access token in local storage
        const accessToken = response.data.accessToken;
        await AsyncStorage.setItem("accessToken", accessToken);
        router.push("/home");
      }
    } catch (err) {
      if (err.response) {
        // Handle different status codes
        if (err.response.status === 400) {
          Alert.alert("Error", "User not found", [{ text: "OK" }]);
        } else if (err.response.status === 401) {
          Alert.alert("Error", "Incorrect password", [{ text: "OK" }]);
        } else {
          Alert.alert("Error", "An unexpected error occurred", [
            { text: "OK" },
          ]);
        }
      } else {
        Alert.alert("Error", "Network error. Please try again later.", [
          { text: "OK" },
        ]);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <Text style={styles.mainText}>LOGIN</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          onChangeText={(text) => setUserName(text)}
          style={styles.inputStyle}
          placeholder="Enter username"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputStyle}
          placeholder="Enter password"
          secureTextEntry // Optional: to hide password input
        />
        <Pressable onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default loginPage;

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 30,
  },
  mainText: {
    color: "#00428c",
    fontSize: 60,
    fontStyle: "normal",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  inputContainer: {
    width: "100%", // Take full width
    alignItems: "center", // Center input fields
  },
  inputStyle: {
    width: "95%", // Width of the input fields
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    backgroundColor: "#E1EBEE",
  },
  submitButton: {
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: "#00428c",
    padding: 10,
    width: 200, // Fixed width for the button
  },
  submitText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
