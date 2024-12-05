import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Toast from 'react-native-root-toast'

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
        Toast.show("Venue Bookmarked!", {
          duration: 800, 
          position: Toast.positions.BOTTOM, 
          backgroundColor: "#ffffff", 
          textColor: "#000000", 
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      
        
      } else {
        const errorData = await response.json();
        console.error("Error submitting review:", errorData);

      }
    } catch (error) {
      console.error("Error:", error);

    }
  };

  return (
    <View>
      <TouchableOpacity onPress={bookmarkVenue}>
        <Image
          // eslint-disable-next-line
          source={require("../../assets/bookmark_button.png")}
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
