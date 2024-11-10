import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
}

const BottomModal: React.FC<BottomModalProps> = ({ visible, onClose }) => {
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

            <Text style={styles.sectionTitle}>Happening Today</Text>
            <View style={styles.contentContainer}>
              <View style={styles.eventBox}>
                <Text style={{ color: "#fff" }}>Event 1</Text>
              </View>
              <View style={styles.eventBox}>
                <Text style={{ color: "#fff" }}>Event 2</Text>
              </View>
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
  tabIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 8,
    borderRadius: 2,
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
