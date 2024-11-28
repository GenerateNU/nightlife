import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useFormData } from "./FormDataContext";
import { API_DOMAIN, BEARER } from "@env";

export type RootStackParamList = {
  PersonalityScreenReveal: undefined;
  AddPhoto: undefined;
};

const PersonalityPreference = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [personality, setPersonality] = useState(null);
  const { formData } = useFormData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonality = async () => {
      try {
        const data = await fetch(`${API_DOMAIN}/profiles/${formData.email}`, {
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
        console.log("personalityData: ", personalityData);
        setPersonality(personalityData);
      } catch (error) {
        console.error("Network or server error:", error);
      } finally {
        setLoading(false);
      }
    };
    //   try {
    //     const response = await fetch(
    //       `${API_DOMAIN}/profiles/${formData.email}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${BEARER}`,
    //         },
    //       }
    //     );
    //     if (!response.ok) {
    //       throw new Error(
    //         `Failed to fetch user: HTTP status ${response.status}`
    //       );
    //     }
    //     const userInfo = await response.json();

    //     const userPreferences = {
    //       userId: userInfo.user_id,
    //       location: formData.location,
    //       nightlife: formData.nightlife,
    //       interests: formData.interests,
    //       crowdPreference: formData.crowdPreference,
    //       timePreference: formData.timePreference,
    //       frequency: formData.frequency,
    //       insideOrOutside: formData.insideOrOutside,
    //     };

    //     const prefResponse = await fetch(
    //       `${API_DOMAIN}/profiles/userCharacter`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${BEARER}`,
    //         },
    //         body: JSON.stringify(userPreferences),
    //       }
    //     );

    //     if (!prefResponse.ok) {
    //       throw new Error(
    //         `Failed to post preferences: HTTP status ${prefResponse.status}`
    //       );
    //     }
    //     const personalityData = await prefResponse.json();
    //     setPersonality(personalityData.personality);
    //   } catch (error) {
    //     console.error("Network or server error:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchPersonality();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  console.log("Personality: in frontend ", personality);
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
        source={{ uri: "https://i.ibb.co/4K0YbPp/image-2.png" }}
      />
      <Text style={styles.personalityName}>{personality}</Text>
      <Text style={styles.description}>{personality}</Text>
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
