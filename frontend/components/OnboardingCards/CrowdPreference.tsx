import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const crowdOptions = [
  "More Exclusive (Guest-List only)",
  "Mixed ages",
  "Casual & laid-back",
  "Young profressionals",
  "Other"
];

export type RootStackParamList = {
  CrowdPreference: undefined;
  FrequencyPreference: undefined;
}

const CrowdPreference: React.FC = () => {

  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectCrowd = (option: string) => {
    setSelectedCrowd(option);
  };

  const handleSkip = () => {
    navigation.navigate('FrequencyPreference');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imghippo.com/files/sol3971PuQ.png' }}
      style={styles.container}
    >
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.crowdMainContent}>
        <Text style={styles.title}>When I'm out, I want to be surrounded by:</Text>

        <View style={styles.optionGrid}>
          {crowdOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionBox}
              onPress={() => selectCrowd(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleSkip}>
          <Text style={styles.nextButtonText}>&gt;</Text>
        </TouchableOpacity>
      </View>

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
    color: 'white',
    fontSize: 16,
  },
  title: {
    width: '100%',
    color: 'white',
    fontSize: 36,
    fontFamily: 'DT Nightingale',
    fontWeight: '300',
    lineHeight: 39.6,
    textAlign: 'center',
    marginBottom: 40,
  },
  crowdMainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 40,
  },
  optionBox: {
    width: '48%',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Archivo',
    fontWeight: '200',
    lineHeight: 20,
    textAlign: 'center',
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 24,
    color: 'black',
  },
});

export default CrowdPreference;
