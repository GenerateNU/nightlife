import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const UserReview = () => {
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        <Text style={styles.starText}>⭐️⭐️⭐️⭐️⭐️</Text>
      </View>
      <TextInput
        style={styles.textArea}
        placeholder="Write your review"
        placeholderTextColor="#888"
        value={review}
        onChangeText={setReview}
        multiline
      />
      <View style={styles.recommendContainer}>
        <BouncyCheckbox onPress={(isChecked: boolean) => {console.log(isChecked)}}/>
        <Text style={styles.recommendText}>I recommend this venue</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#1c1c1e',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starText: {
    color: '#ffffff',  // Updated to white
  },
  textArea: {
    height: 100,
    borderColor: '#888',
    borderWidth: 1,
    color: '#ffffff',  // Updated to white
    padding: 10,
    marginVertical: 10,
  },
  recommendContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // Align items to the center vertically
  },
  recommendText: {
    color: '#ffffff',  // Updated to white
    marginLeft: 10,    // Add some space between the checkbox and the text
  },
});

export default UserReview;
