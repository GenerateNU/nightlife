import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VenueHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.venueName}>Venue Name</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>4.7</Text>
        <Text>⭐⭐⭐⭐⭐ (14)</Text>
      </View>
      <Text>Venue Type</Text>
      <Text>Hours of Operation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  venueName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 20,
    marginRight: 5,
  },
});

export default VenueHeader;
