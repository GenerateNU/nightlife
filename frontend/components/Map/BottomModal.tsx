import React from "react";
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import { Venue } from "@/types/Venue";

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
  venue: Venue | null;
}

const BottomModal: React.FC<BottomModalProps> = ({ visible, onClose, venue }) => {
  if (!venue) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.tabIndicator} />
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text style={styles.venueDetails}>
              {venue.address}
            </Text>
            {/* <Text style={styles.rating}>⭐ {venue.rating} | 💲{venue.price}</Text> */}
            {/* <Text style={styles.status}>
              {venue.isOpen ? "Open Now" : "Closed"}
            </Text> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 8,
    borderRadius: 2,
  },
  venueName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  venueDetails: {
    fontSize: 14,
    color: "#bbb",
    marginVertical: 4,
  },
  rating: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 4,
  },
  status: {
    fontSize: 14,
    // color: venue.isOpen ? "#4caf50" : "#f44336",
  },
});

export default BottomModal;
