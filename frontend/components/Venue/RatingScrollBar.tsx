import Slider from "@react-native-community/slider";
import {Text, View, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import SoundWave from "@/components/Venue/SoundWave";

/**
 * Allows a user to submit a rating from 0 - 10 on a specific category
 * @param minTitle left hand side of rating bar
 * @param maxTitle right hand side of rating bar
 * @param value slider value
 * @param onSliderChange handler function for slider 
 * @param category unique identifier for each sound wave for gradient 
 * @param startColor first color in gradient
 * @param stopColor second color in gradient
 * @param avgValue avg rating value of the current category
 * @returns slider over opaque average rating sound wave
 */
const RatingScrollBar = ({minTitle = "", maxTitle = "", value, onSliderChange, category, startColor, stopColor, avgValue}) => {

  const adjustedRating = avgValue === 0 ? 1 : avgValue;

  return(
    <View style={styles.container}>
      <View style={{paddingBottom: 20}}>
        <View style={{position: 'absolute', opacity: 0.5}}>
          <SoundWave
            category={category}
            rating={adjustedRating}
            startColor={startColor}
            stopColor={stopColor}
          />
        </View>
        <Slider 
          style={{ marginLeft: 5, width: 355, marginTop: 2}}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={value}
          thumbTintColor="transparent" 
          // eslint-disable-next-line
          thumbImage={require('../../assets/mid_size_star.png')}
          minimumTrackTintColor="white"
          maximumTrackTintColor="gray"
          onValueChange={onSliderChange}/>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{minTitle}</Text>
        <Text style={styles.label}>{maxTitle}</Text>
      </View>
    </View>
  );
}

RatingScrollBar.propTypes = {
  minTitle: PropTypes.string.isRequired,
  maxTitle: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  category: PropTypes.number, 
  startColor: PropTypes.string, 
  stopColor: PropTypes.string, 
  avgValue: PropTypes.number.isRequired, 
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#060019',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: -10,
  },
  label: {
    fontSize: 8,
    color: "white",
    padding: 5,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 8,
    textAlign: "center"
  },
});

export default RatingScrollBar;
