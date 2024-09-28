import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const AddMedia = () => {
  return (
    <View style={styles.container}>
      <Button title="Add photos & videos" color="#007AFF" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default AddMedia;
