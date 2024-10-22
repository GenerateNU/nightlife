import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

type ProgressBarProps = {
  progress: number; 
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
    </View>
  );
};

export default ProgressBar;
