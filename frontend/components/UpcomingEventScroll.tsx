import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import Event from './Event';

const UpcomingEventScroll = ({events = []}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {events.map((event, index) => (
            <View key={index} style={styles.item}>
              <Event event={event} />
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
    marginHorizontal: 30
  },
});

export default UpcomingEventScroll;
