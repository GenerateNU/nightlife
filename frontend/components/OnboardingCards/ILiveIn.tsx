import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, TextInput, StyleSheet, } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProgressBar from './ProgressBar';
import onboardingStyles from './onboardingStyles';

export type RootStackParamList = {
    ILiveIn: undefined;
    Notifications: undefined;
};

const ILiveIn = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [location, setLocation] = useState('');
    const [progress, setProgress] = useState(0.8);

    const handleNext = () => {
        navigation.navigate('Notifications');
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

            <TouchableOpacity style={onboardingStyles.backButton} onPress={handleBack}>
                <Text style={onboardingStyles.buttonText}>Back</Text>
            </TouchableOpacity>

            <View style={onboardingStyles.mainContent}>
                <ProgressBar progress={progress} />

                <Text style={onboardingStyles.title}>
                    I live in...
                </Text>

                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    placeholder='Search'      
                />

                <TouchableOpacity onPress={handleNext} style={onboardingStyles.nextButton}>
                    <Text style={onboardingStyles.nextButtonText}> Next </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        marginVertical: 20,
    },
});

export default ILiveIn;
