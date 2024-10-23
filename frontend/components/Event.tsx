import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const Event = ({title = "", date = "", time = "", image_path = ""}) => {
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
    alignItems: 'center'
  },
  eventImage: {
    width: 200, 
    height: 150,
    borderRadius: 10
  },
  overlay: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 10
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
    paddingBottom: 4,
    paddingTop: 4
  },
});

export default Event;