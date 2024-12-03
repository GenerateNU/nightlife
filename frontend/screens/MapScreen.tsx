import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import SearchBar from "@/components/Map/SearchBar";
import BottomModal from "@/components/Map/BottomModal";
import { API_DOMAIN } from "@env";
import { Venue } from "@/types/Venue";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const MapScreen: React.FC = () => {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { accessToken } = useAuth();

  const mapCustomStyle = [ { "elementType": "geometry", "stylers": [ { "color": "#242f3e" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#746855" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#242f3e" } ] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#263c3f" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#6b9a76" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#38414e" } ] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "color": "#212a37" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#9ca5b3" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#746855" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#1f2835" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#f3d19c" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#2f3948" } ] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#17263c" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#515c6d" } ] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#17263c" } ] } ]

  const getAllVenues = async (): Promise<Venue[] | null> => {
    if (!accessToken) {
      console.log("No access token available");
      return null;
    }

    try {
      const res = await fetch(`${API_DOMAIN}/venues`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.statusText}`);
      }

      const data: Venue[] = await res.json();
      return data;
    } catch (err) {
      console.log("Could not connect to db or something", err);
      return null;
    }
  };

  useEffect(() => {
    getAllVenues().then((venues) => {
      if (venues) {
        setAllVenues(venues);
      } else {
        console.log("Unable to get all venues");
      }
    });
  }, [accessToken]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <BottomModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        venues={allVenues} 
      />
      <SearchBar placeholderText={"Search venues..."} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.3601,
          longitude: -71.0589,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        userInterfaceStyle="dark"
        customMapStyle={mapCustomStyle}
      >
        {allVenues.length > 0 &&
          allVenues.map((v) => (
            <Marker
              key={v.venue_id}
              coordinate={{
                latitude: v.latitude,
                longitude: v.longitude,
              }}
              title={v.name}
              description={v.address}
            />
          ))}
      </MapView>
      
      {/* Circular button to toggle modal visibility */}
      <TouchableOpacity style={styles.circularButton} onPress={toggleModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  circularButton: {
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
});

export default MapScreen;
