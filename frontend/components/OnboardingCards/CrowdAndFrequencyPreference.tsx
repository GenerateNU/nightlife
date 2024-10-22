import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 

const crowdOptions = [
  "Young professionals",
  "College students",
  "Mature crowd",
  "Mixed age groups",
  "Trendy/Social influencers",
  "Relaxed/Casual",
  "Energetic/Partygoers",
  "Exclusive/VIP"
];

const frequencyOptions = [
  "Every night",
  "A few times a week",
  "Once a week",
  "A couple of times a month",
  "Once a month",
  "Rarely (special occasions)",
  "Almost never"
];

export type RootStackParamList = {
  CrowdAndFrequencyPreference: undefined; 
  AddPhoto: undefined;
}

const CrowdAndFrequencyPreference: React.FC = () => {
  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [isCrowdOpen, setIsCrowdOpen] = useState(false);
  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);

  // Get navigation object
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toggleCrowdOptions = () => setIsCrowdOpen(prev => !prev);
  const toggleFrequencyOptions = () => setIsFrequencyOpen(prev => !prev);

  const selectCrowd = (option: string) => {
    setSelectedCrowd(option);
    setIsCrowdOpen(false);
  };

  const selectFrequency = (option: string) => {
    setSelectedFrequency(option);
    setIsFrequencyOpen(false);
  };

  const handleSkip = () => {
    navigation.navigate('AddPhoto');
  };

  const handleBack = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.crowdTitle}>What type of crowd do you prefer?</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleCrowdOptions}>
        <Text style={styles.dropdownText}>{selectedCrowd || "Select Crowd Type"}</Text>
        <Text style={styles.arrow}>{isCrowdOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isCrowdOpen && (
        <FlatList
          data={crowdOptions}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.optionItem} onPress={() => selectCrowd(item)}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={[styles.dropdown, { maxHeight: crowdOptions.length * 50 }]} 
        />
      )}

      <Text style={styles.crowdTitle}>How often do you go out?</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleFrequencyOptions}>
        <Text style={styles.dropdownText}>{selectedFrequency || "Select Frequency"}</Text>
        <Text style={styles.arrow}>{isFrequencyOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isFrequencyOpen && (
        <FlatList
          data={frequencyOptions}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.optionItem} onPress={() => selectFrequency(item)}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={[styles.dropdown , { maxHeight: frequencyOptions.length * 50 , flexGrow: 0}]}
        />
      )}

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.buttonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CrowdAndFrequencyPreference;
