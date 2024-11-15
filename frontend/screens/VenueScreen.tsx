import React, { useState, useEffect } from "react";
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

    const [venueName, setVenueName] = useState("")
    const [venueAddress, setVenueAddress] = useState("")
    const [eventDictList, setEventDictList] = useState([])

    const [ambiance, setAmbianceRating] = useState(0)
    const [music, setMusicRating] = useState(0)
    const [crowd, setCrowdRating] = useState(0)
    const [service, setServiceRating] = useState(0)
    const [ratingsDictList, setRatingsDictList] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/venues/2edc969e-bf93-4b3b-9273-5b0aa968b79c')
        .then(response => response.json())
        .then(json => {
        setVenueName(json.name);
        setVenueAddress(json.address.split(',')[0]);
        })
        .catch(error => {
        console.error(error);
        });
    })

    useEffect(() => {
        fetch('http://localhost:8080/event/2edc969e-bf93-4b3b-9273-5b0aa968b79c')
        .then(response => response.json())
        .then(json => {
            setEventDictList(json)
        })
        .catch(error => {
        console.error(error);
        });
    })

    useEffect(() => {
        fetch('http://localhost:8080/venueratings/venue/3e69e3d8-2a07-448b-bb66-07b6a6c8c79f/ratings')
        .then(response => response.json())
        .then(json => {
            setRatingsDictList(json)
            const ambiance_rating = json.map(item => item.ambiance_rating);
            const music_rating = json.map(item => item.music_rating);
            const crowd_rating = json.map(item => item.crowd_rating);
            const service_rating = json.map(item => item.service_rating);
            
            const ambiance_total = ambiance_rating.reduce((acc, curr) => acc + curr, 0);
            const ambiance_average = ambiance_rating.length > 0 ? ambiance_total / ambiance_rating.length : 0;
            
            const music_total = music_rating.reduce((acc, curr) => acc + curr, 0);
            const music_average = music_rating.length > 0 ? music_total / music_rating.length : 0;
            
            const crowd_total = crowd_rating.reduce((acc, curr) => acc + curr, 0);
            const crowd_average = crowd_rating.length > 0 ? crowd_total / crowd_rating.length : 0;
            
            const service_total = service_rating.reduce((acc, curr) => acc + curr, 0);
            const service_average = service_rating.length > 0 ? service_total / service_rating.length : 0;
            
            setAmbianceRating(Math.ceil(ambiance_average)-8);
            setCrowdRating(Math.ceil(crowd_average)-5);
            setMusicRating(Math.ceil(music_average)-7);
            setServiceRating(Math.ceil(service_average)-8);
        })
        .catch(error => {
        console.error(error);
        });
    })

    console.log("****", ratingsDictList)

    console.log("****", ambiance)
    console.log("****", crowd)
    console.log("****", music)
    console.log("****", service)
    
    return (
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={styles.container}>
                <View style={styles.header}> 
                    <View>
                        <Text style={{marginLeft: -4, color: 'white', fontSize: 26, fontWeight: 'bold'}}>{venueName}</Text>
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
                            <Text style={{color: 'white'}}>{venueAddress}</Text>
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
                        <UpcomingEventScroll events={eventDictList}/>
                    </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                        Venue Name is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                    </Text>
                    <Text style={{color: 'white'}}>_______________________________________________________________</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'white', alignItems: 'flex-start', fontSize: 22}}> What&apos;s the vibe? </Text>
                    <View style={{marginLeft: 80, marginTop: 5}}>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed')}>
                        <Text style={styles.buttonText}>Resonate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <VibeScrollBar rating={ambiance} minTitle="Chill" maxTitle="Energetic"/>
                    <VibeScrollBar rating={crowd} minTitle="Underground" maxTitle="Mainstream"/>
                    <VibeScrollBar rating={service} minTitle="Affordable" maxTitle="Expensive"/>
                    <VibeScrollBar rating={crowd} minTitle="Classy" maxTitle="Rowdy"/>
                    <VibeScrollBar rating={ambiance} minTitle="Sit down" maxTitle="Rave"/>
                    <VibeScrollBar rating={ambiance} minTitle="Casual" maxTitle="Exclusive"/>
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
