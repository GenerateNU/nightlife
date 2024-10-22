import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { styles } from './styles';

export type RootStackParamList = {
    AddPhoto: undefined; 
    BottomNavigator: undefined;
}

const AddPhoto: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSkip = () => {
        // Navigate to the main app (BottomNavigator) after onboarding
        navigation.reset({
            index: 0,
            routes: [{ name: 'BottomNavigator' }],
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.addPhotoTitle}>Now, add a photo</Text>
            <View style={styles.addPhotoIconContainer}>
                <Icon name="camera-outline" size={40} color="#D9D9D9" />
            </View>
            <View style={styles.addPhotoPlaceholder}>
                <Text style={styles.addPhotoText}>Firstname Lastname</Text>
            </View>
            <View style={styles.addPhotoButtonContainer}>
                <TouchableOpacity style={styles.addPhotoButton}>
                    <Text style={styles.addPhotoButtonText}>ADD PHOTO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                    <Text style={styles.buttonText}>SKIP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddPhoto;
