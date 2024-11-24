import { StyleSheet } from 'react-native';

const onboardingStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.40)',
      padding: 20,
    },
    topTitle: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'Archivo',
      fontWeight: '400',
      textAlign: 'center',
      marginTop: 20,
      lineHeight: 20,
    },
    backButton: {
      position: 'absolute',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    mainContent: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
    },
    title: {
      width: '100%',
      color: 'white',
      fontSize: 36,
      fontFamily: 'DT Nightingale',
      fontWeight: '300',
      lineHeight: 39.6,
      textAlign: 'left',
      marginBottom: 40,
      flexWrap: 'wrap',
      textShadowColor: 'white',
      textShadowRadius: 20,
    },
    optionBox: {
      width: 380,
      paddingVertical: 20,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.40)',
      marginBottom: 12,
    },
    unselectedOption: {
      backgroundColor: 'rgba(255, 255, 255, 0.40)',
    },
    selectedOption: {
      backgroundColor: 'white',
    },
    optionText: {
      color: 'black',
      fontSize: 20,
      fontFamily: 'Archivo',
      fontWeight: '200',
      textAlign: 'left',
      lineHeight: 20,
      width: '100%',
    },
    nextButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextButtonText: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'Archivo',
      fontWeight: '400',
      lineHeight: 20,
    }
  });

export default onboardingStyles;