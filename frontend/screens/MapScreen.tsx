import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import { BEARER, API_DOMAIN } from "@env";
import { Venue } from "@/types/Venue";

const MapScreen: React.FC = () => {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);

  const getAllVenues = async (): Promise<Venue[] | null> => {
    try {
      const res = await fetch(
        `${API_DOMAIN}/venues/getAll`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER}`,
          },
        }
      );

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
  }, []);

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
