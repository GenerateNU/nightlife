import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from "@/navigation/BottomNavigator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "@/screens/LoginScreen";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React from 'react';
import CrowdAndFrequencyPreference from './components/OnboardingCards/CrowdAndFrequencyPreference';
import NightlifePreference from './components/OnboardingCards/NightlifePreference';
import SplashScreen from './components/OnboardingCards/SplashScreen';
import AddPhoto from './components/OnboardingCards/AddPhoto';
import MusicPreferences from './components/OnboardingCards/MusicPreference';
import PersonalityScreenReveal from './components/OnboardingCards/PersonalityScreenReveal'
import PersonalityScreenReveal2 from './components/OnboardingCards/PersonalityScreenReveal2'
import HowFarFromYou from './components/OnboardingCards/HowFarFromYou';



const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={LoginScreen}
        options={{
          title: "Nightlife 🌃",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NightlifePreference"
        component={NightlifePreference}
        options={{
          title: "Nightlife Pref",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CrowdAndFrequencyPreference"
        component={CrowdAndFrequencyPreference}
        options={{
          title: "Crowd Pref",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{
          title: "Add Photo",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="HowFarFromYou"
        component={HowFarFromYou}
        options={{
          title: "Distance Pref",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="PersonalityScreenReveal"
        component={PersonalityScreenReveal}
        options={{
          title: "Personality 2",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="PersonalityScreenReveal2"
        component={PersonalityScreenReveal2}
        options={{
          title: "Personality",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="MusicPreference"
        component={MusicPreferences}
        options={{
          title: "Music Pref",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{
          title: "Nightlife 🌃",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const MainNavigator = () => {
  const { accessToken } = useAuth();
  const hasCompletedOnboarding = false; // Placeholder logic

  // If user is logged in and hasn't completed onboarding, show the OnboardingStack
  if (accessToken && !hasCompletedOnboarding) {
    return <OnboardingStack />;
  }

  // Show LoginStack if no access token
  if (!accessToken) {
    return <LoginStack />;
  }

  // Otherwise, show the main app after login & onboarding
  return <BottomNavigator />;
};
