import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Event from './Event';
import PropTypes from 'prop-types';


const screenWidth = Dimensions.get('window').width;

/**
 * Displays a scrollable list of events
 */

const UpcomingEventScroll = ({ events = [] }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.scrollContainer, { width: screenWidth }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
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

UpcomingEventScroll.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    height: 148,
    paddingLeft: 5
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 10, 
    paddingVertical: 10,
    borderRadius:10
  },
  item: {
    width: 148,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginRight: 25,
    borderRadius: 10,

  },
});

export default UpcomingEventScroll;
