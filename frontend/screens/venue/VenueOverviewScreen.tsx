import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import UpcomingEventScroll from '@/components/UpcomingEventScroll';
import VibeScrollBar from '@/components/VibeScrollBar';

/**
 * Displays a summary of user ratings on various categories, along with current events hosted by the venue
 * @param navigation project navigation
 * @param eventDictList list of events with information like name, date, and image
 * @param hype user-rated score: "Sit down" -> "Rave"
 * @param mainstream user-rated score: "Underground" -> "Mainstream"
 * @param price user-rated score: "Affordable" -> "Expensive"
 * @param crowd user-rated score: "Classy" -> "Rowdy"
 * @param energy user-rated score: "Chill" -> "Energetic"
 * @param exclusive user rated score: "Casual" -> "Exclusive"
 * @returns sound wave list
 */

const OverviewScreen = ({ navigation, eventDictList, hype, mainstream, price, crowd, energy, exclusive }) => {
    const venueID = "0006b62a-21bd-4e48-8fc7-e3bcca66d0d0";

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
                            <UpcomingEventScroll events={eventDictList}/>
                        </View>
                    </View>
                    <Text style={styles.separator}>______________________________________________________________</Text>
                    
                    <View style={styles.vibeSection}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.vibeTitle}>
                                What's the vibe?
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Venue', {
                                        defaultTab: 'Rating',
                                    })
                                }
                                style={styles.buttonWrapper}>
                                <Image
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060019',
    },
    scrollView: {
        height: 650
      },
    upcomingText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 5,
        marginBottom: 0,
    },
    venueDescription: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    venueText: {
        color: 'white',
        textAlign: 'center',
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
        flex: 1,
        alignContent: 'flex-start'
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
