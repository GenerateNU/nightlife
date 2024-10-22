import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native'; 

export type RootStackParamList = {
  SplashScreen: undefined; 
  NightlifePreference: undefined; 
};

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('NightlifePreference');  
    }, 1000); 

    return () => clearTimeout(timeout);  
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashWelcomeText}>welcome to nightlife</Text>
    </View>
  );
};

export default SplashScreen;
