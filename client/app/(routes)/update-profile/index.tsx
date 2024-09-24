import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import Loader from "@/components/loader/loader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URI } from "@/utils/uri";
import { router } from "expo-router";
import useUser from "@/hooks/auth/useUser"; // custom hook to get user data

export default function index() {
  const { user, loading, setRefetch } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || ""); // You can add email update here too
  const [loader, setLoader] = useState(false);

  let [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (!fontsLoaded || loading) {
    return <Loader />;
  }

  const handleUpdateUserInfo = async () => {
    setLoader(true);

    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      const response = await axios.put(
        `${SERVER_URI}/update-user-info`,
        { name }, // You can include email as well if needed
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "User information updated successfully");
        setRefetch(true); // refresh user data
        router.push("/(routes)/profile-details"); // Navigate back to profile screen
      } else {
        Alert.alert("Error", "Failed to update user information");
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        style={{ marginTop: 50 }}
      >
        <Text style={styles.header}>Update Profile</Text>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter new name"
          />
        </View>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter new email"
          />
        </View>
        {/* Submit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateUserInfo}
          disabled={loader}
        >
          {loader ? <Loader /> : <Text style={styles.buttonText}>Update</Text>}
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#CBD5E0",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Nunito_600SemiBold",
    color: "#fff",
  },
});
