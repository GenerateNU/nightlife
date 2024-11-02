import {Button, StyleSheet, View} from "react-native";
import LoginForm from "@/components/LoginForm";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {Text} from "react-native";
import {Image} from "react-native";

import { Archivo_400Regular, Archivo_500Medium, Archivo_700Bold, useFonts } from "@expo-google-fonts/archivo";

const LoginScreen = () => {

    const [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_500Medium,
        Archivo_700Bold,
      });

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Discover where <Text style={styles.accentHeaderText}>the night</Text> takes you.
            </Text>
            <LoginForm />
            <View style={styles.guycontainer}>
            <Image
                    source={require('../assets/pinkguy.png')}
                    style={styles.pinkguy}
                />
                
            <Image
                    source={require('../assets/yellowguy.png')}
                    style={styles.yellowguy}
                />
                
                <Image
                    source={require('../assets/orangeguy.png')}
                    style={styles.orangeguy}
                />
            </View>
            <View style={{ marginBottom: 40 }} >
                <Text style={styles.landingText}>Don't have an account just yet?</Text>
                <Button title="Sign Up" onPress={() => {}} />
            </View>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({

    guycontainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: 200, 
      },
      lukeorangeguy: {
        position: 'relative',
        bottom: 30,
      },
      pinkguy: {
        position: 'relative',
      },
    orangeguy: {
        position: 'relative',
        bottom: 60,
      },
      yellowguy: {
        position: 'relative',
        bottom: 120,
      },
    landingText: {
        color: 'white',
        fontFamily: 'Archivo_400Regular',
    },

    accentHeaderText: {
        color: '#007bff',
    },
    headerText: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 28,
        color: 'white',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen;