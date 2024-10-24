import {StyleSheet, View} from "react-native";
import LoginForm from "@/components/LoginForm";
import {StatusBar} from "expo-status-bar";
import React from "react";

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <LoginForm />
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen;