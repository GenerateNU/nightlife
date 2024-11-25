/* eslint-disable */
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from "@/navigation/BottomNavigator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import LoginScreen from "@/screens/LoginScreen";
import { FormDataProvider } from './components/OnboardingCards/FormDataContext';
import WhoAreYouWith from "@/components/OnboardingCards/WhoDoYouGoOutWIth";
import UserFormP1 from './components/OnboardingCards/UserFormP1';
import UserFormP2 from './components/OnboardingCards/UserFormP2';
import UserFormP3 from './components/OnboardingCards/UserFormP3';
import InsideOutside from './components/OnboardingCards/InsideOutside';
import RankingNightlife from './components/OnboardingCards/RankingNightlifeImportance';
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

import { Archivo_400Regular, Archivo_500Medium, Archivo_700Bold, useFonts } from "@expo-google-fonts/archivo";
import EditProfile from './screens/profile/EditProfile';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="whoAreYouWith"
        component={WhoAreYouWith}
        options={{
          headerStyle: {
            backgroundColor: "#007bff",
          },
          headerTitleStyle: {
            fontFamily: "Archivo_700Bold",
          },
          headerTitle: "Welcome to Nightlife",
          headerTintColor: "#fff",
          headerBlurEffect: "light",
        }}
      />
      <Stack.Screen
        name="UserFormP1"
        component={UserFormP1}
        options={{
          title: "UserFormP1",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="UserFormP2"
        component={UserFormP2}
        options={{
          title: "UserFormP2",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="UserFormP3"
        component={UserFormP3}
        options={{
          title: "UserFormP3",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="RankingNightlife"
        component={RankingNightlife}
        options={{
          title: "RankingNightlife",
          headerStyle: {
            backgroundColor: "#111729",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="InsideOutside"
        component={InsideOutside}
        options={{
          title: "InsideOutside",
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
        name="UserFormP1"
        component={UserFormP1}
        options={{
          title: "UserFormP1",
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
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_700Bold,
  });

  return (
    fontsLoaded && (
      <AuthProvider>
        <NavigationContainer>
          <FormDataProvider>
            <MainNavigator />
          </FormDataProvider>
        </NavigationContainer>
      </AuthProvider>
    )
  );
}

const MainNavigator = () => {
  const { accessToken } = useAuth();
  const hasCompletedOnboarding = true; // Placeholder logic

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
