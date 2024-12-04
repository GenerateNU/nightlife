import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import OverviewScreen from "./VenueOverviewScreen";
import VenueReviews from "./VenueReviews";
import PhotosScreen from "./PhotosScreen";
import useVenueRatings from "@/components/Venue/VenueRatings";
import isCurrentTimeInRange from "@/components/Venue/TimeCheck";
import VenueHeader from "@/components/Venue/VenueScreenHeader";
import RatingScreen from "./RatingScreen";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";

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

const VenueScreen: React.FC = ({ navigation }) => {

    const defaultTab = VenueTabs.Overview

    const { user } = useAuth();

    const route = useRoute();

    const [selectedTab, setSelectedTab] = useState<VenueTabs>(VenueTabs.Overview);
    const { venue_id } = route.params as { venue_id: string }; 
    
    console.log(route.params);

    const venueID = venue_id;
    const userID = user?.user_id;
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: "white", backgroundColor: "gray", padding: 6}}>Go Back</Text>
            </TouchableOpacity>
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
                        priceRating={priceRating}
                        isOpen={isCurrentTimeInRange(currentStartHours, currentStopHours)}
                        venueID={venueID}
                        userID={userID}
                    />
            </View>
        
            {selectedTab === VenueTabs.Rating && (
                <RatingScreen 
                venueId={venueID}
                hype={hypeRating}
                mainstream={mainstreamRating}
                price={priceRating}
                crowd={crowdRating}
                energy={energyRating}
                exclusive={exclusiveRating}/>)}

            {/* TAB NAVIGATION */}
            {selectedTab !== VenueTabs.Rating && (
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12, width: "100%", paddingHorizontal: 44 }}>
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

            <View style={{ marginTop: 12, marginHorizontal: 6 }}>
                {selectedTab === VenueTabs.Overview && (
                    <OverviewScreen
                        navigation={navigation}
                        eventDictList={eventDictList}
                        hype={hypeRating}
                        mainstream={mainstreamRating}
                        price={priceRating}
                        crowd={crowdRating}
                        energy={energyRating}
                        exclusive={exclusiveRating}
                    />)}
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
