import React from "react";
import { View, StyleSheet, SafeAreaView, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";

/**
 * Screen to display all photos that have been included in any reviews of current venue
 * @param venueID venue ID of the venue being explored  
 * @returns a scrollable list of photos 
 */

const PhotosScreen: React.FC = ({ venueID }) => {
    console.log(venueID)
    const [reviewDictList, setReviewDictList] = useState([]);

    // get all reviews from a venue
    useEffect(() => {
        fetch(`http://localhost:8080/venueratings/venue/${venueID}/ratings`)
            .then(response => response.json())
            .then(json => {
                setReviewDictList(json);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    console.log(reviewDictList)

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <ScrollView>
                    {/* Only collect & show images in reviews */}
                    {reviewDictList.map((review, index) => (
                        review.image_path && review.image_path.trim() !== "" && (
                            <Image
                                key={index} 
                                style={styles.eventImage}
                                source={{ uri: review.image_path }}
                            />
                        )
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#060019",
        marginLeft:-20
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
});

export default PhotosScreen;
