import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProgressBar from './ProgressBar';
import onboardingStyles from './onboardingStyles';
import { useFormData } from './FormDataContext';

const crowdOptions = [
  "More Exclusive (Guest-List only)",
  "Mixed ages",
  "Casual & laid-back",
  "Young professionals",
  "Other"
];

export type RootStackParamList = {
  CrowdPreference: undefined;
  InsideOutside: undefined;
}

const CrowdPreference: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCrowds, setSelectedCrowds] = useState<string[]>([]);
  const [progress, setProgress] = useState(0.3);
  const {formData, updateFormData } = useFormData();

  const selectCrowd = (option: string) => {
    setSelectedCrowds((prevSelectedCrowds) => {
      if (prevSelectedCrowds.includes(option)) {
        return prevSelectedCrowds.filter((item) => item !== option);
      } else {
        return [...prevSelectedCrowds, option];
      }
    });
  };

  const handleSkip = () => {
    updateFormData({ crowdPreference: selectedCrowds });
    console.log("Selected crowd preference:", formData.crowdPreference);
    navigation.navigate('InsideOutside');
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
      <Text style={onboardingStyles.topTitle}>ABOUT ME</Text>
      <TouchableOpacity onPress={handleBack} style={onboardingStyles.backButton}>
        <Text style={onboardingStyles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={onboardingStyles.mainContent}>
        <ProgressBar progress={progress} />
        <Text style={onboardingStyles.title}>When I&apos;m out, I want{"\n"}to be surrounded by...</Text>
        <Text style={styles.textStyle}>Select all that apply</Text>
        <View style={styles.optionsContainer}>
          {/* First option: "More Exclusive" */}
          <TouchableOpacity
            key="More Exclusive (Guest-List only)"
            style={[
              styles.optionBox,
              selectedCrowds.includes("More Exclusive (Guest-List only)") 
                ? onboardingStyles.selectedOption 
                : onboardingStyles.unselectedOption,
              { width: '100%' }, // Make this one occupy full width
            ]}
            onPress={() => selectCrowd("More Exclusive (Guest-List only)")}
          >
            <Text style={onboardingStyles.optionText}>More Exclusive (Guest-List only)</Text>
          </TouchableOpacity>

          <View style={styles.gridContainer}>
            {crowdOptions
              .filter(option => option !== "More Exclusive (Guest-List only)") // Exclude the first option
              .map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionBox,
                    selectedCrowds.includes(option) 
                      ? onboardingStyles.selectedOption 
                      : onboardingStyles.unselectedOption,
                  ]}
                  onPress={() => selectCrowd(option)}
                >
                  <Text style={onboardingStyles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <TouchableOpacity style={onboardingStyles.nextButton} onPress={handleSkip}>
          <Text style={onboardingStyles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
  optionsContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    width: '100%',
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
});

export default CrowdPreference;
