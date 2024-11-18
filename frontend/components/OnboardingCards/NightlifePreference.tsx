import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ImageBackground } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  NightlifePreference: undefined;
  CrowdPreference: undefined;
};

const options = [
  "Nightclubs",
  "Concerts & Live Music",
  "VIP & Exclusive Events",
  "Other"
];

const NightlifePreference = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleSelection = (option: string) => {
    setSelectedOption((prev) => (prev === option ? null : option));
  };

  const handleNext = () => {
    navigation.navigate('CrowdPreference');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imghippo.com/files/sol3971PuQ.png' }}  
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.nightlifeMainContent}>
        <Text style={styles.nightlifeTitle}>
          It’s Friday night! Where are we going?
        </Text>
        <View style={styles.optionGrid}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionBox,
                selectedOption === option ? styles.selectedOption : null
              ]}
              onPress={() => toggleSelection(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>&gt;</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F244F',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  nightlifeMainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nightlifeTitle: {
    width: '100%',
    color: 'white',
    fontSize: 36,
    fontFamily: 'DT Nightingale',
    fontWeight: '300',
    lineHeight: 39.6,
    textAlign: 'center',
    marginBottom: 40,
  },
  optionGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionBox: {
    width: '48%',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  selectedOption: {
    borderColor: '#2F244F',
    borderWidth: 2,
  },
  optionText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Archivo',
    fontWeight: '200',
    textAlign: 'center',
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
});

export default NightlifePreference;
