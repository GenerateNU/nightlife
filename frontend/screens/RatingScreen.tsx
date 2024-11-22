import React, { useState, useEffect } from "react";
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import StarReview from "@/components/StarReview";
import UpcomingEventScroll from "@/components/UpcomingEventScroll";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RatingScrollBar from "@/components/RatingScrollBar";
import { RouteProp } from '@react-navigation/native';
import ScaledText from "@/components/ScaledText";
type RootStackParamList = {
    Home: undefined;
    Rating: { venueId: string, venueName: string, venueAddress: string };  // Define props here
    VenueReviews: undefined;
  };
  
  type RatingScreenProps = {
    route: RouteProp<RootStackParamList, 'Rating'>; // Access route params
  };

const RatingScreen:  React.FC<RatingScreenProps> = ({ route })  => {
    const { venueId, venueName, venueAddress } = route.params;

    const userId = "26d636d9-f8b0-4ad7-be9c-9b98c4c8a0c4"

    
    const [ratings, setRatings] = useState({
        hype: 0,
        mainstream: 0,
        price: 0,
        crowd: 0,
        energy: 0,
        exclusive: 0,
      });
    
      const handleSliderChange = (ratingKey: string, value: number) => {
        setRatings((prevRatings) => ({
          ...prevRatings,
          [ratingKey]: value,
        }));
      };

      const calculateAverageRating = () => {
        const values = Object.values(ratings); 
        const total = values.reduce((acc, current) => acc + current, 0); 
        const average = total / values.length; 
        return average;
      };

      useEffect(() => {
        console.log("Current Ratings:", ratings);
      }, [ratings]); 

      const saveReviews = async () => {
        const reviewData = {
            overall_rating: calculateAverageRating(),
            energy_rating: ratings.energy,
            mainstream_rating: ratings.mainstream,
            price_rating: ratings.price,
            crowd_rating: ratings.crowd,
            hype_rating: ratings.hype,
            exclusive_rating: ratings.exclusive,
            review_text: "", 
            venue_id: venueId,
            user_id: userId,
        };
        console.log("Review Data:", reviewData); // Debug: log reviewData before sending

        try {
            const response = await fetch(`http://localhost:8080/userratings/user/26d636d9-f8b0-4ad7-be9c-9b98c4c8a0c4/${venueId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(reviewData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Review submitted successfully:', data);
            } else {
                const errorData = await response.json();
                console.error('Error submitting review:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <ScaledText
                            text={venueName}
                            maxFontSize={26}
                            minFontSize={20}
                            maxCharacters={20}
                            /><View style={styles.review}> 
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
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                    <RatingScrollBar 
                        minTitle="Chill" 
                        maxTitle="Energetic"
                        value={ratings.hype}
                        onSliderChange={(value) => handleSliderChange('hype', value)}/>
                    <RatingScrollBar 
                        minTitle="Underground"
                        maxTitle="Mainstream"
                        value={ratings.mainstream}
                        onSliderChange={(value) => handleSliderChange('mainstream', value)}
                    />
                    <RatingScrollBar 
                        minTitle="Affordable"
                        maxTitle="Expensive"
                        value={ratings.price}
                        onSliderChange={(value) => handleSliderChange('price', value)}/>
                    <RatingScrollBar 
                        minTitle="Classy"
                        maxTitle="Rowdy"
                        value={ratings.crowd}
                        onSliderChange={(value) => handleSliderChange('crowd', value)}/>
                    <RatingScrollBar
                        minTitle="Sit down"
                        maxTitle="Rave"
                        value={ratings.energy}
                        onSliderChange={(value) => handleSliderChange('energy', value)}/>
                    <RatingScrollBar
                        minTitle="Casual"
                        maxTitle="Exclusive"
                        value={ratings.exclusive}
                        onSliderChange={(value) => handleSliderChange('exclusive', value)}/>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={saveReviews}>
                        <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
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
    alignContent: 'center',
    alignSelf: 'center',
    width: 100,
    marginTop: 10
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
    


export default RatingScreen;
    