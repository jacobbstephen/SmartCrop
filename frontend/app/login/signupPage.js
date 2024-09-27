import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import axios from 'axios';
const signupPage = () => {
    const router = useRouter();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        const data = {
          username,
          password,
          name,
        };
    
        try {
          const response = await axios.post("http://192.168.1.7:8000/register", data);
    
          // Check the response status
          if (response.status === 200) {
            Alert.alert(
              "Success", 
              response.message, 
              [
                {
                  text: "OK", 
                  onPress: () => router.push("/login/loginPage")  // Navigate when "OK" is pressed
                }
              ]
            );
          }
        } catch (err) {
          if (err.response) {
            // Handle different status codes
            if (err.response.status === 400) {
              Alert.alert("Error", "Retry Again", [{ text: "OK" }]);
            } else if (err.response.status === 409) {
                Alert.alert(
                    "Error", 
                    "User already exists", 
                    [
                        { 
                            text: "OK", 
                            onPress: () => router.push("/login/loginPage") // Redirect to login page
                        }
                    ]
                );
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
            <Text style = {styles.mainText} >SIGNUP</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.inputStyle}
                    placeholder="Enter your Name"
                />
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
  )
}

export default signupPage

const styles = StyleSheet.create({
    main: {
        flexGrow: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',     // Center content horizontally
        padding: 30,
    },
    mainText: {
        color: '#00428c',
        fontSize: 60,
        fontStyle:'normal',
        fontWeight: 'bold',
        paddingBottom: 10
    },
    inputContainer: {
        width: '100%',            // Take full width
        alignItems: 'center',     // Center input fields
    },
    inputStyle: {
        width: "95%",             // Width of the input fields
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
        width: 200,               // Fixed width for the button
    },
    submitText: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },
});
