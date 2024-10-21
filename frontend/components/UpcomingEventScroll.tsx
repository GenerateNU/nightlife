import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import Event from './Event';

// Upcoming Event Scroll Bar -> Takes in a list of dictionaries 
// example dictionary: {"title": "Disco Night", "date": "October 5, 2024", "time": "9pm", "image_path": "/image/this_image.jpg"}

const UpcomingEventScroll = ({ UpcomingEventDict = [] }) => {
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
              <Event title="" date="" time="" image_path="" />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: 450,
    height: 200, 
  },
  scrollView: {
    paddingVertical: 20,
    paddingRight: 10, 
  },
  item: {
    width: 200, 
    height: 200, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5, 
    borderRadius: 10
  },
});

export default UpcomingEventScroll;
