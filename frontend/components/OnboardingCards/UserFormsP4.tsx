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
import ProgressBar from "./ProgressBar";


export type RootStackParamList = {
  UserFormP4: undefined;
  Notifications: undefined;
};

type NavigationType = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

const UserFormP4: React.FC = () => {
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationType>();
  const [progress, setProgress] = useState(0.75);

  const [location, setLocation] = useState<string>(formData.location || "");

  const handleSubmit = async () => {
    // Update formData first
    updateFormData({ location });

    // After a delay to ensure formData is updated, proceed with submission
    setTimeout(async () => {
      let dataUserId = null;
      try {
      const email = formData.email;

        const response = await fetch(
          `${API_DOMAIN}/profiles/${email}`,
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
        user_id: dataUserId.user_id,
        nightlife: formData.nightlife,
        interests: formData.interests,
        crowd_preference: formData.crowdPreference,
        time_preference: formData.timePreference,
        location: 'Boston',
        frequency: formData.frequency,
        insideoroutside: formData.insideOrOutside,
      };

      console.log("Submitting FormData:", payload);

      // try {
      //   const response = await fetch(`${API_DOMAIN}/profiles/preferences`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${BEARER}`,
      //     },
      //     body: JSON.stringify(payload),
      //   });

      //   const data = await response.json();
      //   if (data.error) {
      //     console.error("Submission Error:", data.error);
      //   } else {
      //     console.log("Submission Success:", data);
      //     navigation.navigate("Notifications");
      //   }
      // } catch (error) {
      //   console.error("Network or server error:", error);
      // }
      console.log("payload for userCharacter: ", payload);
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
      console.log("personalityData: ", personalityData);
    },); 
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
        source={{ uri: 'https://i.imghippo.com/files/sol3971PuQ.png' }}
        style={onboardingStyles.container}
    >
        <Text style={onboardingStyles.topTitle}>NIGHTLIFE</Text>

        <TouchableOpacity style={onboardingStyles.backButton} onPress={handleBack}>
            <Text style={onboardingStyles.buttonText}>Back</Text>
        </TouchableOpacity>

        <View style={onboardingStyles.mainContent}>
            <ProgressBar progress={progress} />

            <Text style={onboardingStyles.title}>
                I live in...
            </Text>

            <TextInput
                style={styles.input}
                value={location}
                onChangeText={(text) => setLocation(text)}
                placeholder='Search'      
            />

            <TouchableOpacity onPress={handleSubmit} style={onboardingStyles.nextButton}>
                <Text style={onboardingStyles.nextButtonText}> Next </Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
);
};

const styles = StyleSheet.create({
input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginVertical: 20,
},
});


export default UserFormP4;
