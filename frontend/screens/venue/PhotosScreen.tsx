import React from "react";
import { View, StyleSheet, SafeAreaView, Image, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "@env";
/**
 * Screen to display all photos that have been included in any reviews of the current venue
 * @param venueID venue ID of the venue being explored  
 * @returns a scrollable list of photos 
 */

const PhotosScreen: React.FC = ({ venueID }) => {
    console.log(venueID);
    const [reviewDictList, setReviewDictList] = useState([]);

    // get all reviews from a venue
    useEffect(() => {
        fetch(`${API_DOMAIN}/venueratings/venue/${venueID}/ratings`)
            .then(response => response.json())
            .then(json => {
                setReviewDictList(json);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    console.log(reviewDictList);

    const photos = reviewDictList.filter(review => review.image_path && review.image_path.trim() !== "");

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <ScrollView>
                    {photos.length === 0 ? (
                        <Text style={styles.noPhotosText}>No Photos Yet!</Text>
                    ) : (
                        photos.map((review, index) => (
                            <Image
                                key={index} 
                                style={styles.eventImage}
                                source={{ uri: review.image_path }}
                            />
                        ))
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#060019",
        marginLeft: -20,
    },
    text: {
        color: "#fff",
        fontSize: 100,
    },
    scrollContainer: {
        width: 500,
        height: 700,
    },
    scrollView: {
        paddingVertical: 20,
    },
    eventImage: {
        width: 400,
        height: 200,
        marginTop: 10,
    },
    noPhotosText: {
        color: "white",
        textAlign: "center",
        fontSize: 24,
        marginLeft: 130,
        marginTop: 140,
        fontFamily: 'PlayfairDisplay_400Regular',
        textShadowColor: 'rgba(255, 255, 255, 1)', 
        textShadowOffset: { width: 0, height: 0 }, 
        textShadowRadius: 5,
    },
});

export default PhotosScreen;
