import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import UpcomingEventScroll from '@/components/Venue/UpcomingEventScroll';
import VibeScrollBar from '@/components/Venue/VibeScrollBar';

/**
 * Displays a summary of user ratings on various categories, along with current events hosted by the venue
 * @param navigation project navigation
 * @param eventDictList list of events with information like name, date, and image
 * @param hype user-rated score: "Sit down" -> "Rave"
 * @param mainstream user-rated score: "Underground" -> "Mainstream"
 * @param price user-rated score: "Affordable" -> "Expensive"
 * @param crowd user-rated score: "Classy" -> "Rowdy"
 * @param energy user-rated score: "Chill" -> "Energetic"
 * @param exclusive user-rated score: "Casual" -> "Exclusive"
 * @returns sound wave list
 */

const OverviewScreen = ({ navigation, venueID, eventDictList, hype, mainstream, price, crowd, energy, exclusive }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollView}>
                <ScrollView>
                    <View style={{ marginTop: 10 }}>
                        <View>
                            <Text style={styles.upcomingText}>
                                Upcoming Events
                            </Text>
                        </View>
                        <View>
                            <UpcomingEventScroll events={eventDictList} />
                        </View>
                    </View>
                    <Text style={styles.separator}>________________________________________________</Text>
                    
                    <View style={styles.vibeSection}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.vibeTitle}>
                                What&apos;s the vibe?
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Venue', {
                                        defaultTab: 'Rating',
                                        venue_id: venueID
                                    })
                                }
                                style={styles.buttonWrapper}>
                                {/* eslint-disable-next-line */}
                                <Image
                                    // eslint-disable-next-line
                                    source={require('../../assets/RESONATE.png')}
                                    style={styles.buttonImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <VibeScrollBar category={1} startColor="#306DFF" stopColor="#FFB4FE" rating={hype} minTitle="Chill" maxTitle="Energetic" />
                    <VibeScrollBar category={2} startColor="#43FFBD" stopColor="#FFDF62" rating={mainstream} minTitle="Underground" maxTitle="Mainstream" />
                    <VibeScrollBar category={3} startColor="#FF5972" stopColor="#9896FF" rating={price} minTitle="Affordable" maxTitle="Expensive" />
                    <VibeScrollBar category={4} startColor="#FF5972" stopColor="#FFDF62" rating={crowd} minTitle="Classy" maxTitle="Rowdy" />
                    <VibeScrollBar category={5} startColor="#FFB4FE" stopColor="#6AFFFC" rating={energy} minTitle="Sit down" maxTitle="Rave" />
                    <VibeScrollBar category={6} startColor="#43FFBD" stopColor="#FF7E5F" rating={exclusive} minTitle="Casual" maxTitle="Exclusive" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

// Prop type validation
OverviewScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired, // Validate the navigation object with a 'navigate' method
    }).isRequired,
    eventDictList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            image: PropTypes.string,
        })
    ).isRequired, 
    hype: PropTypes.number.isRequired, 
    mainstream: PropTypes.number.isRequired, 
    price: PropTypes.number.isRequired, 
    crowd: PropTypes.number.isRequired, 
    energy: PropTypes.number.isRequired, 
    exclusive: PropTypes.number.isRequired, 
    venueID: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060019',
    },
    scrollView: {
        height: 520
      },
    upcomingText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 0,
        fontFamily: 'PlayfairDisplay_400Regular',
        textShadowColor: 'rgba(255, 255, 255, 1)', 
        textShadowOffset: { width: 0, height: 0 }, 
        textShadowRadius: 5,
    },
    venueDescription: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    venueText: {
        color: 'white',
        marginBottom: 5,
    },
    separator: {
        color: 'white',
    },
    vibeSection: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    vibeTitle: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'PlayfairDisplay_400Regular',
        textShadowColor: 'rgba(255, 255, 255, 1)', 
        textShadowOffset: { width: 0, height: 0 }, 
        textShadowRadius: 5,
    },
    buttonContainer: {
        marginLeft: 50,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#306DFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    vibeScrollContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,

    },
    buttonImage: {
        width: 115, 
        height: 35,  
        resizeMode: 'contain', 
      },
      rowContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    buttonWrapper: {
        alignItems: 'flex-end', 
        marginLeft: 80
    },
});

export default OverviewScreen;
