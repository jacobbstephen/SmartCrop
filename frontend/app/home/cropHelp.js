import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


// importing icons

import AntDesign from "@expo/vector-icons/AntDesign";

const cropHelp = () => {
  const [N, setN] = useState(0);
  const [P, setP] = useState(0);
  const [K, setK] = useState(0);
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pH, setpH] = useState(0);
  const [rainfall, setRainfall] = useState(0);

  const router = useRouter();

  // handle storing the prediction in DB
  const storePrediction = async (predictedCrop) => {
    console.log("In storePrediction");
    const data = {
        N, 
        P,
        K, 
        temperature: temp, 
        humidity, 
        ph: pH, 
        rainfall, 
        predictedCrop
    };

    try {
        // Retrieve the access token from AsyncStorage
        const accessToken = await AsyncStorage.getItem('accessToken');

        const response = await axios.post("http://192.168.1.7:8000/predictionresults", data, {
            headers: {
                // Include the access token in the headers
                Authorization: accessToken ? accessToken : undefined,
            },
        });

        if (response.status === 200) {
            // Handle successful response
            Alert.alert("Success", "Prediction stored successfully.");
            router.push("/home/")
        }
    } catch (err) {
        console.error("Error storing prediction:", err);
        Alert.alert("Error", "Failed to store prediction. Please try again.");
    }
};
  // handle prediction
  const handleSubmit = () => {
    console.log("In SUBMIT");
    const data = {
      N: parseFloat(N),
      P: parseFloat(P),
      K: parseFloat(K),
      temperature: parseFloat(temp),
      humidity: parseFloat(humidity),
      ph: parseFloat(pH),
      rainfall: parseFloat(rainfall),
    };

    axios
      .post("http://10.0.2.2:5000/predict", data)
      .then((response) => {
        const prediction = response.data.prediction; // Adjust based on your API response structure

        Alert.alert(
          "What we think",
          `Grow ${prediction} as it's best suited for your soil conditions`,
          [
            {
              text: "OK",
              onPress: () => storePrediction(prediction),// Navigate to the main screen
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert(
          "Error",
          "An error occurred while fetching the prediction."
        );
      });
  };

  return (
    <ScrollView style={{ padding: 30 }}>
      <View>
        <AntDesign
          onPress={() => router.push("/home/")}
          name="arrowleft"
          size={24}
          color="black"
        />
        <Text style={styles.headertext}>
          Have a Doubt regarding which crop to grow?
        </Text>
        <Text style={styles.subText}>
          Fill in your information, and watch us work our magic!
        </Text>
      </View>
      {/* for input part  */}

      <TextInput
        value={N}
        onChangeText={(text) => setN(text)}
        style={styles.inputStyle}
        placeholder="Nitrogen (kg/ha)"
      />
      <TextInput
        value={P}
        onChangeText={(text) => setP(text)}
        style={styles.inputStyle}
        placeholder="Phosphorus (kg/ha)"
      />
      <TextInput
        value={K}
        onChangeText={(text) => setK(text)}
        style={styles.inputStyle}
        placeholder="Potassium (kg/ha)"
      />
      <TextInput
        value={temp}
        onChangeText={(text) => setTemp(text)}
        style={styles.inputStyle}
        placeholder="Temperature (°C)"
      />
      <TextInput
        value={humidity}
        onChangeText={(text) => setHumidity(text)}
        style={styles.inputStyle}
        placeholder="Humdity (%)"
      />
      <TextInput
        value={pH}
        onChangeText={(text) => setpH(text)}
        style={styles.inputStyle}
        placeholder="pH (0 to 14)"
      />
      <TextInput
        value={rainfall}
        onChangeText={(text) => setRainfall(text)}
        style={styles.inputStyle}
        placeholder="Rainfall (mm)"
      />
      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

export default cropHelp;

const styles = StyleSheet.create({
  headertext: {
    marginTop: 20,
    color: "#001F3F",
    fontSize: 40,
    fontWeight: "bold",
  },
  subText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  inputStyle: {
    width: "95%",
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
    marginLeft: 70,
    width: 200,
  },
  submitText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
