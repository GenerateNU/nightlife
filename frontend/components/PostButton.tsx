import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const PostButton = () => {
  return (
    <View style={styles.container}>
      <Button title="Post" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default PostButton;
