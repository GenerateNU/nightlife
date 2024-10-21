import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
const crowdOptions = [
  "Young professionals",
  "College students",
  "Mature crowd",
  "Mixed age groups",
  "Tourists",
  "Locals",
  "Trendy/Social influencers",
  "Relaxed/Casual",
  "Energetic/Partygoers",
  "Exclusive/VIP",
];

const CrowdAndFrequencyPreference: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null);

  const [isCrowdOpen, setIsCrowdOpen] = useState(false);
  const toggleCrowdOptions = () => setIsCrowdOpen((prev) => !prev);
  const selectCrowd = (option: string) => {
    setSelectedCrowd(option);
    setIsCrowdOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        What type of nightlife do you enjoy the most?
      </Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={toggleCrowdOptions}
      >
        <Text style={styles.dropdownText}>
          {selectedCrowd || "Select Crowd Type"}
        </Text>
        <Text style={styles.arrow}>{isCrowdOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {isCrowdOpen && (
        <FlatList
          data={crowdOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => selectCrowd(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.dropdown}
        />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("NextScreen")}
        style={styles.skipButton}
      >
        <Text style={styles.skipButtonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 80,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 10,
  },
  dropdownButton: {
    backgroundColor: "#414141",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 18,
  },
  arrow: {
    color: "#fff",
    fontSize: 18,
  },
  dropdown: {
    backgroundColor: "#515151",
    borderRadius: 5,
    marginBottom: 20,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#414141",
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
  },
  skipButton: {
    marginTop: 20,
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
export default CrowdAndFrequencyPreference;
