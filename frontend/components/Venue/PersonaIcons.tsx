import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const PersonaIcons = ({ personas = [] }) => {
  const PersonaIconImages = {
    // eslint-disable-next-line
    roux: require('../../assets/roux.png'),
    // eslint-disable-next-line
    lumi: require('../../assets/lumi.png'),
    // eslint-disable-next-line
    sprig: require('../../assets/sprig.png'),
    // eslint-disable-next-line
    serafina: require('../../assets/serafina.png'),
    // eslint-disable-next-line
    buckley: require('../../assets/buckley.png'),
    // eslint-disable-next-line
    blitz: require('../../assets/blitz.png'),
  };

  console.log("*************", personas);
  return (
    <View style={styles.container}>
      {personas.length > 0 ? (
        <View style={styles.iconContainer}>
          {personas.map((persona, index) => (
            <Image
              key={index}
              source={PersonaIconImages[persona]}
              style={styles.icon}
              resizeMode="contain"
            />
          ))}
        </View>
      ) : (
        <Text style={styles.message}>Not enough reviews</Text>
      )}
    </View>
  );
};

PersonaIcons.propTypes = {
  personas: PropTypes.arrayOf(PropTypes.oneOf(['roux', 'lumi', 'sprig', 'serafina', 'buckley', 'blitz'])).isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 10
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666'
  },
});

export default PersonaIcons;
