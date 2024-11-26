import React from 'react';
import { Text, ImageBackground, TouchableOpacity, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import onboardingStyles from './onboardingStyles';

export type RootStackParamList = {
  LoginOrSignUp: undefined;
  Home: undefined;
  UserFormP1: undefined;
};

const LoginOrSignup: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  const handleSignUp = () => {
    navigation.navigate('UserFormP1');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imghippo.com/files/sol3971PuQ.png' }}
      style={onboardingStyles.container}
    >
      <Text style={styles.title}>
        READY{"\n"}TO FIND{"\n"}YOUR{"\n"}NEW FAV{"\n"}SPOT?
      </Text>

      <View style={styles.divider} />

      <View style={styles.buttonContainerWrapper}>
        <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
          <Text style={styles.buttonText}> Log in </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp} style={styles.buttonContainer}>
          <Text style={styles.buttonText}> Create account </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 64,
    fontFamily: 'Archivo',
    fontWeight: '700',
    marginTop: 120,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Archivo',
    fontWeight: '400',
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    width: '45%',
    marginTop: 10,
  },
  buttonContainerWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: 20,
  },
});

export default LoginOrSignup;
