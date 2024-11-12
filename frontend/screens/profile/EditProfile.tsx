import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EditProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text} onPress={() => navigation.navigate('EditProfileData')}>
          Edit Profile Data
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#1c1c1c"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "white",
    fontFamily: 'Archivo_700Bold'
  },
  button: {
    padding: 16,
    backgroundColor: "#007bff",
    borderRadius: 6,
    marginVertical: 4
  },
  text: {
    fontFamily: "Archivo_500Medium",
    color: "white"
  }
});

export default EditProfile;
