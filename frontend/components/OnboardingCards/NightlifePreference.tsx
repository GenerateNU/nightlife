import React, { useState } from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';  

export type RootStackParamList = {
  NightlifePreference: undefined; 
  CrowdAndFrequencyPreference: undefined; 
};

const options = [
  "Bars",
  "Clubs",
  "Lounges",
  "Pubs",
  "Karaoke Bars",
  "Cocktail Bars",
  "Wine Bars",
  "Speakeasies",
  "Sports Bars",
  "Rooftop Bars",
  "Nightclubs",
  "Dance Clubs",
  "Comedy Clubs",
  "Jazz Clubs",
  "Live Music Venues",
  "Hookah Lounges",
  "Dive Bars"
];

const NightlifePreference: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); 
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(prev => !prev);
  };

  const toggleSelection = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const handleSkip = () => {
    navigation.navigate('CrowdAndFrequencyPreference'); 
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.nightlifeMainContent}>
        <Text style={styles.nightlifeTitle}>What type of nightlife do you enjoy the most?</Text>
        
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={toggleOptions} style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>Select Venue Type</Text>
            <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {isOpen && (
            <View style={[styles.dropdown, { maxHeight: 200 }]}>
              <FlatList
                data={options}
                renderItem={({ item }) => (
                  <Option 
                    text={item} 
                    isSelected={selectedOptions.includes(item)} 
                    onPress={() => toggleSelection(item)} 
                  />
                )}
                keyExtractor={(item) => item}
                style={{ flexGrow: 0 }} 
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.buttonText}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Option: React.FC<{ text: string; isSelected: boolean; onPress: () => void }> = ({ text, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.optionItem, isSelected ? styles.nightlifeSelected : styles.optionItem]} 
      onPress={onPress} 
    >
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NightlifePreference;
