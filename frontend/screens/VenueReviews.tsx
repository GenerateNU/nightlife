import React from "react";
import { Text, View, StyleSheet } from "react-native";

const VenueReviews: React.FC = () => {
    console.log("VENUEEEE")
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", 
  },
  text: {
    color: "#fff",
    fontSize: 100,
  },
});

export default VenueReviews;
