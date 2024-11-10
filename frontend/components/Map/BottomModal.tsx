import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
}

const BottomModal: React.FC<
  BottomModalProps & { isPartiallyVisible: boolean }
> = ({ visible, isPartiallyVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View
            style={[
              styles.modalContainer,
              isPartiallyVisible && styles.partialView,
            ]}
          >
            <View style={styles.tabIndicator} />

            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Sort</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Price</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Easy Access</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Highly Rated</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Happening Today</Text>
            <View style={styles.contentContainer}>
              <View style={styles.eventBox}>{/* Event content here */}</View>
              <View style={styles.eventBox}>{/* Event content here */}</View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#1c1c1e",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: screenHeight * 0.4,
  },
  partialView: {
    marginTop: screenHeight * 0.6,
  },
  tabIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 8,
    borderRadius: 2,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventBox: {
    width: "48%",
    height: 100,
    backgroundColor: "#2c2c2e",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomModal;