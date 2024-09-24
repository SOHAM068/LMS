import { useState } from "react";
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

export default function index() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return Alert.alert(
        "Error",
        "New password and confirm password must match"
      );
    }

    setLoading(true);

    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      const response = await axios.put(
        `${SERVER_URI}/update-user-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Password updated successfully");
        router.push("/(routes)/profile-details");
      } else {
        Alert.alert("Error", "Failed to update password");
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        style={{ marginTop: 40 }}
      >
        <Text style={styles.header}>Change Password</Text>

        {/* Old Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={styles.input}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
            placeholder="Enter old password"
          />
        </View>

        {/* New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholder="Enter new password"
          />
        </View>

        {/* Confirm New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Confirm new password"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <Loader />
          ) : (
            <Text style={styles.buttonText}>Update Password</Text>
          )}
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
