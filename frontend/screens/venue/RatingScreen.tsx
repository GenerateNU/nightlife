import React, { useState, useEffect } from "react";
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import RatingScrollBar from "@/components/RatingScrollBar";

const RatingScreen: React.FC<{ venueId: string, hype: number, mainstream: number, price: number, crowd: number, energy: number, exclusive: number }> = ({ venueId, hype, mainstream, price, crowd, energy, exclusive }) => {
    const userID = "26d636d9-f8b0-4ad7-be9c-9b98c4c8a0c4";

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

    const saveReviews = async () => {
        const reviewData = {
            overall_rating: Math.floor(calculateAverageRating()),
            energy_rating: ratings.energy,
            mainstream_rating: ratings.mainstream,
            price_rating: ratings.price,
            crowd_rating: ratings.crowd,
            hype_rating: ratings.hype,
            exclusive_rating: ratings.exclusive,
            review_text: "", 
            venue_id: venueId,
            user_id: userID,
            image_path: null
        };
        
        try {
            const response = await fetch(`http://localhost:8080/userratings/user/${userID}/${venueId}`, {
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
        <ScrollView style={{ backgroundColor: '#121212', width: 365}}>
            <View style={{ flexDirection: 'column' }}>
            <View style={{ marginBottom: 20 }}>
                <RatingScrollBar 
                        minTitle="Chill" 
                        maxTitle="Energetic"
                        value={ratings.hype}
                        onSliderChange={(value) => handleSliderChange('hype', value)}
                        category={1}
                        startColor="#306DFF"
                        stopColor="#FFB4FE"
                        avg_value={hype}/>
            </View>
            <View style={{ marginBottom: 20 }}>
                <RatingScrollBar 
                    minTitle="Underground"
                    maxTitle="Mainstream"
                    value={ratings.mainstream}
                    onSliderChange={(value) => handleSliderChange('mainstream', value)}
                    category={2}
                    startColor="#43FFBD"
                    stopColor="#FFDF62"
                    avg_value={mainstream}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <RatingScrollBar 
                    minTitle="Affordable"
                    maxTitle="Expensive"
                    value={ratings.price}
                    onSliderChange={(value) => handleSliderChange('price', value)}
                    category={3}
                    startColor="#FF5972"
                    stopColor="#9896FF"
                    avg_value={price}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <RatingScrollBar 
                    minTitle="Classy"
                    maxTitle="Rowdy"
                    value={ratings.crowd}
                    onSliderChange={(value) => handleSliderChange('crowd', value)}
                    category={4}
                    startColor="#FF5972"
                    stopColor="#FFDF62"
                    avg_value={crowd}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <RatingScrollBar
                    minTitle="Sit down"
                    maxTitle="Rave"
                    value={ratings.energy}
                    onSliderChange={(value) => handleSliderChange('energy', value)}
                    category={5}
                    startColor="#FFB4FE"
                    stopColor="#6AFFFC"
                    avg_value={energy}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <RatingScrollBar
                    minTitle="Casual"
                    maxTitle="Exclusive"
                    value={ratings.exclusive}
                    onSliderChange={(value) => handleSliderChange('exclusive', value)}
                    category={6}
                    startColor="#43FFBD"
                    stopColor="#FF7E5F" 
                    avg_value={exclusive}
                />
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={saveReviews}>
                        <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        marginLeft: 0
    },
    buttonText: {
        fontSize: 20, 
        color: 'black',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignContent: 'center',
        alignSelf: 'center',
        width: 300,
        marginTop: 10,
    },
});

export default RatingScreen;
