import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VenueHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.venueName}>Venue Name</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>4.7</Text>
        <Text style={styles.ratingText}>⭐⭐⭐⭐⭐ (14)</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.venueType}>Venue Type</Text>
        <Text style={styles.hours}>Hours of Operation</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#1c1c1e',
  },
  venueName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    fontSize: 18,
    color: '#ffffff',  
    marginRight: 5,
  },
  ratingText: {
    color: '#ffffff', 
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  venueType: {
    color: '#ffffff',  
  },
  hours: {
    color: '#ffffff',
  },
});

export default VenueHeader;