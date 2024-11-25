import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormData } from "./FormDataContext";
import onboardingStyles from "./onboardingStyles";
import ProgressBar from "./ProgressBar";

const timeOptions = ["Outdoors", "Indoors", "I like both"];

export type RootStackParamList = {
  InsideOutside: undefined;
  UserFormP3: undefined;
};

type NavigationType = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

const InsideOutside: React.FC = () => {
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationType>();
  const [selectedTime, setSelectedTime] = useState<string | null>(
    formData.insideOrOutside || null
  );
  const [progress, setProgress] = useState(0.4);

  const selectTime = (option: string) => {
    setSelectedTime((prev) => (prev === option ? null : option));
    updateFormData({ insideOrOutside: option });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    console.log("Selected time:", selectedTime);
    navigation.navigate("UserFormP3");
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={styles.container}
    >
      <Text style={onboardingStyles.topTitle}>NIGHTLIFE</Text>

      <TouchableOpacity style={onboardingStyles.backButton} onPress={handleBack}>
        <Text style={onboardingStyles.buttonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={onboardingStyles.mainContent}>
          <ProgressBar progress={progress} />
          <Text style={styles.title}>
            Do you like dancing{'\n'}under the stars{'\n'}or keeping the party{'\n'}indoors?
          </Text>
          <View>
            {timeOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  selectedTime === option
                    ? onboardingStyles.selectedOption
                    : onboardingStyles.unselectedOption,
                ]}
                onPress={() => selectTime(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={handleNext} style={onboardingStyles.nextButton}>
              <Text style={onboardingStyles.nextButtonText}> Next </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
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
  timeMainContent: {
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
    width: "48%",
    height: 120,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionBoxSelected: {
    backgroundColor: "#aaa", // a darker shade to indicate selection
  },
  optionText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Archivo",
    fontWeight: "200",
    lineHeight: 20,
    textAlign: "center",
  },
});

export default InsideOutside;
