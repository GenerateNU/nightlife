import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProgressBar from './ProgressBar';
import onboardingStyles from './onboardingStyles';
import { useFormData } from './FormDataContext';

export type RootStackParamList = {
  NightlifePreference: undefined;
  RankingNightLifeImportance: undefined;
};

const options = [
  "Nightclubs",
  "Concerts & Live Music",
  "VIP & Exclusive Events",
  "Other"
];

const NightlifePreference = () => {
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedOption, setSelectedOption] = useState<string | "">("");
  const [progress, setProgress] = useState(0.1);

  const toggleSelection = (option: string) => {
    setSelectedOption((prev) => (prev === option ? "" : option));
  };

  const handleNext = () => {
    updateFormData({ nightlife: selectedOption });
    console.log("Selected nightlife preference:", formData.nightlife);
    navigation.navigate('RankingNightLifeImportance');
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
          It’s Friday night!{"\n"}Where are we going?
        </Text>
        <View>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                onboardingStyles.optionBox,
                selectedOption === option
                  ? onboardingStyles.selectedOption
                  : onboardingStyles.unselectedOption,
              ]}
              onPress={() => toggleSelection(option)}
            >
              <Text style={onboardingStyles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handleNext} style={onboardingStyles.nextButton}>
          <Text style={onboardingStyles.nextButtonText}> Next </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default NightlifePreference;
