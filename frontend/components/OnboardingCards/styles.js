import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Common Styles
  container: {
    flex: 1,
    backgroundColor: '#313131',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'transparent',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  skipButton: {
    marginTop: 28,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },

  // Add Photo Styles
  addPhotoTitle: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Inter',
    fontWeight: 400,
    lineHeight: 53,
    textAlign: 'center',
  },
  addPhotoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addPhotoPlaceholder: {
    backgroundColor: '#D9D9D9',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addPhotoText: {
    color: '#000000',
    fontSize: 18,
  },
  addPhotoButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  addPhotoButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 5,
    alignItems: 'center', 
    marginBottom: 10,
    width: '100%',
    height: '50%',
  },
  addPhotoButtonText: {
    color: '#1B1B1B',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0.18,
  },

  // Crowd and Frequency Preferences Styles
  crowdTitle: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 40,
  },
  dropdownButton: {
    backgroundColor: '#414141',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 18,
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
  },
  dropdown: {
    backgroundColor: '#515151',
    borderRadius: 5,
    marginBottom: 20,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#414141',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },

  // Nightlife Preferences Styles
  nightlifeContainer: {
    backgroundColor: '#313131',
    flex: 1,
    maxWidth: 480,
    width: '100%',
    paddingBottom: 127,
    flexDirection: 'column',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nightlifeMainContent: {
    display: 'flex',
    marginTop: 76,
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 32,
  },
  nightlifeTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 53,
    letterSpacing: -0.4,
    alignSelf: 'flex-start',
  },
  nightlifeSelected: {
    backgroundColor: '#d9d9d9',
  },

  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#313131',
    paddingTop: 50,
  },
  splashWelcomeText: {
    color: '#fff',
    fontSize: 48,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 60,
    textAlign: 'center',
  },
});
