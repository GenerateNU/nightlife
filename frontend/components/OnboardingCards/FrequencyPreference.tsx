import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProgressBar from './ProgressBar';
import onboardingStyles from './onboardingStyles';
import { useFormData } from './FormDataContext';

const frequencyOptions = [
  "Every day!",
  "Few times a week",
  "Once a week",
  "Few times a month",
  "Only for special events"
];

export type RootStackParamList = {
  FrequencyPreference: undefined;
  TimePreference: undefined;
}

const FrequencyPreference: React.FC = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<string | ''>('');
  const [progress, setProgress] = useState(0.5);
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectFrequency = (option: string) => {
    setSelectedFrequency(option);
  };

  const handleSkip = () => {
    updateFormData({ frequency: selectedFrequency });
    console.log('Selected frequency:', formData);
    navigation.navigate('TimePreference');
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
      <TouchableOpacity onPress={handleBack} style={onboardingStyles.backButton}>
        <Text style={onboardingStyles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={onboardingStyles.mainContent}>
        <ProgressBar progress={progress} />
        <Text style={onboardingStyles.title}>Weekend or not, I’m{"\n"}out...</Text>
        <View>
          {frequencyOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                onboardingStyles.optionBox,
                selectedFrequency === option
                  ? onboardingStyles.selectedOption
                  : onboardingStyles.unselectedOption,
              ]}
              onPress={() => selectFrequency(option)}
            >
              <Text style={onboardingStyles.optionText}>{option}</Text>
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

export default FrequencyPreference;
