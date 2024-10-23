import React from "react";
import {Text, View, TouchableOpacity, StyleSheet } from "react-native";
import {Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp  } from '@react-navigation/stack';
import VenueScreen from "./VenueScreen";

type HomeScreenProps = {
    navigation: StackNavigationProp<any, any>; // Adjust as necessary based on your stack
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Venue')}
            >
                <Text style={styles.buttonText}>Go to Venue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
export default HomeScreen;