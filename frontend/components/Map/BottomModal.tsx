import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavProps } from "@/types/NavigationTypes";

const { height: screenHeight } = Dimensions.get("window");

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
  venues: Array<{ venue_id: string; name: string; address: string }>;
}

const BottomModal: React.FC<BottomModalProps> = ({
  visible,
  onClose,
  venues,
}) => {
  const navigation = useNavigation<BottomTabNavProps>();

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

            <FlatList
              data={venues}
              keyExtractor={(item) => item.venue_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onClose();
                    navigation.navigate("Venue", { venue: item });
                  }}
                >
                  <View style={styles.venueItem}>
                    <Text style={styles.venueName}>{item.name}</Text>
                    <Text style={styles.venueAddress}>{item.address}</Text>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
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
    height: screenHeight * 0.5,
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
    fontFamily: "Archivo_700Bold"
  },
  listContent: {
    paddingBottom: 20,
  },
  venueItem: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  venueName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Archivo_700Bold"
  },
  venueAddress: {
    color: "#bbb",
    fontSize: 14,
    fontFamily: "Archivo_500Medium"
  },
});

export default BottomModal;
