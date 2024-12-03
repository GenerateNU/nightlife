import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Toast from "react-native-toast-message";

const BookmarkButton = ({ venueID = "", userID = "" }) => {
  const bookmarkVenue = async () => {
    const bookmarkData = {
      venue_id: venueID,
      user_id: userID,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/bookmarks/${venueID}/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookmarkData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Bookmark submitted successfully:", data);

        Toast.show({
          type: "success",
          text1: "Bookmark Saved!",
          text2: "The venue has been successfully bookmarked.",
          visibilityTime: 2000,
        });
      } else {
        const errorData = await response.json();
        console.error("Error submitting review:", errorData);

        Toast.show({
          type: "error",
          text1: "Error Saving Bookmark",
          text2: "Unable to save the venue. Please try again.",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);

      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "An error occurred. Please check your connection.",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={bookmarkVenue}>
        <Image
          source={require("../assets/bookmark_button.png")}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

BookmarkButton.propTypes = {
  venueID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  buttonImage: {
    width: 30,
    height: 30,
  },
});

export default BookmarkButton;
