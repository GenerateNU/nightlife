import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const UserReview = () => {
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        <Text>⭐⭐⭐⭐⭐</Text>
      </View>
      <TextInput
        style={styles.textArea}
        placeholder="Write your review"
        value={review}
        onChangeText={setReview}
      />
      <View style={styles.recommendContainer}>
        <BouncyCheckbox onPress={(isChecked: boolean) => {console.log(isChecked)}}/>
        <Text>I recommend this venue</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  recommendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UserReview;
