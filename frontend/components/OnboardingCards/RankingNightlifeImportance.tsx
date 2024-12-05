import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormData } from "./FormDataContext";
import ProgressBar from './ProgressBar';
import onboardingStyles from "./onboardingStyles";

const priorities = [
  "Ambience and Vibe",
  "Drink Selection and Service",
  "Crowd and Social Atmosphere",
  "Location",
  "Music Quality & DJ",
  "Cost / Cover charge",
];

export type RootStackParamList = {
  RankingNightlife: undefined;
  CrowdPreference: undefined;
};

type NavigationType = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

const RankingNightlife: React.FC = () => {
  const { updateFormData } = useFormData();
  const navigation = useNavigation<NavigationType>();
  const [items, setItems] = useState<string[]>(priorities);
  const [progress, setProgress] = useState(0.2);

  const moveItem = (index: number, direction: "up" | "down") => {
    const newItems = Array.from(items);
    if (direction === "up" && index > 0) {
      [newItems[index], newItems[index - 1]] = [
        newItems[index - 1],
        newItems[index],
      ];
    } else if (direction === "down" && index < items.length - 1) {
      [newItems[index], newItems[index + 1]] = [
        newItems[index + 1],
        newItems[index],
      ];
    }
    setItems(newItems);
    updateFormData({ interests: newItems });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    console.log("Final order of priorities:", items);
    navigation.navigate("CrowdPreference");
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={onboardingStyles.container}
    >
      <Text style={onboardingStyles.topTitle}>ABOUT ME</Text>
      <TouchableOpacity
        style={onboardingStyles.backButton}
        onPress={handleBack}
      >
        <Text style={onboardingStyles.buttonText}>Back</Text>
      </TouchableOpacity>

      <View style={onboardingStyles.mainContent}>
        <ProgressBar progress={progress} />
        <Text style={onboardingStyles.title}>
          What matters most on{"\n"}a night out?
        </Text>
        <Text style={styles.subTitle}>Rank your priorities</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => moveItem(index, "up")}
                style={styles.button}
              >
                <Text>↑</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => moveItem(index, "down")}
                style={styles.button}
              >
                <Text>↓</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          onPress={handleSubmit}
          style={onboardingStyles.nextButton}
        >
          <Text style={onboardingStyles.nextButtonText}> Next </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  crowdMainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontFamily: "DT Nightingale",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  itemText: {
    fontSize: 18,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    marginLeft: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
});

export default RankingNightlife;
