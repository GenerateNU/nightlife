import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

type ScaledTextProps = {
  text: string;
  maxFontSize: number; 
  minFontSize: number; 
  maxCharacters: number; 
};

const ScaledText: React.FC<ScaledTextProps> = ({
  text,
  maxFontSize,
  minFontSize,
  maxCharacters,
}) => {

  const calculateFontSize = () => {
    const textLength = text.length;

    if (textLength <= maxCharacters) {
      return maxFontSize;
    }

    const scale = Math.max(
      minFontSize,
      maxFontSize - (textLength - maxCharacters) * 2
    );

    return scale;
  };
  const fontSize = calculateFontSize();
  console.log(fontSize);
  return <Text style={[styles.text, { fontSize }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginLeft: -4,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default ScaledText;