import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: hp("35%"),
    marginHorizontal: 16,
    borderRadius: 12,  // Rounded corners for container
    overflow: 'hidden', // Ensure images don't go outside bounds
  },

  slide: {
    flex: 1,
    borderRadius: 12,
    elevation: 10, // Shadow for Android
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15, // Shadow for iOS
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",  // Ensures the image fills its space with appropriate scaling
  },

  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for text contrast
    padding: 10,
    borderRadius: 8,
  },

  bannerText: {
    color: "#fff",
    fontSize: hp("2.5%"),
    fontFamily: "Raleway_700Bold",
  },

  bannerSubText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: hp("2%"),
    marginTop: 5,
    fontFamily: "Nunito_400Regular",
  },

  dot: {
    backgroundColor: "#C6C7CC",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: "#2467EC",
    width: 16.9, // Slightly larger for better visibility
    height: 10,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});
