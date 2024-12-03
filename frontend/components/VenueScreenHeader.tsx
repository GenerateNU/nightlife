import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScaledText from "@/components/ScaledText";
import BookmarkButton from "@/components/BookmarkButton";
import StarReview from "@/components/StarReview";

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
  return (
    <View style={styles.header}>

      <ScaledText
        text={venueName}
        maxFontSize={36}
        minFontSize={25}
        maxCharacters={20}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: "white", fontFamily: "DTNightingale-Light" }}>{venueType} | {venueAddress}, {venueCity}</Text>
        {/* <Image source={require('../assets/share_button.png')} style={styles.buttonImage} /> */}
        <BookmarkButton venueID={venueID} userID={userID} />
      </View>
      <View style={styles.review}>
        <Text style={{ color: "white" }}> {parseFloat(overallRating.toFixed(1))} </Text>
        <StarReview rating={Math.floor(overallRating)} />
        <Text style={{ color: "white", paddingLeft: 10, fontWeight: "bold", fontSize: 15 }}>
          {" |     " + "$".repeat(Math.round(priceRating / 10))}
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
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});

export default VenueHeader;
