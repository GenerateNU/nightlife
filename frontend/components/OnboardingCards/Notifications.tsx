import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import onboardingStyles from "./onboardingStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export type RootStackParamList = {
  Notifications: undefined;
  PersonalityScreenReveal: undefined;
};

const Notifications = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [notifications, setNotifications] = useState(false);

  const handleNext = () => {
    navigation.navigate("PersonalityScreenReveal");
  };

  const handleNotification = () => {
    setNotifications((prev) => !prev); // Toggle notifications state
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={onboardingStyles.container}
    >
      <View style={onboardingStyles.mainContent}>
        <Text style={styles.title}>
          STAY IN{"\n"}THE{"\n"}KNOW
        </Text>

        <Text style={styles.notificationText}>
          Turning on notifications allows you to get the most out of Nightlife
          and stay up to date
        </Text>

        <TouchableOpacity onPress={handleNotification} style={styles.button}>
          <Text style={onboardingStyles.nextButtonText}>
            Allow notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={onboardingStyles.nextButton}
        >
          <Text style={onboardingStyles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  notificationText: {
    color: "white",
    fontSize: 24,
    fontFamily: "DT Nightingale",
    fontWeight: "300",
    lineHeight: 28.8,
    textAlign: "left",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 64,
    fontFamily: "Archivo",
    fontWeight: "700",
    marginTop: 120,
    marginBottom: 20,
    textAlign: "left",
    width: "100%",
    flexWrap: "wrap",
  },
  button: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
});

export default Notifications;
