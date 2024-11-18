import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet, Text } from "react-native";

export type RootStackParamList = {
    Name: undefined; 
    NightlifePreference: undefined;
};

const Name = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleNext = () => {
        navigation.navigate('NightlifePreference'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBar} />
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.heading}>My name is...</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="First Name"
                        placeholderTextColor="#9EA3A2"
                    />
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Last Name"
                        placeholderTextColor="#9EA3A2"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>&gt;</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a1a",
        justifyContent: "space-between",
    },
    progressBarContainer: {
        width: "100%",
        height: 10,
        backgroundColor: "white",
    },
    progressBar: {
        width: "30%",  
        height: "100%",
        backgroundColor: "#FFB4FE",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        color: "white",
        fontSize: 36,
        fontFamily: "DT Nightingale",
        fontWeight: "300",
        lineHeight: 36,
        marginBottom: 20,
    },
    inputContainer: {
        width: "80%",
        gap: 12,
    },
    input: {
        backgroundColor: "white",
        borderRadius: 4,
        borderColor: "#D7DEDD",
        borderWidth: 1,
        padding: 8,
        height: 40,
        fontSize: 15,
        fontFamily: "DM Sans",
        fontWeight: "400",
        color: "#9EA3A2",
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

export default Name;
