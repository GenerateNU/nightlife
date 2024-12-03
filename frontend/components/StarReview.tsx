import * as React from 'react';
import { View, StyleSheet, Image } from "react-native";
import Stars from "@/components/Stars";
import PropTypes from "prop-types";

// Takes a rating => represents using filled/empty stars
const StarReview = ({ rating }) => {  
    const filledStars = Array(rating).fill(Stars.full);
    const emptyStars = Array(5 - rating).fill(Stars.empty);
    const starIcons = [...filledStars, ...emptyStars];

    return (
        <View style={styles.starContainer}>
            {starIcons.map((star, index) => (
                <Image
                    key={index}
                    source={star}
                    style={styles.star}
                />
            ))}
        </View>
    );
}; 

StarReview.propTypes = {
    rating: PropTypes.number.isRequired // Validates that `rating` is a required number
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: "row", 
        marginBottom: 10,
        justifyContent: "flex-start", 
    },
    star: {
        width: 20, 
        height: 20, 
        marginRight: 3, 
    }
});

export default StarReview;
