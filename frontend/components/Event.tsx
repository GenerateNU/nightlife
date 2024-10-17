import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// TODO: set up skeleton for page
const Event = ({title = "", date = "", time = ""}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.eventImage}
        source={{ uri: 'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg' }} 
      />
      <View style={styles.overlay}>
        <Text style={styles.eventText}>Event Title</Text>
        <Text style={styles.dateText}>Date: October 16, 2024</Text>
        <Text style={styles.timeText}>Time: 5:00 PM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: 200, 
    height: 200,
  },
  overlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  dateText: {
    color: 'white',
    fontSize: 10,
    paddingLeft: 4,
    paddingBottom: 4
  },
  timeText: {
    color: 'white',
    fontSize: 10,
    paddingLeft: 4,
    paddingBottom: 4
  },
  eventText: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 4,
    paddingBottom: 4
  },
});

export default Event;