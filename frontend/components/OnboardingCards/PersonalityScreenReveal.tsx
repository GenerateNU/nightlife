import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import onboardingStyles from "./onboardingStyles";
import { useState, useEffect } from "react";
import { useFormData } from "./FormDataContext";
import { API_DOMAIN, BEARER } from "@env";

export type RootStackParamList = {
  PersonalityScreenReveal: undefined;
  BottomNavigator: undefined;
};

interface CharacterImages {
  [key: string]: string;
}

const PersonalityPreference = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [personality, setPersonality] = useState(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { formData } = useFormData();
  const [loading, setLoading] = useState(true);
  const characters: CharacterImages = {
    Serafina: 'https://i.ibb.co/C0D7DLw/serafina.png',
    Buckley: 'https://i.ibb.co/sbfpyBt/buckley.png',
    Roux: 'https://i.ibb.co/drZ8sDX/roux.png',
    Sprig: 'https://i.ibb.co/f12bhHb/sprig.png',
    Blitz: 'https://i.ibb.co/Bq7LVbb/blitz.png',
    Lumi: 'https://i.ibb.co/2d02Gbd/lumi.png',
    Plumehart: 'https://i.ibb.co/9y7MvY4/plumehart.png',
    MERMAID: 'https://i.ibb.co/9y7MvY4/plumehart.png'
  };

  useEffect(() => {
    const fetchPersonality = async () => {
      try {
        const email = formData.email;
        console.log("email: ", email);
        const data = await fetch(`${API_DOMAIN}/profiles/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER}`,
          },
        });
        if (!data.ok) {
          throw new Error(`Failed to fetch user: HTTP status ${data.status}`);
        }
        const userInfo = await data.json();

        const response = await fetch(
          `${API_DOMAIN}/profiles/userCharacter/${userInfo.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${BEARER}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch user: HTTP status ${response.status}`
          );
        }
        console.log("response: ", response);
        const personalityData = await response.json();
        setPersonality(personalityData);
        setImageUrl(characters[personalityData]);
        console.log("personalityData: ", personalityData);
        setPersonality(personalityData);
      } catch (error) {
        console.error("Network or server error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonality();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  console.log("Personality: in frontend ", personality);

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={onboardingStyles.container}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Your party personality type is...</Text>
        <Image style={styles.pieChartContainer} source={{ uri: imageUrl }} />
        <Text style={styles.personalityName}>{personality && personality}</Text>
        <Text style={styles.description}>
          Based on your responses, you are most like{" "}
          {personality}!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("BottomNavigator")}
          style={styles.skipButton}
        >
          <Text style={styles.skipButtonText}>NEXT</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingTop: 20,
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