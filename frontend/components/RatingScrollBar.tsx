import Slider from "@react-native-community/slider";
import {Text, View, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import SoundWave from "./SoundWave";

const RatingScrollBar = ({minTitle = "", maxTitle = "", value, onSliderChange, category, startColor, stopColor, avg_value}) => {

  return(
    <View style={styles.container}>
      <View style={{paddingBottom: 20}}>
        <View style={{position: 'absolute', opacity: 0.5}}>
          <SoundWave
            category={category}
            rating={avg_value}
            startColor={startColor}
            stopColor={stopColor}
          />
        </View>
        <Slider 
          style={{ marginLeft: 5, width: 350, height: 40}}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={value}
          thumbTintColor="transparent" 
          //thumbImage={require('../assets/large_filled_star.png')}
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
  category: PropTypes.string, 
  startColor: PropTypes.string, 
  stopColor: PropTypes.string, 
  avg_value: PropTypes.number.isRequired, 
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
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
