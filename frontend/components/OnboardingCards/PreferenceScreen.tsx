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
const frequencyOptions = [
  "Every night",
  "A few times a week",
  "Once a week",
  "A couple of times a month",
  "Once a month",
  "Rarely (special occasions)",
  "Almost never",
];
const CrowdAndFrequencyPreference: React.FC = () => {
  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
    null
  );
  const [isCrowdOpen, setIsCrowdOpen] = useState(false);
  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const toggleCrowdOptions = () => setIsCrowdOpen((prev) => !prev);
  const toggleFrequencyOptions = () => setIsFrequencyOpen((prev) => !prev);
  const selectCrowd = (option: string) => {
    setSelectedCrowd(option);
    setIsCrowdOpen(false);
  };
  const selectFrequency = (option: string) => {
    setSelectedFrequency(option);
    setIsFrequencyOpen(false);
  };
  return (
    <View style={styles.container}>
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
      <Text style={styles.title}>
        What type of nightlife do you enjoy the most?
      </Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={toggleFrequencyOptions}
      >
        <Text style={styles.dropdownText}>
          {selectedFrequency || "Select Frequency"}
        </Text>
        <Text style={styles.arrow}>{isFrequencyOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {isFrequencyOpen && (
        <FlatList
          data={frequencyOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => selectFrequency(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.dropdown}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    padding: 20,
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
});
export default CrowdAndFrequencyPreference;
