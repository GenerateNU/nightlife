import React, { useState } from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import ProgressBar from './ProgressBar'; 

export type RootStackParamList = {
  HowFarFromYou: undefined; 
  MusicPreference: undefined; 
};

const options = [
    "5 miles",
    "10 miles",
    "15 miles",
    "20 miles",
    " AFRICA "
];

const HowFarFromYou: React.FC = () => {
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
    navigation.navigate('MusicPreference'); 
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
        <Text style={styles.nightlifeTitle}>How far do you prefer the venue to be?</Text>
        
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={toggleOptions} style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>Select Distance</Text>
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

export default HowFarFromYou;
