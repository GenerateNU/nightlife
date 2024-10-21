import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import SearchBar from "@/components/SearchBar";

const MapScreen: React.FC = () => {
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
        <Marker
          coordinate={{
            latitude: 42.3496,
            longitude: -71.0785,
          }}
          title="The Bell in Hand Tavern"
          description="Oldest tavern in America"
        />
        <Marker
          coordinate={{
            latitude: 42.3472,
            longitude: -71.0836,
          }}
          title="Coppersmith"
          description="Rooftop bar with a great view"
        />
        <Marker
          coordinate={{
            latitude: 42.3506,
            longitude: -71.0665,
          }}
          title="The Tam"
          description="Iconic dive bar in Boston"
        />
        <Marker
          coordinate={{
            latitude: 42.3486,
            longitude: -71.0821,
          }}
          title="Loretta's Last Call"
          description="Country-themed bar with live music"
        />
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
