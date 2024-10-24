import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import Event from './Event';

// Upcoming Event Scroll Bar -> Takes in a list of dictionaries 
// example dictionary: {"title": "Disco Night", "date": "October 5, 2024", "time": "9pm", "image_path": "/image/this_image.jpg"}

const UpcomingEventScroll = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <View key={index} style={styles.item}>
              <Event/>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContainer: {
    width: 360,
    height: 180
  },
  scrollView: {
    paddingVertical: 20,
    paddingRight: 10
  },
  item: {
    width: 150, 
    height: 150, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 30, 
    borderRadius: 100
  },
});

export default UpcomingEventScroll;
