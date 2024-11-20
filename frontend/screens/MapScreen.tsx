import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import SearchBar from "@/components/Map/SearchBar";
import BottomModal from "@/components/Map/BottomModal";
import Modal from "react-native-modal";
import { API_DOMAIN } from "@env";
import { Venue } from "@/types/Venue";
import { useAuth } from "@/context/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MapScreen: React.FC = () => {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const { accessToken } = useAuth();
  const insets = useSafeAreaInsets();

  const getAllVenues = async (): Promise<Venue[] | null> => {
    if (!accessToken) {
      console.log("No access token available");
      return null;
    }

    try {
      const res = await fetch(`${API_DOMAIN}/venues/getAll`, {
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

  const handleMarkerPress = (venue: Venue) => {
    setSelectedVenue(venue);
    setInfoModalVisible(true);
    setModalVisible(false);
  };

  const toggleMainModal = () => {
    setModalVisible(!isModalVisible);
    setInfoModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BottomModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        venues={allVenues}
      />
      <SearchBar />
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
              onPress={() => handleMarkerPress(v)}
            />
          ))}
      </MapView>

      <Modal
        isVisible={isInfoModalVisible}
        onSwipeComplete={() => setInfoModalVisible(false)}
        swipeDirection="down"
        style={[styles.infoModal, { marginBottom: insets.bottom }]} // Adjust modal position
      >
        {selectedVenue && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>{selectedVenue.name}</Text>
            <Text style={styles.infoDescription}>{selectedVenue.address}</Text>
            <TouchableOpacity
              onPress={() => setInfoModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>

      <TouchableOpacity style={styles.circularButton} onPress={toggleMainModal}>
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
  infoModal: {
    justifyContent: "flex-end",
    margin: 0,
    paddingBottom: 60,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    padding: 5,
  },
  closeButtonText: {
    fontSize: 14,
    color: "#007BFF",
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
