import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import SoundWave from "@/components/Venue/SoundWave"

/**
 * Combines sound wave image with respective labels into one component
 */
const VibeScrollBar = ({ category = 1, rating = 1, startColor = "", stopColor = "", minTitle = "", maxTitle = "" }) => {
  return (
    <View style={styles.container}>
      <View style={{paddingBottom: 30}}>
        <SoundWave
          category={category}
          rating={rating}
          startColor={startColor}
          stopColor={stopColor}
        />

      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>{minTitle}</Text>
        <Text style={styles.label}>{maxTitle}</Text>
      </View>
    </View>
  );
};

VibeScrollBar.propTypes = {
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

export default VibeScrollBar;
