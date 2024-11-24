import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

type ProgressBarProps = {
  progress: number; 
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={[styles.progressBarBackground, styles.progressBar]}>
      <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    width: '100%',
    height: 16,
    backgroundColor: 'white',
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 317.68,
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFB4FE', 
    borderRadius: 40, 
    position: 'absolute',
    left: 0,
  },
  progressBar: {
    marginBottom: 20
  },
});

export default ProgressBar;
