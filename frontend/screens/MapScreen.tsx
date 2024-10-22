import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import SearchBar from "@/components/SearchBar";

interface Venue {
  venue_id: string;

  name: string;

  address: string;

  city: string;

  state: string;

  zipcode: string;

  longitude: number;

  latitude: number;

  // VenueType string `json:"venue_type"`

  created_at: string;

  //UpdatedAt time.Time `json:"updated_at"`
}

const MapScreen: React.FC = () => {
  const getAllVenues = async () => {
    try {
      // to be replaced with API_DOMAIN from .env
      const res = await fetch(
        `https://ringtail-winning-shark.ngrok-free.app/venues/getAll`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.error) {
        console.log("Cannot fetch venue data", data.error);
      } else {
        const venues: Venue[] = JSON.parse(data);
        return venues;
      }
    } catch (err) {
      console.log("Could not connect to db or something", err);
    }
  };

  let allVenues: Venue[] = [];
  getAllVenues().then((venues) => {
    if (venues) {
      allVenues = venues;
    } else {
      console.log("Unable to get all venues");
    }
  });

  return (
    <View style={styles.container}>
      <SearchBar />
      <MapView
        style={styles.map}
        initialRegion={{
          // Boston
          latitude: 42.3601,
          longitude: -71.0589,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {allVenues.map((v) => (
          <Marker
            coordinate={{
              latitude: v.latitude,
              longitude: v.longitude,
            }}
            title={v.name}
            description="LOLL I DIDNT GET THIS YET"
          />
        ))}
      </MapView>
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
});

export default MapScreen;
