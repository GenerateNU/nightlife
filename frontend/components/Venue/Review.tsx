import { Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Used to display reviews on the VenueReviews page. Contains information like overall rating, review summary, and images
 * @param reviewDict review dictionary containing relevant info 
 * @returns 
 */

const Review = ({ reviewDict = { 
        review_id: 0, 
        user_id: "", 
        venue_id: "", 
        overall_rating: 0, 
        crowd_rating: 0, 
        review_text: "",
        created_at: "", 
        updated_at: "", 
        energy_rating: 0, 
        mainstream_rating: 0,
        price_rating: 0, 
        exclusive_rating: 0, 
        image_path: "" 
    }}) => {

    const [username, setUserName] = useState("");
    const [hasImage, setHasImage] = useState(false);
    const [hasReviewText, setHasReviewText] = useState(false);
    
    const stars = {
         // eslint-disable-next-line
        "full": require("../../assets/filled_star.png"),
         // eslint-disable-next-line
        "empty": require("../../assets/empty_star.png")
      }
   

    useEffect(() => {
        if (reviewDict.image_path && reviewDict.image_path.trim() !== "") {
            setHasImage(true);
        } else {
            setHasImage(false);
        }

        if (reviewDict.review_text && reviewDict.review_text.trim() !== "") {
            setHasReviewText(true);
        } else {
            setHasReviewText(false);
        }

        fetch(`http://localhost:8080/profiles/${reviewDict.user_id}`)
            .then(response => response.json())
            .then(json => {
                setUserName(json.username);
            })
            .catch(error => {
                console.error(error);
            });
    }, [reviewDict.image_path, reviewDict.review_text, reviewDict.user_id]); 
    
     const starReview = (rating) => {
        console.log(rating)
        const filledStars = Array(rating).fill(stars.full);
        const emptyStars = Array(5 - rating).fill(stars.empty);
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

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInMs = now.getTime() - past.getTime();
      
        const seconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
      
        if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
        if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
      };

      console.log(reviewDict)

    return (
        <View style={styles.container}>
            <Text style={styles.separator}>
                _____________________________________________________________________
            </Text>
            <Text style={styles.username}> {username} </Text>
            <View style={{flexDirection: 'row'}}>
             {starReview(Math.floor(reviewDict.overall_rating / 2))}
             <Text style={{color: 'white', fontSize: 12, marginTop: 1}}>    {getTimeAgo(reviewDict.created_at)} </Text>
            </View>
            {hasReviewText && (
                <Text style={styles.reviewText}> {reviewDict.review_text} </Text>
            )}
            {hasImage && (
                <Image
                    style={styles.eventImage}
                    source={{ uri: reviewDict.image_path }}
                    resizeMode="cover"
                />
            )}
        </View>
    );
};

Review.propTypes = {
    reviewDict: PropTypes.shape({
        review_id: PropTypes.number,
        user_id: PropTypes.string,
        venue_id: PropTypes.string,
        overall_rating: PropTypes.number,
        crowd_rating: PropTypes.number,
        review_text: PropTypes.string,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        energy_rating: PropTypes.number,
        mainstream_rating: PropTypes.number,
        price_rating: PropTypes.number,
        exclusive_rating: PropTypes.number,
        image_path: PropTypes.string
    })
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
    },
    separator: {
        color: "white",
        marginBottom: 10,
        fontWeight: 'bold'
    },
    username: {
        fontSize: 10,
        color: "white",
        marginBottom: 5,
        marginLeft: 20
    },
    reviewText: {
        fontSize: 16,
        color: "white",
        marginLeft: 20
    },
    eventImage: {
        height: 200,
        width: 400,
        marginTop: 10,
        marginLeft: -10
    },
    starContainer: {
        flexDirection: "row", 
        justifyContent: "flex-start", 
        marginLeft: 20,
        marginBottom: 5
    },
    star: {
        width: 20, 
        height: 20, 
        marginRight: 3, 
    },
});

export default Review;