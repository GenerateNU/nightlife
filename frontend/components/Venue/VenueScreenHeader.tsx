import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ScaledText from "@/components/Venue/ScaledText";
import BookmarkButton from "@/components/Venue/BookmarkButton";
import StarReview from "@/components/Venue/StarReview";
import PersonaIcons from "./PersonaIcons";

type VenueHeaderProps = {
  venueName: string;
  venueType: string;
  venueAddress: string;
  venueCity: string;
  overallRating: number;
  priceRating: number;
  isOpen: boolean;
  venueID: string;
  userID: string;
};

/**
 * Header of venue screen - contains venue name, address, type, open/close status, price, etc
 */

const VenueHeader: React.FC<VenueHeaderProps> = ({
  venueName,
  venueType,
  venueAddress,
  venueCity,
  overallRating,
  priceRating,
  isOpen,
  venueID,
  userID,
}) => {
  // Capitalize first letter of venueType and make the rest lowercase
  const formattedVenueType = venueType.charAt(0).toUpperCase() + venueType.slice(1).toLowerCase();

  return (
    <View style={styles.header}>
      <View style={{marginLeft: 3}}> 
        <ScaledText
          text={venueName}
          maxFontSize={36}
          minFontSize={25}
          maxCharacters={20}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: "white", marginRight: 5, marginTop: 5}}>
          {formattedVenueType} | {venueAddress}, {venueCity}
        </Text>
        {/* eslint-disable-next-line */}
        <Image source={require('../../assets/share_button.png')} style={styles.buttonImage} />
        <BookmarkButton venueID={venueID} userID={userID} />
      </View>
      <View style={styles.review}>
        <Text style={styles.overallRating}> 
          {parseFloat(overallRating.toFixed(1))} 
        </Text>
        <StarReview rating={Math.floor(overallRating)} />
        <Text style={{ color: "white", paddingLeft: 10, fontWeight: "bold", fontSize: 15 }}>
          {" |     " + "$".repeat(priceRating)}
        </Text>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          {"      |     " + (isOpen ? "Open" : "Closed")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: '#060019',
  },
  review: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 4
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  overallRating: {
    textShadowColor: 'rgba(255, 255, 255, 1)', 
    textShadowOffset: { width: 0, height: 0 }, 
    textShadowRadius: 5,
    fontSize: 18, 
    color: "white", 
    marginTop: -1, 
    marginLeft: -3, 
    marginRight: 3
  }
});

export default VenueHeader;
