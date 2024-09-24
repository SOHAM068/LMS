import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import useUser from "@/hooks/auth/useUser";
import Loader from "@/components/loader/loader";
import { router } from "expo-router";

export default function index() {
  const { user, loading } = useUser();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 40 }}>
        {/* Profile Image and Name */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri:
                user?.avatar?.url ||
                "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
            }}
            style={{ width: 120, height: 120, borderRadius: 100 }}
          />
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Raleway_700Bold",
              marginTop: 10,
            }}
          >
            {user?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#6b6b6b",
              fontFamily: "Nunito_400Regular",
              marginTop: 5,
            }}
          >
            {user?.email}
          </Text>
        </View>

        {/* Profile Details */}
        <View style={{ marginTop: 40, marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Raleway_700Bold",
              marginBottom: 10,
            }}
          >
            Account Information
          </Text>

          {/* Name */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Nunito_600SemiBold" }}>
              Full Name
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Nunito_400Regular" }}>
              {user?.name}
            </Text>
          </View>

          {/* Email */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Nunito_600SemiBold" }}>
              Email
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Nunito_400Regular" }}>
              {user?.email}
            </Text>
          </View>

          {/* User Role */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Nunito_600SemiBold" }}>
              User Role
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Nunito_400Regular" }}>
              {user?.role}
            </Text>
          </View>

          {/* Additional Account Information (if needed) */}

          {/* Actions Section */}
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Raleway_700Bold",
                marginBottom: 10,
              }}
            >
              Actions
            </Text>

            {/* Update Profile Button */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderRadius: 10,
                backgroundColor: "#f5f5f5",
                marginBottom: 15,
              }}
              onPress={() => router.push("/(routes)/update-profile")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="user" size={20} color="#444" />
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 16,
                    fontFamily: "Nunito_600SemiBold",
                  }}
                >
                  Update Profile
                </Text>
              </View>
              <AntDesign name="right" size={24} color={"#CBD5E0"} />
            </TouchableOpacity>

            {/* Change Password Button */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderRadius: 10,
                backgroundColor: "#f5f5f5",
                marginBottom: 15,
              }}
              onPress={() => router.push("/(routes)/change-password")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="key-outline" size={20} color="#444" />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontFamily: "Nunito_600SemiBold",
                  }}
                >
                  Change Password
                </Text>
              </View>
              <AntDesign name="right" size={24} color={"#CBD5E0"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
