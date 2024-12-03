import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Svg, { Defs, LinearGradient, Stop, Mask, Rect, Image } from 'react-native-svg';


const SoundWave = ({ category = 1, rating = 1, startColor = "", stopColor = ""}) => {
    const soundWaveImages = {
      1: require("../assets/sound_wave_1.png"),
      2: require("../assets/sound_wave_2.png"),
      3: require("../assets/sound_wave_3.png"),
      4: require("../assets/sound_wave_4.png"),
      5: require("../assets/sound_wave_5.png"),
      6: require("../assets/sound_wave_6.png"),
      7: require("../assets/sound_wave_7.png"),
      8: require("../assets/sound_wave_8.png"),
      9: require("../assets/sound_wave_9.png"),
      10: require("../assets/sound_wave_10.png"),
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
            fill={`url(#${gradientId})`} // Reference unique gradient
            mask={`url(#mask-${category})`} // Reference unique mask
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
