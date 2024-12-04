import React from "react";
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Review from "@/components/Venue/Review";

/**
 * Displays a list of all the reviews that users have posted for the given venue containing the text, overall rating
 * as star reviews and the image associated to the review 
 * @param navigation project navigation
 * @param venueName given venue name
 * @param venueAddress given venue address
 * @param venueType given venue type
 * @param venueCity given venue city
 * @param username logged in user's username 
 * @returns scrollable list of venues
 */

const VenueReviews: React.FC = ({ navigation, venueName, venueAddress, venueType, venueCity}) => {
  const [reviewDictList, setReviewDictList] = useState([]);
  
  const stars = {
     // eslint-disable-next-line
    empty: require("../../assets/empty_star.png"),
  };

  useEffect(() => {
    fetch("http://localhost:8080/venueratings/venue/0006b62a-21bd-4e48-8fc7-e3bcca66d0d0/ratings")
      .then((response) => response.json())
      .then((json) => {
        setReviewDictList(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const starReview = () => {
    const emptyStars = Array(5).fill(stars.empty);

    return (
      <View style={styles.starContainer}>
        {emptyStars.map((star, index) => (
          <Image key={index} source={star} style={styles.star} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RatingReview", {
            navigation: navigation,
            venueName: venueName,
            venueAddress: venueAddress,
            venueType: venueType,
            venueCity: venueCity,
            username: "cam",
          })
        }
      >
        <View style={styles.rateReviewContainer}>
          <Text style={styles.rateReviewText}>Rate & Review </Text>
          {starReview()}
        </View>
      </TouchableOpacity>

      {/* Scrollable content */}
      <View>
        <ScrollView style={{height: 550}}>
          {reviewDictList.map((review, index) => (
            <View key={index} >
              <Review reviewDict={review} />
            </View>
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
    marginLeft: -25
  },
  rateReviewContainer: {
    paddingLeft: 20
  },
  rateReviewText: {
    color: "white",
    paddingBottom: 5
  },
  scrollView: {
    
  },
  scrollContent: {
    paddingBottom: 20, 
  },
  starContainer: {
    flexDirection: "row",
    flexGrow: 1
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 3,
  },
});

export default VenueReviews;
