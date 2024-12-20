import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchBar from "@/components/Map/SearchBar";
import { Image } from "react-native";
import { API_DOMAIN } from "@env";
import { Venue } from "@/types/Venue";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import HomeScreen from "./HomeScreen";
import EventCard from "./explore/EventCard";
import CustomMarkerImage from "@/assets/custom-marker.png";
import RatingStarImage from "@/assets/rating-star.png";
import { useNavigation } from "@react-navigation/native";

const MapScreen: React.FC = () => {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [mapKey, setMapKey] = useState(0);
  const { user, accessToken } = useAuth();
  const modalRef = React.useRef<Modalize>(null);

  const fetchVenues = async (): Promise<void> => {
    if (!accessToken || !user?.location) {
      console.log("No access token available or user location available");
      return;
    }

    try {
      const locationRes = await fetch(
        `${API_DOMAIN}/profiles/${user.user_id}/location`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!locationRes.ok)
        throw new Error(
          `Error fetching user location: ${locationRes.statusText}`
        );
      const { latitude, longitude } = await locationRes.json();
      // Fetch venues by location
      const radius = 80000; // 80,000 meters (80 km)
      const venuesRes = await fetch(
        `${API_DOMAIN}/venues/location?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
        // `${API_DOMAIN}/venues`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!venuesRes.ok) {
        throw new Error(`Error fetching venues: ${venuesRes.statusText}`);
      }
      const venues: Venue[] = await venuesRes.json();
      console.log(venues[1]);

      setAllVenues(venues);
      setMapKey((prevKey) => prevKey + 1);
    } catch (err) {
      console.error("Failed to fetch venues by location:", err);
    }
  };

  const getPriceRepresentation = (price: number | undefined): string => {
    // Fallback to 1 star if price is undefined or 0
    if (!price || price === 0) {
      return "$";
    }
    // Return the correct number of dollar signs
    return "$".repeat(price);
  };

  useEffect(() => {
    fetchVenues();
  }, [accessToken, user?.location]);

  const handleMarkerPress = (venue: Venue) => {
    setSelectedVenue(venue);
    modalRef.current?.open();
  };

  const handleToggleModal = () => {
    setSelectedVenue(null);
    modalRef.current?.open();
  };

  // Get the current day of the week for displaying venue hours
  const getCurrentDayHours = (venue: Venue): string | number => {
    const days = [
      "monday_hours",
      "tuesday_hours",
      "wednesday_hours",
      "thursday_hours",
      "friday_hours",
      "saturday_hours",
      "sunday_hours",
    ];
    const today = new Date().getDay();
    const dayKey = days[today - 1] as keyof Venue;

    if (venue[dayKey] == "NULL") {
      return "Hours not available";
    }

    return venue[dayKey] || "Hours not available";
  };

  const navigation = useNavigation();

  const handleSearch = async (text: string) => {
    const req = await fetch(`${API_DOMAIN}/venues/search?q=${encodeURIComponent(text)}`);

    if (!req.ok) {
      console.error("Failed to search for venues");
      return;
    }

    const res = await req.json();
    navigation.navigate("VenueCards", { venues: res });
  };

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>

        <SearchBar placeholderText="Search for venues..." icon={true} onSubmitEditing={handleSearch} />

        <MapView
          key={mapKey}
          style={styles.map}
          initialRegion={{
            latitude: 42.3601,
            longitude: -71.0589,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          userInterfaceStyle="dark"
        >
          {allVenues.map((venue) => (
            <Marker
              key={venue.venue_id}
              coordinate={{
                latitude: venue.latitude,
                longitude: venue.longitude,
              }}
              title={venue.name}
              description={venue.address}
              onPress={() => handleMarkerPress(venue)}
            >
              <View style={styles.customMarker}>
                <Image
                  source={CustomMarkerImage}
                  style={styles.markerImage}
                  resizeMode="contain"
                />
                {/* <LocationIcon/> */}
              </View>
            </Marker>
          ))}
        </MapView>

        {/** TODO: Fix button loading time */}
        {/* Toggle Button */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={handleToggleModal}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        {/* Bottom Modal */}
        <Modalize
          ref={modalRef}
          snapPoint={175}
          modalHeight={600}
          handlePosition="inside"
          modalStyle={styles.modalBackground}
          handleStyle={styles.handleStyle}
        >
          {selectedVenue ? (
            // Selected Venue View
            // TODO: Match fonts to figma
            <View style={styles.modalContent}>
              {/* Venue Title with Glow */}
              <Text style={styles.venueName}>
                {selectedVenue.name || "Unknown Venue"}
              </Text>

              {/* Venue Details */}
              <Text style={styles.venueDetails}>
                Venue type | {selectedVenue.city || "N/A"},{" "}
                {selectedVenue.state || "N/A"}
              </Text>

              {/* Rating Container */}
              {/** TODO: Map venue data to star rating, money sign, open status. */}
              <View style={styles.ratingContainer}>
                {/* Stand-in Rating */}
                <Text style={styles.standInRating}>
                  {selectedVenue.total_rating}
                </Text>

                {/* Star Icon */}
                <Image
                  source={RatingStarImage}
                  style={styles.ratingStar}
                  resizeMode="contain"
                />

                {/* Divider */}
                <Text style={styles.divider}>|</Text>

                {/* Money Sign */}
                <Text style={styles.moneySign}>
                  {getPriceRepresentation(selectedVenue?.price)}
                </Text>

                {/* Divider */}
                <Text style={styles.divider}>|</Text>

                {/* Hours for the Day */}
                <Text style={styles.statusText}>
                  {getCurrentDayHours(selectedVenue)}
                </Text>
              </View>

              {/* Centered EventCard */}
              <View style={styles.eventCardContainer}>
                <EventCard
                  key={selectedVenue.venue_id}
                  image={
                    "https://academy.la/wp-content/uploads/2024/06/best-club-near-me-hollywood-1024x576.webp"
                  }
                  title={selectedVenue.name}
                  subtitle={`${selectedVenue.city}, ${selectedVenue.state}`}
                  accent={"#2d2d44"}
                  venue_id={selectedVenue.venue_id}
                />
              </View>
            </View>
          ) : (
            <HomeScreen showSearchBar={false} />
          )}
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  toggleButton: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: [{ translateX: -30 }],
    width: 60,
    height: 60,
    backgroundColor: "#3a3a54",
    borderWidth: 2,
    borderColor: "#5656a6",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalBackground: {
    backgroundColor: "#1E1E2C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleStyle: {
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 5,
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  modalContent: {
    padding: 20,
    paddingTop: 35,
  },
  venueName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 5,
  },
  venueDetails: {
    fontSize: 16,
    color: "#CCCCCC",
    marginBottom: 10,
  },
  ratingGlow: {
    fontSize: 24,
    color: "#FFD700",
    textShadowColor: "rgba(255, 215, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginRight: 10,
  },
  priceText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  venueItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  venueAddress: {
    fontSize: 14,
    color: "#BBBBBB",
  },
  customMarker: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  markerImage: {
    width: "100%",
    height: "100%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  standInRating: {
    fontSize: 18,
    color: "#FFFFFF",
    marginRight: 5,
  },
  ratingStar: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  divider: {
    fontSize: 18,
    color: "#FFFFFF",
    marginHorizontal: 5,
  },
  moneySign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginHorizontal: 5,
  },
  statusText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 5,
  },
  eventCardContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default MapScreen;
