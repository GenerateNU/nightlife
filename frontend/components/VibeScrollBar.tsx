//import Slider from "@react-native-community/slider";
import {Text, View, StyleSheet, Image} from "react-native";
import PropTypes from 'prop-types';

const VibeScrollBar = ({rating = 1, minTitle = "", maxTitle = ""}) => {
  // const soundWaveImages = {
  //   1: require("../assets/sound_wave_1.png"),
  //   2: require("../assets/sound_wave_2.png"),
  // };
  const soundWaveImages = {
    1: "../assets/sound_wave_1.png",
    2: "../assets/sound_wave_2.png",
  };
    return(
    <View style={styles.container}>
        <Image
          source={soundWaveImages[rating]}
        />
        <View style={styles.labelContainer}>
            <Text style={styles.label}>{minTitle}</Text>
            <Text style={styles.label}>{maxTitle}</Text>
        </View>
    </View>);
}

VibeScrollBar.propTypes = {
  minTitle: PropTypes.string.isRequired, // Add prop validation here
  maxTitle: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
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

export default VibeScrollBar;