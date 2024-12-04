import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import OverviewScreen from "./VenueOverviewScreen";
import VenueReviews from "./VenueReviews";
import PhotosScreen from "./PhotosScreen";
import useVenueRatings from "@/components/Venue/VenueRatings";
import isCurrentTimeInRange from "@/components/Venue/TimeCheck";
import VenueHeader from "@/components/Venue/VenueScreenHeader";
import RatingScreen from "./RatingScreen";
import PersonaIcons from "@/components/Venue/PersonaIcons";

enum VenueTabs {
    Overview = "Overview",
    Reviews = "Reviews",
    Photos = "Photos",
    Rating = "Rating"
}

/**
 * Primary navigation portal between seeing user ratings & posting them
 * @param navigation project navigation
 * @param route serves as prop for navigation kinda
 * @returns overall venue screen 
 */

const VenueScreen: React.FC = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState<VenueTabs>(VenueTabs.Overview);
    const { defaultTab = VenueTabs.Overview } = route.params || {};  

    const venueID = "0006b62a-21bd-4e48-8fc7-e3bcca66d0d0";
    const userID = "26d636d9-f8b0-4ad7-be9c-9b98c4c8a0c4";
    const day = new Date().getDay();
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = dayNames[day] + "_hours";
    const [currentStartHours, setCurrentStartHours] = useState("");
    const [currentStopHours, setCurrentStopHours] = useState("");

    // venue screen heading info
    const [venueName, setVenueName] = useState("");
    const [venueCity, setVenueCity] = useState("");
    const [venueAddress, setVenueAddress] = useState("");
    const [venueType, setVenueType] = useState("");
    const [venuePrice, setVenuePrice] = useState(1);
    // venue-specific event info
    const [eventDictList, setEventDictList] = useState([]);

    // venue-specific rating information
    const {
        mainstreamRating,
        priceRating,
        crowdRating,
        hypeRating,
        energyRating,
        exclusiveRating,
        overallRating,
    } = useVenueRatings(venueID);

    useEffect(() => {
        if (defaultTab === "Rating") {
            setSelectedTab(VenueTabs.Rating);
        }
    }, [defaultTab]);

    // GET venue information -> name, address, type
    useEffect(() => {
        fetch(`http://localhost:8080/venues/${venueID}`)
            .then(response => response.json())
            .then(json => {
                setVenueName(json.name);
                setVenueAddress(json.address.split(',')[0]);
                setVenueCity(json.city);
                setVenueType(json.venue_type);
                const times = json[dayName].split(": ")[1]; 
                const [start, stop] = times.split(" – ").map(time => time.trim());
                setCurrentStartHours(start);
                setCurrentStopHours(stop);
                setVenuePrice(json.price)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // GET venue events -> all columns
    useEffect(() => {
        fetch(`http://localhost:8080/event/${venueID}`)
            .then(response => response.json())
            .then(json => {
                setEventDictList(json);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {selectedTab === VenueTabs.Rating && (
                    <TouchableOpacity
                        onPress={() => setSelectedTab(VenueTabs.Overview)}>
                        <Text style={{color: 'white'}}>Back</Text>
                    </TouchableOpacity> )}
                    
                    <VenueHeader
                        venueName={venueName}
                        venueType={venueType}
                        venueAddress={venueAddress}
                        venueCity={venueCity}
                        overallRating={overallRating}
                        priceRating={venuePrice}
                        isOpen={isCurrentTimeInRange(currentStartHours, currentStopHours)}
                        venueID={venueID}
                        userID={userID}
                    />
            </View>
        
            {selectedTab === VenueTabs.Rating && (
                    <View style={{flexDirection: 'column'}}>
                        {/* Render the text and PersonaIcons */}
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 45}}>
                        <Text style={{color: 'white', fontSize: 14, marginLeft: -25}}>Recommended for ...</Text>
                        <PersonaIcons venueID={venueID}/>
                        </View>

                        {/* Render the RatingScreen component */}
                        <RatingScreen 
                        venueId={venueID}
                        hype={hypeRating}
                        mainstream={mainstreamRating}
                        price={priceRating}
                        crowd={crowdRating}
                        energy={energyRating}
                        exclusive={exclusiveRating}
                        />
                    </View>
                    )}


            {/* TAB NAVIGATION */}
            {selectedTab !== VenueTabs.Rating && (
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, marginTop: 12, width: "100%", paddingHorizontal: 44 }}>
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
            )}
            
            <View style={{ marginHorizontal: 6 }}>
                
            {selectedTab === VenueTabs.Overview && (
                    <View style={{alignItems: 'center'}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -5 }}>
                            <Text style={{ color: 'white', fontSize: 14, marginLeft: -10 }}>Recommended for ...</Text>
                            <PersonaIcons venueID={venueID} />
                        </View>
                        <OverviewScreen
                            navigation={navigation}
                            eventDictList={eventDictList}
                            hype={hypeRating}
                            mainstream={mainstreamRating}
                            price={priceRating}
                            crowd={crowdRating}
                            energy={energyRating}
                            exclusive={exclusiveRating}
                        />
                    </View>
                )}

                {selectedTab === VenueTabs.Reviews && <VenueReviews navigation={navigation} venueName={venueName} venueAddress={venueAddress} venueType={venueType} venueCity={venueCity} />}
                {selectedTab === VenueTabs.Photos && <PhotosScreen venueID={venueID}/>}
            </View>
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
        backgroundColor: '#060019',
    },
    review: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
    },
    bookmark: {
        paddingTop: 5,
        right: 80,
        display: 'flex',
        flexDirection: 'row',
    },
    tabContainer: {
        marginTop: -20,
    },
    tabText: {
        textDecorationColor: 'white',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'gray',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 30,
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
    starContainer: {
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "flex-start",
    },
    star: {
        width: 20,
        height: 20,
        marginRight: 3,
    },
    buttonImage: {
        width: 30,
        height: 30,
    }
});

export default VenueScreen;
