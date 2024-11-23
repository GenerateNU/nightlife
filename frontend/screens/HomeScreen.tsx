import React from "react";
import {View, StyleSheet } from "react-native";
import { StackNavigationProp  } from '@react-navigation/stack';
import SearchBar from "@/components/Map/SearchBar";

type RootStackParamList = {
    Home: undefined;
};

type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
    return (
        <View style={styles.container}>
            <SearchBar placeholderText="Search venues..." />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1c1c1c"
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