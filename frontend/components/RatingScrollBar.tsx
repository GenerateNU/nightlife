import Slider from "@react-native-community/slider";
import {Text, View, StyleSheet, Image} from "react-native";
import PropTypes from 'prop-types';
import {useState} from 'react'

const RatingScrollBar = ({minTitle = "", maxTitle = "", value, onSliderChange}) => {

  return(
  <View style={styles.container}>
      <Slider 
          style={{ width: 350, height: 40}}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={value}
          thumbTintColor="white"
          minimumTrackTintColor="white"
          maximumTrackTintColor="gray"
          onValueChange={onSliderChange}/>
      <View style={styles.labelContainer}>
          <Text style={styles.label}>{minTitle}</Text>
          <Text style={styles.label}>{maxTitle}</Text>
      </View>
  </View>);
}

RatingScrollBar.propTypes = {
  minTitle: PropTypes.string.isRequired, // Add prop validation here
  maxTitle: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onSliderChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
    },
    slider: {
      width: 300,
      height: 40,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300, 
      },
      label: {
        fontSize: 14,
        color: 'white',
        padding: 5,
        borderWidth: 1,
        backgroundColor: '#4B4B4D',
        borderColor: 'white', 
        borderRadius: 5, 
        textAlign: 'center', 
        width: 100, 
      },
  });

export default RatingScrollBar;