import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const PersonaIcons = ({ venueID = "" }) => {
  const [personas, setPersonas] = useState([]);

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

  useEffect(() => {
    fetch(`http://localhost:8080/venues/persona/${venueID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch personas');
        }
        return response.json();
      })
      .then((json) => {
        setPersonas(json);
      })
      .catch((error) => {
        console.error('Error fetching personas:', error);
      });
  }, [venueID]);

  console.log(venueID)
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
        <Text style={styles.message}>No personas available.</Text>
      )}
    </View>
  );
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
    marginLeft: -6
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666'
  },
});

export default PersonaIcons;
