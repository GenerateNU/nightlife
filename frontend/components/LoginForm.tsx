import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import onboardingStyles from "./OnboardingCards/onboardingStyles";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useFormData } from "./OnboardingCards/FormDataContext";

interface ValidationErrors {
  email?: string;
  password?: string;
}

export type RootStackParamList = {
  LoginForm: undefined;
  LoginOrSignup: undefined;
};

const LoginForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { updateFormData } = useFormData();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loginError, setLoginError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = async () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("sending request...");

    try {
      // to be replaced with API_DOMAIN from .env
      const res = await fetch(
        `http://127.0.0.1:8080/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        setLoginError(data.error.toString());
        console.log("Login failed:", data.error);
      } else {
        login(data.token);
      }
    } catch (err) {
      console.log("Login failed:", err);
      setLoginError("Login failed. Please try again.");
    }
  };

  const validateForm = (): boolean => {
    const validationErrors: ValidationErrors = {};
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email address.";
      isValid = false;
    }

    if (!password) {
      validationErrors.password = "This field is required.";
      isValid = false;
    } else if (password.length < 6) {
      validationErrors.password = "Must be at least 6 characters.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleLoginPress = () => {
    const isValid = validateForm();
    updateFormData({ email, password });
    if (isValid) handleLogin();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imghippo.com/files/sol3971PuQ.png' }}
      style={onboardingStyles.container}
    >
      <TouchableOpacity style={onboardingStyles.backButton} onPress={handleBack}>
        <Text style={onboardingStyles.buttonText}>Back</Text>
      </TouchableOpacity>

      <View style={onboardingStyles.mainContent}>
        <Text style={[onboardingStyles.title, { marginTop: 40 }]}>
          Log in
        </Text>

        <TextInput
          style={[styles.input, errors.email ? styles.inputError : undefined]}
          placeholder="Email or username"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.password ? styles.inputError : undefined]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity
          style={onboardingStyles.nextButton}
          onPress={handleLoginPress}
        >
          <Text style={onboardingStyles.nextButtonText}>Login</Text>
        </TouchableOpacity>

        {loginError && <Text style={styles.error}>{loginError}</Text>}
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  input: {
    height: 55,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    width: "100%",
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  inputError: {
    borderColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});


export default LoginForm;