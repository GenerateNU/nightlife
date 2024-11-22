import React, { useState, useEffect } from "react";
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import StarReview from "@/components/StarReview";
import UpcomingEventScroll from "@/components/UpcomingEventScroll";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VibeScrollBar from "@/components/VibeScrollBar";
import ScaledText from "@/components/ScaledText";

enum VenueTabs {
    Overview = "Overview",
    Reviews = "Reviews",
    Photos = "Photos",
}

const VenueScreen: React.FC = () => {
    const Tab = createBottomTabNavigator();

    const [selectedTab, setSelectedTab] = useState<VenueTabs>(VenueTabs.Overview);
    
    const OverviewScreen = () => <Text style={{color: "white"}}>Overview Content</Text>;
    const PhotosScreen = () => <Text style={{color: "white"}}>Photos Content</Text>;
    const ReviewsScreen = () => <Text style={{color: "white"}}>Reviews Content</Text>;

    const [venueName, setVenueName] = useState("")
    const [venueAddress, setVenueAddress] = useState("")
    const [eventDictList, setEventDictList] = useState([])

    const [mainstream, setMainstreamRating] = useState(1)
    const [price, setPriceRating] = useState(1)
    const [crowd, setCrowdRating] = useState(1)
    const [hype, setHypeRating] = useState(1)
    const [energy, setEnergyRating] = useState(1)
    const [exclusive, setExclusiveRating] = useState(1)
    const [ratingsDictList, setRatingsDictList] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/venues/3e69e3d8-2a07-448b-bb66-07b6a6c8c79f')
        .then(response => response.json())
        .then(json => {
        setVenueName(json.name);
        setVenueAddress(json.address.split(',')[0]);
        })
        .catch(error => {
        console.error(error);
        });
    }, [])

    useEffect(() => {
        fetch('http://localhost:8080/event/3e69e3d8-2a07-448b-bb66-07b6a6c8c79f')
        .then(response => response.json())
        .then(json => {
            setEventDictList(json)
        })
        .catch(error => {
        console.error(error);
        });
    }, [])

    useEffect(() => {
        fetch('http://localhost:8080/venueratings/venue/3e69e3d8-2a07-448b-bb66-07b6a6c8c79f/ratings')
        .then(response => response.json())
        .then(json => {
            setRatingsDictList(json)
            const mainstream_rating = json.map(item => item.mainstream_rating);
            const price_rating = json.map(item => item.price_rating);
            const crowd_rating = json.map(item => item.crowd_rating);
            const hype_rating = json.map(item => item.hype_rating);
            const energy_rating = json.map(item => item.energy_rating);
            const exclusive_rating = json.map(item => item.exclusive_rating);

            const mainstream_total = mainstream_rating.reduce((acc, curr) => acc + curr, 0);
            const mainstream_average = mainstream_rating.length > 0 ? mainstream_total / mainstream_rating.length : 0;
            
            const price_total = price_rating.reduce((acc, curr) => acc + curr, 0);
            const price_average = price_rating.length > 0 ? price_total / price_rating.length : 0;
            
            const crowd_total = crowd_rating.reduce((acc, curr) => acc + curr, 0);
            const crowd_average = crowd_rating.length > 0 ? crowd_total / crowd_rating.length : 0;
            
            const hype_total = hype_rating.reduce((acc, curr) => acc + curr, 0);
            const hype_average = hype_rating.length > 0 ? hype_total / hype_rating.length : 0;
            
            const energy_total = energy_rating.reduce((acc, curr) => acc + curr, 0);
            const energy_average = energy_rating.length > 0 ? energy_total / energy_rating.length : 0;
            
            const exclusive_total = exclusive_rating.reduce((acc, curr) => acc + curr, 0);
            const exclusive_average = exclusive_rating.length > 0 ? exclusive_total / exclusive_rating.length : 0;
            
            setMainstreamRating(Math.ceil(mainstream_average));
            setPriceRating(Math.ceil(price_average));
            setCrowdRating(Math.ceil(crowd_average));
            setHypeRating(Math.ceil(hype_average));
            setEnergyRating(Math.ceil(energy_average));
            setExclusiveRating(Math.ceil(exclusive_average));
    
        })
        .catch(error => {
        console.error(error);
        });
    }, [])

    console.log("****", ratingsDictList)

    console.log("****", price)
    console.log("****", crowd)
    console.log("****", hype)
    console.log("****", energy)
    console.log("****", )
    
    return (
            <View style={styles.container}>
                <View style={styles.header}> 
                    <View>
                    <ScaledText
                            text={venueName}
                            maxFontSize={26}
                            minFontSize={20}
                            maxCharacters={20}
                            />
                            <View style={styles.review}> 
                                <Text style={{color: 'white'}}> 4.7 </Text>
                                <StarReview /> 
                                <Text style={{color: 'white'}}> (14) </Text>
                                <View style={{display: 'flex', paddingLeft: 135, flexDirection: 'row' }}>
                                    <Text style={{color: 'white'}}>Club</Text>
                                    <FontAwesome style={{paddingLeft: 4}} name="circle" size={16} color="white" />
                                    <FontAwesome style={{paddingLeft: 2}} name="circle" size={16} color="white" />
                                    <FontAwesome style={{paddingLeft: 2}} name="circle" size={16} color="white" />
                                </View>
                            </View>
                        <View style={styles.review}> 
                            <Text style={{color: 'white'}}>{venueAddress}</Text>
                            <Text style={{right: 40, color: 'white', paddingLeft: 172}}> 6:00 - 2:00 AM </Text>
                        </View>
                    </View>
                    <View style={styles.bookmark}>
                        <Feather name="bookmark" size={22} color="white" />
                        <Entypo name="dots-three-vertical" size={22} color="white" />
                    </View>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 12, width: "100%", paddingHorizontal: 44}}>
                    <TouchableOpacity onPress={() => setSelectedTab(VenueTabs.Overview)}>
                        <Text style={styles.buttonText}>Overview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTab(VenueTabs.Reviews)}>
                        <Text style={styles.buttonText}>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTab(VenueTabs.Photos)}>
                        <Text style={styles.buttonText}>Photos</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 12, marginHorizontal: 6}}>
                {selectedTab === VenueTabs.Overview && <OverviewScreen />}
                {selectedTab === VenueTabs.Reviews && <ReviewsScreen />}
                {selectedTab === VenueTabs.Photos && <PhotosScreen />}
                </View>
                
                <View style={{marginTop: 10}}>
                
                    <View >
                        <Text style={{color: 'white', fontSize: 20, marginLeft: 5, marginBottom: 0 }}> 
                            Upcoming Events
                        </Text>
                    </View>
                    <View style={{marginTop: -6}}>
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
                    <View style={{marginLeft: 50, marginTop: 5}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rating', { venueId: "3e69e3d8-2a07-448b-bb66-07b6a6c8c79f", venueName: venueName, venueAddress: venueAddress })}>
                        <Text style={styles.buttonText}>Resonate</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            
                <ScrollView style={{backgroundColor: '#121212'}}>
                    <View style={{flexDirection: 'column'}}>
                        <VibeScrollBar rating={hype} minTitle="Chill" maxTitle="Energetic"/>
                        <VibeScrollBar rating={mainstream} minTitle="Underground" maxTitle="Mainstream"/>
                        <VibeScrollBar rating={price} minTitle="Affordable" maxTitle="Expensive"/>
                        <VibeScrollBar rating={crowd} minTitle="Classy" maxTitle="Rowdy"/>
                        <VibeScrollBar rating={energy} minTitle="Sit down" maxTitle="Rave"/>
                        <VibeScrollBar rating={exclusive} minTitle="Casual" maxTitle="Exclusive"/>
                    </View>
                </ScrollView>
            </View>
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
    paddingTop: 10,
    backgroundColor: '#121212'
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
    right: 80,
    display: 'flex',
     flexDirection: 'row'
    },
    tabContainer: {
        marginTop: -20
    },
    tabText: {
        textDecorationColor: 'white',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline'
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
