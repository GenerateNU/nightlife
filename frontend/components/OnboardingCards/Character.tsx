import { ImageBackground, TouchableOpacity, Text } from "react-native";
import onboardingStyles from "./onboardingStyles";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export type RootStackParamList = {
    Character: undefined;
    BottomNavigator: undefined;
  };

const Character = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handleNext = () => {
        navigation.navigate('BottomNavigator');
      };

    return (
        <ImageBackground
            source={{ uri: 'https://i.imghippo.com/files/sol3971PuQ.png' }}
            style={onboardingStyles.container}
        >

            <TouchableOpacity onPress={handleNext} style={onboardingStyles.nextButton}>
                <Text style={onboardingStyles.nextButtonText}> Go to Nightlife </Text>
            </TouchableOpacity>
            
        </ImageBackground>
    );
};

export default Character;