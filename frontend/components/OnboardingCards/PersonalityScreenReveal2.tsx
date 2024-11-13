import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from '@react-navigation/native';


export type RootStackParamList = {
  PersonalityScreenReveal2: undefined; 
  PersonalityScreenReveal: undefined; 
}

const PersonalityPreference2:React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Your party personality type is...</Text>

        <View style={styles.pieChartContainer}>
          <FontAwesome name="pie-chart" size={150} color="#FFF" />
        </View>

        {/* Adjusted Mini Boxes Layout */}
        <View style={styles.attributesContainer}>
          <View style={styles.attributeItem}>
            <View style={styles.attributeBox}></View>
            <Text style={styles.attributeText}>Energetic</Text>
          </View>
          <View style={styles.attributeItem}>
            <View style={styles.attributeBox}></View>
            <Text style={styles.attributeText}>Loud</Text>
          </View>
          <View style={styles.attributeItem}>
            <View style={styles.attributeBox}></View>
            <Text style={styles.attributeText}>Vibrant</Text>
          </View>
          <View style={styles.attributeItem}>
            <View style={styles.attributeBox}></View>
            <Text style={styles.attributeText}>Youthful</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PersonalityScreenReveal')}
          style={styles.skipButton}
        >
          <Text style={styles.skipButtonText}>SKIP</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 80,
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

export default PersonalityPreference2;
