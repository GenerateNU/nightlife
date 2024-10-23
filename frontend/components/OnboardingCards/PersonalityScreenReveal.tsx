import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';


export type RootStackParamList = {
  PersonalityScreenReveal: undefined; 
  AddPhoto: undefined; 
}

const PersonalityPreference: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Your party personality type is...</Text>

      <Image
        style={styles.pieChartContainer}
        source={{ uri: "https://i.ibb.co/QcjgwmV/image-2.png" }}
      />

      <Text style={styles.personalityName}>Hip hop lover</Text>

      <Text style={styles.description}>
        You love vibrant parties with lots of dancing and energetic music. Your
        energy is best matched with the hip hop scene.
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("AddPhoto")}
        style={styles.skipButton}
      >
        <Text style={styles.skipButtonText}>SKIP</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#313131",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 100,
  },
  header: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: 60,
    color: "#FFF",
  },
  figureContainer: {
    marginBottom: 20,
  },
  personalityName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFF",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFF",
    marginBottom: 20,
  },
  pieChartContainer: {
    width: 300, 
    height: 300, 
    marginBottom: 20,
  },
  attributesContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  attributeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  attributeBox: {
    width: 15,
    height: 15,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
  },
  attributeText: {
    color: "#FFF",
  },
  skipButton: {
    marginTop: 20,
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PersonalityPreference;
