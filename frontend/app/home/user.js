import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const { width } = Dimensions.get('window'); // Get screen width
const padding = width / 4 + 2; // Calculate padding
const user = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");

        const response = await axios.get(
          "http://192.168.1.7:8000/getmyprofile",
          {
            headers: {
              Authorization: accessToken ? accessToken : undefined,
            },
          }
        );

        if (response.status === 200) {

          setUserData(response.data); // Adjust based on your API response structure
        
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to retrieve user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);
  return (
    <ScrollView style={{ padding: 30 }}>
      <AntDesign
        onPress={() => router.push("/home/")}
        name="arrowleft"
        size={24}
        color="black"
      />
      {/* <FontAwesome6 

        name="circle-user" style = {styles.userIcon} size={100} color="green" /> */}

<View>
        {userData ? (
          <>
            {/* <View style = {styles.group}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.fetchData}>{userData.user.name}</Text>
            </View>
            <View style = {styles.group}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.fetchData}>{userData.user.username}</Text>
            </View> */}
             {/* previousData */}
             

             <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tablehead}>N</Text>
                <Text style={styles.tablehead}>P</Text>
                <Text style={styles.tablehead}>K</Text>
                <Text style={styles.tablehead}>Temperature</Text>
                <Text style={styles.tablehead}>Humidity</Text>
                <Text style={styles.tablehead}>pH</Text>
                <Text style={styles.tablehead}>Rainfall</Text>
                <Text style={styles.tablehead}>Label</Text>
              </View>
              {userData.user.previousData.map((prompt, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{prompt.N}</Text>
                  <Text style={styles.tableCell}>{prompt.P}</Text>
                  <Text style={styles.tableCell}>{prompt.K}</Text>
                  <Text style={styles.tableCell}>{prompt.temperature}</Text>
                  <Text style={styles.tableCell}>{prompt.humidity}</Text>
                  <Text style={styles.tableCell}>{prompt.ph}</Text>
                  <Text style={styles.tableCell}>{prompt.rainfall}</Text>
                  <Text style={styles.tableCell}>{prompt.label}</Text>
                </View>
              ))}
            </View>
            
          </>
        ) : (
          <View>
            <AntDesign name="loading1" size={40} color="black" />
            <Text>Loading user data...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default user;

const styles = StyleSheet.create({
  group: {
    padding: 5,
    paddingTop: 10,  
    flex: 1,
    flexDirection: 'row',
    gap: 5
  
  },
  label: {
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: 20
  },
  userIcon:{
    padding: 10,
    paddingLeft: padding
  },
  fetchData:{
    fontWeight: 'bold',
    fontSize: 20
  },
  prompts:{
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    paddingTop: 15,
  },
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#00428c',
    
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: 'black'  
  },
  tablehead: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: 'white'  
  },
});
