import React from "react";
import {View, StyleSheet } from "react-native";
import SearchBar from "@/components/Map/SearchBar";
import EventsScrollable from "./explore/EventsScrollable";

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <SearchBar placeholderText="Search venues..." />
            <EventsScrollable />
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