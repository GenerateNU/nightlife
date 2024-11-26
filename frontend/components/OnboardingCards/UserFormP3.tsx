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

export type RootStackParamList = {
  UserFormP3: undefined;
  NightlifePreference: undefined;
};

type NavigationType = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

const UserFormP3: React.FC = () => {
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationType>();

  const [bio, setBio] = useState<string>(formData.bio || "");

  const handleSubmit = () => {
    updateFormData({ bio });
    console.log("Submitted Info:", { bio });
    navigation.navigate("NightlifePreference");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={onboardingStyles.container}
    >
       <TouchableOpacity style={onboardingStyles.backButton} onPress={handleBack}>
        <Text style={onboardingStyles.buttonText}>Back</Text>
      </TouchableOpacity>
      
      <View style={onboardingStyles.mainContent}>
        <Text style={[onboardingStyles.title, { marginTop: 40 }]}>Describe yourself</Text>
        <Text style={styles.body}>
          Tell people about you and your{"\n"}nightlife interests and{"\n"}experiences
        </Text>
        <TextInput
          style={styles.input}
          placeholder="bio"
          placeholderTextColor="#ccc"
          value={bio}
          onChangeText={setBio}
        />
        
        <TouchableOpacity onPress={handleSubmit} style={onboardingStyles.nextButton}>
          <Text style={onboardingStyles.nextButtonText}> Next </Text>
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
    textAlign: "left",
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
    width: "100%",
  },
});

export default UserFormP3;
