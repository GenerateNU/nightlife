import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import onboardingStyles from './onboardingStyles';
import ProgressBar from './ProgressBar';

const timeOptions = [
  "Before 9pm",
  "9-11pm",
  "After 11pm"
];

export type RootStackParamList = {
  TimePreference: undefined;
  WhoAreYouWith: undefined;
}

const TimePreference: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [progress, setProgress] = useState(0.6);

  const selectTime = (option: string) => {
    setSelectedTime(option);
  };

  const handleNext = () => {
    navigation.navigate('WhoAreYouWith');
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
        <Text style={onboardingStyles.title}>My night starts...</Text>
        <View>
          {timeOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={onboardingStyles.optionBox}
              onPress={() => selectTime(option)}
            >
              <Text style={onboardingStyles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={onboardingStyles.nextButton} onPress={handleNext}>
          <Text style={onboardingStyles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default TimePreference;
