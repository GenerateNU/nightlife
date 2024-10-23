import React from "react";
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import StarReview from "@/components/StarReview";
import UpcomingEventScroll from "@/components/UpcomingEventScroll";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VibeScrollBar from "@/components/VibeScrollBar";

const VenueScreen: React.FC = () => {
    const Tab = createBottomTabNavigator();

    const OverviewScreen = () => <Text>Overview Content</Text>;
    const DetailsScreen = () => <Text>Details Content</Text>;
    const ReviewsScreen = () => <Text>Reviews Content</Text>;

    return (
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={styles.container}>
                <View style={styles.header}> 
                    <View>
                        <Text style={{marginLeft: -4, color: 'white', fontSize: 26, fontWeight: 'bold'}}> Venue Name </Text>
                            <View style={styles.review}> 
                                <Text style={{color: 'white'}}> 4.7 </Text>
                                <StarReview /> 
                                <Text style={{color: 'white'}}> (14) </Text>
                                <View style={{display: 'flex', paddingLeft: 165, flexDirection: 'row' }}>
                                    <Text style={{color: 'white'}}>Club</Text>
                                    <FontAwesome style={{paddingLeft: 4}} name="circle" size={16} color="white" />
                                    <FontAwesome style={{paddingLeft: 2}} name="circle" size={16} color="white" />
                                    <FontAwesome style={{paddingLeft: 2}} name="circle" size={16} color="white" />
                                </View>
                            </View>
                        <View style={styles.review}> 
                            <Text style={{color: 'white'}}> 123 Boston St </Text>
                            <Text style={{color: 'white', paddingLeft: 172}}> 6:00 - 2:00 AM </Text>
                        </View>
                        <View style={styles.tabContainer}>
                            <Tab.Navigator
                            screenOptions={{
                                tabBarLabelStyle: {color: 'white', fontSize: 14, textDecorationLine: 'underline'},
                                tabBarIcon: () => null,
                                tabBarStyle: {
                                    backgroundColor: 'transparent',  
                                    borderTopWidth: 0,               
                                    elevation: 0,                    
                                    shadowOpacity: 0,                
                                },
                            }}
                            >
                            <Tab.Screen name="Overview" component={OverviewScreen} />
                            <Tab.Screen name="Details" component={DetailsScreen} />
                            <Tab.Screen name="Reviews" component={ReviewsScreen} />
                            </Tab.Navigator>
                        </View>
                    </View>
                    <View style={styles.bookmark}>
                        <Feather name="bookmark" size={22} color="white" />
                        <Entypo name="dots-three-vertical" size={22} color="white" />
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <View >
                        <Text style={{color: 'white', fontSize: 20, marginLeft: 5, marginBottom: -3 }}> 
                            Upcoming Events
                        </Text>
                    </View>
                    <View style={{marginTop: -10}}>
                        <UpcomingEventScroll />
                    </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                        Venue Name is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                    </Text>
                    <Text style={{color: 'white'}}>_______________________________________________________________</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'white', alignItems: 'flex-start', fontSize: 22}}> What's the vibe? </Text>
                    <View style={{marginLeft: 80, marginTop: 5}}>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed')}>
                        <Text style={styles.buttonText}>Resonate</Text> {/* You can adjust font size here */}
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <VibeScrollBar minTitle="Chill" maxTitle="Energetic"/>
                    <VibeScrollBar minTitle="Underground" maxTitle="Mainstream"/>
                    <VibeScrollBar minTitle="Affordable" maxTitle="Expensive"/>
                    <VibeScrollBar minTitle="Classy" maxTitle="Rowdy"/>
                    <VibeScrollBar minTitle="Sit down" maxTitle="Rave"/>
                    <VibeScrollBar minTitle="Casual" maxTitle="Exclusive"/>
                </View>
            </View>
    
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
    },
    review: {
    display: 'flex',
    flexDirection: 'row',
    },
    header: {
    display: 'flex', 
    flexDirection: 'row'
    },
    bookmark: {
    paddingTop: 5,
    right: 40,
    display: 'flex',
     flexDirection: 'row'
    },
    tabContainer: {
        marginTop: -20
    },
    buttonText: {
    fontSize: 14, 
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    },
    button: {
    backgroundColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 30
    },
    text: {
        fontSize: 24,
        marginBottom: 10,
        color: 'white',
      },
      slider: {
        width: 300,
        height: 40,
      },
      thumb: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#1EB1FC',
        position: 'absolute',
        top: -10,
      },
      
    });
    

export default VenueScreen;