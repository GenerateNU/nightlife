import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { UploadImage } from "@/components/Venue/UploadImage";
import Slider from '@react-native-community/slider';
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import stars from "@/components/Venue/Stars";
type RootStackParamList = {
  Home: undefined;
  RateReviews: {
    venueName: string;
    venueAddress: string;
    venueType: string;
    venueCity: string;
    username: string;
  };
};

type ReviewScreenProps = {
  route: RouteProp<RootStackParamList, "RateReviews">;
};

/**
 * Allows the user to submit a *generic* review (i.e. overall rating, image, summary review)
 * @param route venue- & user- specific info
 * @param navigation project navigation
 * @returns screen for reviewing
 */

const RateReviewScreen: React.FC<ReviewScreenProps> = ({ route, navigation }) => {
  const { venueName, venueAddress, venueType, venueCity, username } = route.params;
  const [userInput, setUserInput] = useState("");
  const [rating, setRating] = useState(0); 
  const [imageURI, setImageURI] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(1);

  const labels = ['$', '$$', '$$$', '$$$$', '$$$$$'];

  // on-click handler for star review 
  const handleStarPress = (index: number) => {
    setRating(index + 1); 
  };

  // star review 
  const starReview = () => {
    return (
      <View style={styles.starContainer}>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <Image
              key={index}
              source={index < rating ? stars.full : stars.empty}
              style={styles.star}
              onTouchStart={() => handleStarPress(index)} 
            />
          ))}
      </View>
    );
  };

  // collect user input for review text
  const handleInputChange = (text: string) => {
    setUserInput(text);
  };

  // collect user input for image
  const handleImageUpload = (uri: string | null) => {
    setImageURI(uri); 
  };

  const saveReviews = async () => {
    // collect all info to post to db
    const reviewData = {
      overall_rating: rating, 
      energy_rating: null,
      mainstream_rating: null,
      price_rating: (sliderValue * 2),
      crowd_rating: null,
      hype_rating: null,
      exclusive_rating: null,
      review_text: userInput,
      venue_id: "0006b62a-21bd-4e48-8fc7-e3bcca66d0d0",
      user_id: "26d636d9-f8b0-4ad7-be9c-9b98c4c8a0c4",
      image_path: imageURI
    };
    
    try {
      const response = await fetch(
        `http://localhost:8080/userratings/user/${reviewData.user_id}/${reviewData.venue_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Review submitted successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Error submitting review:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginLeft: 20, marginTop: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Venue')}>
          <Text style={{color: 'white'}}>Back</Text>
        </TouchableOpacity>
        
        <Text style={{fontSize: 36, color: 'white'}}>{venueName}</Text>
        <Text style={{fontSize: 12, color: 'white'}}>{venueType} | {venueAddress}, {venueCity} </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: 'white'}}>{username}</Text>
          <View style={{marginTop: 5, marginLeft: 4}}>
            <Feather name="eye" size={13} color="white" />
          </View>
        </View>
        
        {starReview()}
        
        <Text style={{paddingTop: 10, paddingBottom: 1, fontSize: 12, color: 'white'}}>Label</Text>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={handleInputChange}
          placeholder="Enter your review here..."
          placeholderTextColor="gray"
        />
        
        <UploadImage onImageUpload={handleImageUpload} />
        
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#CCCCCC"
          thumbTintColor="#FFFFFF"
        />
        
        <View style={styles.markers}>
          {labels.map((label, index) => (
            <Text key={index} style={styles.marker}>
              {label}
            </Text>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={saveReviews}>
            <Text style={styles.saveButton}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

RateReviewScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      venueName: PropTypes.string.isRequired,
      venueAddress: PropTypes.string.isRequired,
      venueType: PropTypes.string.isRequired,
      venueCity: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#060019"
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    alignContent: 'center',
    marginLeft: -15
  },
  star: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  input: {
    height: 100,
    width: 350,
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    padding: 15,
    textAlignVertical: 'top', // Ensures the text starts at the top
  },
  saveButton: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    width: 350
  },
  label: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  slider: {
    width: 350,
    height: 40,
  },
  
  markers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
    marginLeft: 10
  },
  marker: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default RateReviewScreen;