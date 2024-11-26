import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormData } from "./FormDataContext";
import ProgressBar from './ProgressBar';
import onboardingStyles from './onboardingStyles';

const whoAreYouWithOptions = [
  "Close friends",
  "Coworkers",
  "Nobody #solo",
  "Family",
  "Partner",
  "New pals",
  "Other",
];

export type RootStackParamList = {
  UserFormP1: undefined;
  BottomNavigator: undefined;
};

type NavigationType = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

const WhoAreYouWith: React.FC = () => {
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationType>();
  const [selectedCrowd, setSelectedCrowd] = useState<string[]>(
    formData.interests || []
  );
  const [progress, setProgress] = useState(0.7);

  const selectCrowd = (option: string) => {
    setSelectedCrowd((prevSelected) => {
      const updatedCrowd = prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option];
      updateFormData({ interests: updatedCrowd });
      return updatedCrowd;
    });
  };

  useEffect(() => {
    console.log("Selected crowd:", selectedCrowd);
  }, [selectedCrowd]);

  const handleSkip = () => {
    navigation.navigate("BottomNavigator");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={onboardingStyles.container}
    >
      <Text style={onboardingStyles.topTitle}>NIGHTLIFE</Text>

      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={onboardingStyles.mainContent}>
      <ProgressBar progress={progress} />
          <Text style={onboardingStyles.title}>Every time you see me{"\n"}out, I'm with...</Text>
          <Text style={styles.textStyle}>Select all that apply</Text>
          <View style={styles.optionGrid}>
            {whoAreYouWithOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionBox,
                  selectedCrowd.includes(option) ? onboardingStyles.selectedOption : {},
                ]}
                onPress={() => selectCrowd(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={onboardingStyles.nextButton} onPress={handleSkip}>
            <Text style={onboardingStyles.nextButtonText}>Next</Text>
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
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
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
  crowdMainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 40,
  },
  optionBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
    marginBottom: 12,
    marginTop: 20,
  },
  selectedOption: {
    backgroundColor: "#ddd", // Added style for selected option
  },
  optionText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Archivo",
    fontWeight: "200",
    lineHeight: 20,
    textAlign: "center",
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 24,
    color: "black",
  },
  textStyle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'DT Nightingale',
    fontWeight: '300',
    lineHeight: 28.8,
    textAlign: 'left',
    flexWrap: 'wrap',
    width: '100%',
  },
});

export default WhoAreYouWith;
