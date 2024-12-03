import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Svg, { Defs, LinearGradient, Stop, Mask, Rect, Image } from 'react-native-svg';

/**
 * Creates a sound wave like in Figma depending on the category & average provided rating
 */

const SoundWave = ({ category = 1, rating = 1, startColor = "", stopColor = ""}) => {
    // eslint-disable-next-line
    const soundWaveImages = {
       // eslint-disable-next-line
      1: require("../../assets/sound_wave_1.png"),
       // eslint-disable-next-line
      2: require("../../assets/sound_wave_2.png"),
       // eslint-disable-next-line
      3: require("../../assets/sound_wave_3.png"),
       // eslint-disable-next-line
      4: require("../../assets/sound_wave_4.png"),
       // eslint-disable-next-line
      5: require("../../assets/sound_wave_5.png"),
       // eslint-disable-next-line
      6: require("../../assets/sound_wave_6.png"),
       // eslint-disable-next-line
      7: require("../../assets/sound_wave_7.png"),
       // eslint-disable-next-line
      8: require("../../assets/sound_wave_8.png"),
       // eslint-disable-next-line
      9: require("../../assets/sound_wave_9.png"),
       // eslint-disable-next-line
      10: require("../../assets/sound_wave_10.png"),
    };

    
    const gradientId = `grad-${category}`; 
  
    return (
      <View style={styles.container}>
        <Svg viewBox="0 0 350 150">
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={startColor} />
              <Stop offset="20%" stopColor={stopColor} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={stopColor} stopOpacity="0" />
            </LinearGradient>
            <Mask id={`mask-${category}`}> 
              <Image
                href={soundWaveImages[rating]}
                x="0"
                y="0"
                width="100%"
                height="30%"
                preserveAspectRatio="xMidYMid slice"
                opacity="1"
              />
            </Mask>
          </Defs>
  
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${gradientId})`} 
            mask={`url(#mask-${category})`} 
          />
        </Svg>
        </View>
  );
};

SoundWave.propTypes = {
  minTitle: PropTypes.string.isRequired,
  maxTitle: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  startColor: PropTypes.string.isRequired,
  stopColor: PropTypes.string.isRequired,
  category: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: 360,
    height: 150,
    marginBottom:-60
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
  },
});

export default SoundWave;
