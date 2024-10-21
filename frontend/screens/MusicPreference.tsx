import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const MusicPreferences: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>What type of music do you enjoy?</Text>

      <View style={styles.iconsContainer}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesome name="music" size={70} color="#FFF" />{" "}
            {/* Increased size */}
            <Text style={styles.iconText}>Jazz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <MaterialIcons name="light" size={70} color="#FFF" />{" "}
            {/* Increased size */}
            <Text style={styles.iconText}>Rock</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesome name="headphones" size={70} color="#FFF" />{" "}
            {/* Increased size */}
            <Text style={styles.iconText}>Hip Hop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesome name="header" size={70} color="#FFF" />{" "}
            {/* Increased size */}
            <Text style={styles.iconText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("NextScreen")}
        style={styles.skipButton}
      >
        <Text style={styles.skipButtonText}>SKIP</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#313131",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 100,
  },
  headerText: {
    fontSize: 36,
    color: "#fff",
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20, // Increased margin
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10, // Added padding
  },
  iconText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  skipButton: {
    marginTop: 20,
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default MusicPreferences;
