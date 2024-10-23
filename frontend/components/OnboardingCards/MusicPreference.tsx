import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export type RootStackParamList = {
  MusicPreference: undefined;
  PersonalityScreenReveal2: undefined;
};

const MusicPreferences: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalityScreenReveal2")}
            style={styles.iconWrapper}
          >
            <Image
              src={"https://i.ibb.co/6FsyGtb/image-7.png"}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.iconText}>Jazz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalityScreenReveal2")}
            style={styles.iconWrapper}
          >
            <Image
              src={
                "https://i.ibb.co/N7vfDLc/single-continuous-line-drawing-electric-guitar-with-amplifier-rock-music-illuminated-stage-backgroun.png"
              }
              style={{ width: 90, height: 90 }}
            />
            <Text style={styles.iconText}>Rock</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalityScreenReveal2")}
            style={styles.iconWrapper}
          >
            <Image
              src={"https://i.ibb.co/XDfmf4Y/image-8.png"}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.iconText}>Hip Hop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalityScreenReveal2")}
            style={styles.iconWrapper}
          >
            <Image
              src={"https://i.ibb.co/T0P1QBp/image-9.png"}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.iconText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("PersonalityScreenReveal2")}
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
