import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

const Event = ({ event = { create_at: "", event_date: "", event_id: 0, event_time: "", image_path: "", name: "", venue_id: "" } }) => {
  const date = parseISO(event.event_date);
  const displayDate = format(date, "MMMM do");
  const displayTime = format(date, 'h:mm a');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.eventImage}
          source={{ uri: event.image_path }}
        />
        <View style={styles.overlay}>
          <Text style={styles.eventText}>{event.name}</Text>
          <Text style={styles.dateText}>{displayDate} + {displayTime}</Text>
        </View>
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
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10, 
  },
  eventImage: {
    width: 148,
    height: 140,
    borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#382873',
    paddingHorizontal: 4,
    paddingTop: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10, 
  },
  dateText: {
    color: 'white',
    fontSize: 8,
    paddingTop: 3
  },
  timeText: {
    color: 'white',
    fontSize: 8,
  },
  eventText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Event;
