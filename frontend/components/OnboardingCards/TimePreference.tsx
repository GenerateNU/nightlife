import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProgressBar from './ProgressBar';
import onboardingStyles from './onboardingStyles';
import { useFormData } from './FormDataContext';

export type RootStackParamList = {
  TimePreference: undefined;
  WhoAreYouWith: undefined;
};

const options = [
  "Before 9pm",
  "9-11pm",
  "After 11pm",
];

const TimePreference = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { formData, updateFormData } = useFormData();
  const [selectedOption, setSelectedOption] = useState<string | ''>('');
  const [progress, setProgress] = useState(0.6);

  const toggleSelection = (option: string) => {
    setSelectedOption((prev) => (prev === option ? '' : option));
  };

  const handleNext = () => {
    updateFormData({ timePreference: selectedOption });
    console.log('Selected time preference:', formData);
    navigation.navigate('WhoAreYouWith');
  };

  const handleBack = () => {
    navigation.goBack();
    setProgress(progress);
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
          My night starts...
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

export default TimePreference;
