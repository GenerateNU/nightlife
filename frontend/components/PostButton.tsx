import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const PostButton = () => {
  return (
    <View style={styles.container}>
      <Button title="Post" color="#007AFF" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default PostButton;
