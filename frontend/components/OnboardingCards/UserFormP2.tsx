import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormData } from "./FormDataContext"; // Assuming this is the correct path

export type RootStackParamList = {
  UserFormP2: undefined;
  UserFormP3: undefined;
};

// Define navigation type based on the navigation stack
type NavigationType = {
  navigate: (screen: keyof RootStackParamList) => void;
};

const UserFormP2: React.FC = () => {
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationType>();

  const [username, setUsername] = useState<string>(formData.username || "");
  const [pronouns, setPronouns] = useState<string>(formData.pronouns || "");

  const handleSubmit = () => {
    updateFormData({ username, pronouns });
    console.log("Submitted Info:", { username, pronouns });
    navigation.navigate("UserFormP3");
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={styles.container}
    >
      <View style={styles.crowdMainContent}>
        <Text style={styles.title}>Let’s get that profile going...</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Pronouns"
          placeholderTextColor="#ccc"
          secureTextEntry={false} // Assuming pronouns do not require secure text entry
          value={pronouns}
          onChangeText={setPronouns}
        />
        <Button title="Submit" onPress={handleSubmit} color="white" />
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
    width: "100%",
    color: "white",
    fontSize: 36,
    fontFamily: "DT Nightingale",
    fontWeight: "300",
    lineHeight: 39.6,
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: "Archivo",
    color: "black",
  },
});

export default UserFormP2;
