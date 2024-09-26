import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedLoader from "react-native-animated-loader";

export default function Loader() {
  return (
    <LinearGradient
      colors={["#D9E9F5", "#F5F9F9"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("@/assets/animation/Animation - 1726652856632.json")}
        animationStyle={{ width: 250, height: 250 }}
        speed={1.3}
      />
    </LinearGradient>
  );
}
