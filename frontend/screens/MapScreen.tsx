import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchBar from "@/components/Map/SearchBar";
import { API_DOMAIN } from "@env";
import { Venue } from "@/types/Venue";
import { useAuth } from "@/context/AuthContext";

const MapScreen: React.FC = () => {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const { accessToken } = useAuth();
  const modalRef = React.useRef<Modalize>(null);

  const fetchVenues = async (): Promise<void> => {
    if (!accessToken) {
      console.log("No access token available");
      return;
    }

    try {
      const res = await fetch(`${API_DOMAIN}/venues/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data: Venue[] = await res.json();
      setAllVenues(data);
    } catch (err) {
      console.error("Failed to fetch venues:", err);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [accessToken]);

  const handleMarkerPress = (venue: Venue) => {
    setSelectedVenue(venue);
    modalRef.current?.open(); // Open the modal
  };

  const handleToggleModal = () => {
    setSelectedVenue(null); // Clear selected venue
    modalRef.current?.open(); // Open the modal in "list" mode
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Floating Search Bar */}
        <SearchBar />

        {/* Map */}
        <MapView
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
              coordinate={{ latitude: venue.latitude, longitude: venue.longitude }}
              title={venue.name}
              description={venue.address}
              onPress={() => handleMarkerPress(venue)}
            />
          ))}
        </MapView>

        {/* Toggle Button */}
        <TouchableOpacity style={styles.toggleButton} onPress={handleToggleModal}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        {/* Bottom Modal */}
        <Modalize
          ref={modalRef}
          snapPoint={200} // Start height of the modal
          modalHeight={600} // Max height when fully expanded
          handlePosition="inside"
        >
          {selectedVenue ? (
            // Selected Venue View
            <View style={styles.modalContent}>
              <Text style={styles.venueName}>{selectedVenue.name}</Text>
              <Text style={styles.venueDetails}>
                {selectedVenue.address}, {selectedVenue.city}, {selectedVenue.state}
              </Text>
              {/* <Text style={styles.rating}>⭐ {selectedVenue.total_rating}</Text> */}
              {/* <Text style={styles.price}>💲 {selectedVenue.price}</Text> */}
            </View>
          ) : (
            // Venue List View
            <View style={styles.modalContent}>
              <Text style={styles.listTitle}>All Venues</Text>
              {allVenues.map((venue) => (
                <TouchableOpacity
                  key={venue.venue_id}
                  onPress={() => handleMarkerPress(venue)}
                  style={styles.venueItem}
                >
                  <Text style={styles.venueName}>{venue.name}</Text>
                  <Text style={styles.venueAddress}>{venue.address}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
    backgroundColor: "#1c1c1e",
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
  modalContent: {
    padding: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  venueItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  venueName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  venueAddress: {
    fontSize: 14,
    color: "#555",
  },
  venueDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default MapScreen;
