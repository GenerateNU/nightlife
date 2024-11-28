import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormData } from "./FormDataContext";
import onboardingStyles from "./onboardingStyles";
import { API_DOMAIN, BEARER } from "@env";

export type RootStackParamList = {
  UserFormP4: undefined;
  PersonalityScreenReveal: undefined;
};

type NavigationType = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

const UserFormP4: React.FC = () => {
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationType>();

  const [location, setLocation] = useState<string>(formData.location || "");

  const handleSubmit = async () => {
    // Update formData first
    updateFormData({ location });

    // After a delay to ensure formData is updated, proceed with submission
    setTimeout(async () => {
      let dataUserId = null;
      try {
        const response = await fetch(
          `${API_DOMAIN}/profiles/${formData.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${BEARER}`,
            },
          }
        );
        dataUserId = await response.json();
        console.log("dataUserId:", dataUserId);
      } catch (error) {
        console.error("Network or server error:", error);
      }

      // Create the payload using updated formData
      const payload = {
        userId: dataUserId.user_id,
        nightlife: formData.nightlife,
        interests: formData.interests,
        crowd_preference: formData.crowdPreference,
        time_preference: formData.timePreference,
        location: formData.location,
        frequency: formData.frequency,
        insideoroutside: formData.insideOrOutside,
      };

      console.log("Submitting FormData:", payload);

      try {
        const response = await fetch(`${API_DOMAIN}/profiles/preferences`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.error) {
          console.error("Submission Error:", data.error);
        } else {
          console.log("Submission Success:", data);
          navigation.navigate("PersonalityScreenReveal");
        }
      } catch (error) {
        console.error("Network or server error:", error);
      }
      const prefResponse = await fetch(
        `${API_DOMAIN}/profiles/userCharacter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!prefResponse.ok) {
        throw new Error(
          `Failed to post preferences: HTTP status ${prefResponse.status}`
        );
      }
      const personalityData = await prefResponse.json();
    },); 
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={onboardingStyles.container}
    >
      <TouchableOpacity
        style={onboardingStyles.backButton}
        onPress={handleBack}
      >
        <Text style={onboardingStyles.buttonText}>Back</Text>
      </TouchableOpacity>

      <View style={onboardingStyles.mainContent}>
        <Text style={onboardingStyles.title}>Where Do you live?</Text>
        <Text style={styles.body}>WYA HOMIE</Text>
        <TextInput
          style={styles.input}
          placeholder="location"
          placeholderTextColor="#ccc"
          value={location}
          onChangeText={setLocation}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={onboardingStyles.nextButton}
        >
          <Text style={onboardingStyles.nextButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  crowdMainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    color: "white",
    fontSize: 36,
    fontFamily: "DT Nightingale",
    fontWeight: "300",
    lineHeight: 39.6,
    textAlign: "center",
    marginBottom: 40,
  },
  body: {
    width: "100%",
    color: "white",
    fontSize: 24,
    fontFamily: "DT Nightingale",
    fontWeight: "300",
    lineHeight: 26.4,
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: "Archivo",
    color: "black",
  },
});

export default UserFormP4;
