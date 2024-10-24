import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/context/AuthContext";

interface ValidationErrors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loginError, setLoginError] = useState<string | null>(null);

    const { login, setUser } = useAuth();  // Access login and setUser from AuthContext

    const handleLogin = async () => {
        // console.log('Email: ', email);
        // console.log('Password: ', password);
        // console.log('sending request...');

        try {
            const res = await fetch(`http://127.0.0.1:8080/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await res.json();

            if (data.error) {
                setLoginError(data.error.toString());
                console.log('Login failed:', data.error);
            } else {
                login(data.token); 

                // Fetch user profile by email after successful login
                const userData = await fetchUserProfile(email, data.token); 
                if (userData) {
                    setUser(userData); 
                }
            }
        } catch (err) {
            console.log('Login failed:', err);
            setLoginError('Login failed. Please try again.');
        }
    };

    // Fetch user profile by email after login
    const fetchUserProfile = async (email: string, token: string) => {
        email = email.toLowerCase();
        try {
            const res = await fetch(`http://127.0.0.1:8080/profiles/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const userData = await res.json();

            if (userData.error) {
                console.log('Failed to fetch user profile:', userData.error);
                setLoginError('Failed to load user data.');
                return null;
            } else {
                console.log('User profile fetched and stored.');
                return userData;
            }
        } catch (error) {
            console.log('Error fetching user profile:', error);
            setLoginError('Error fetching user profile.');
            return null;
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
    if (isValid) handleLogin();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errors.email ? styles.inputError : undefined]}
        placeholder="Email address"
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
        style={styles.buttonContainer}
        onPress={handleLoginPress}
      >
        <Text style={styles.buttonText}>Explore Nightlife</Text>
      </TouchableOpacity>

      {loginError && <Text style={styles.error}>{loginError}</Text>}

      <Text style={styles.subtitleText}>
        NightLife is an interactive platform focused on transforming the way
        people experience nightlife in urban areas and beyond.
      </Text>
    </View>
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
    width: 300,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "red",
  },
  buttonContainer: {
    marginTop: 10,
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
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default LoginForm;
