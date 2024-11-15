import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

const Event = ({event = {create_at: "", event_date: "", event_id: 0, event_time: "", image_path: "", name: "", venue_id: ""}}) => {
  const date = parseISO(event.event_date)
  const displayDate = format(date, "MMMM do, yyyy");
  const displayTime = format(date, 'h:mm a');

  return (
    <View style={styles.container}>
      <Image
        style={styles.eventImage}
        source={{ uri: event.image_path }} 
      />
      <View style={styles.overlay}>
        <Text style={styles.eventText}>{event.name}</Text>
        <Text style={styles.dateText}>{displayDate}</Text>
        <Text style={styles.timeText}>{displayTime}</Text>
      </View>
    </View>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired, 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventImage: {
    width: 200, 
    height: 150
  },
  overlay: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
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