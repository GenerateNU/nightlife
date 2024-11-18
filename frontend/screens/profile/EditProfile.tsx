/* eslint-disable */
// EditProfile.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EditProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <Button title="Edit Profile Data" onPress={() => navigation.navigate('EditProfileData')} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EditProfile;
