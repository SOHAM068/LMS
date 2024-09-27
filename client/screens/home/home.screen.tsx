import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import SearchInput from "@/components/common/search.input";
import HomeBannerSlider from "@/components/home/home.banner.slider";
import AllCourses from "@/components/courses/all.courses";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#D9E9F5", "#F5F9F8"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header />
      <SearchInput homeScreen={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeBannerSlider />
        <AllCourses />
      </ScrollView>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({});
