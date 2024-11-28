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
import { useFormData } from "./FormDataContext";

export type RootStackParamList = {
  UserFormP2: undefined;
  UserFormP1: undefined;
};

type NavigationType = {
  navigate: (screen: keyof RootStackParamList) => void;
};

const UserFormP1: React.FC = () => {
  const { formData, updateFormData } = useFormData();
  const navigation = useNavigation<NavigationType>();
  const [name, setName] = useState<string>(formData.name);
  const [email, setEmail] = useState<string>(formData.email);
  const [password, setPassword] = useState<string>(formData.password);

  const handleSubmit = () => {
    updateFormData({ name, email, password });
    navigation.navigate("UserFormP2");
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imghippo.com/files/sol3971PuQ.png" }}
      style={styles.container}
    >
      <View style={styles.crowdMainContent}>
        <Text style={styles.title}>
          To get started, we need a few basics...
        </Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ccc"
        />
        <Button title="Next" onPress={handleSubmit} color="white" />
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

export default UserFormP1;
