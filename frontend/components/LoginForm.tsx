import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import useFormValidation from "@/hooks/formValidation";
import useLogin from "@/hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, validate } = useFormValidation(email, password);
  const { handleLogin, loginError } = useLogin(email, password);

  const handleLoginPress = () => {
    const isValid = validate();
    if (isValid) handleLogin();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="john.doe@example.com"
        placeholderTextColor={"lightgray"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="****************"
        placeholderTextColor={"lightgray"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.message && <Text style={styles.error}>{errors.message}</Text>}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLoginPress}
      >
        <Text style={styles.buttonText}>Explore Nightlife</Text>
      </TouchableOpacity>

      {loginError && <Text style={styles.error}>{loginError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    height: 55,
    borderColor: "#007bff",
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 15,
    width: 300,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#475569",
    fontFamily: "Archivo_500Medium",
    color: "white",
  },
  buttonContainer: {
    marginTop: 6,
    marginBottom: 20,
    width: 300,
    borderRadius: 12,
    backgroundColor: "#007bff",
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Archivo_700Bold",
  },
  error: {
    color: "#de6a74",
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Archivo_700Bold",
  },
});

export default LoginForm;
