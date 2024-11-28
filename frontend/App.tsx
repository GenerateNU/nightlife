import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from "@/navigation/BottomNavigator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "@/screens/LoginScreen";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { FormDataProvider } from "../frontend/components/OnboardingCards/FormDataContext";
import React from "react";
import UserFormP4 from './components/OnboardingCards/UserFormsP4';
import WhoAreYouWith from "./components/OnboardingCards/WhoDoYouGoOutWIth";
import NightlifePreference from "./components/OnboardingCards/NightlifePreference";
import MusicPreferences from "./components/OnboardingCards/MusicPreference";
import PersonalityScreenReveal from "./components/OnboardingCards/PersonalityScreenReveal";
import PersonalityScreenReveal2 from "./components/OnboardingCards/PersonalityScreenReveal2";
import HowFarFromYou from "./components/OnboardingCards/HowFarFromYou";
import FrequencyPreference from "./components/OnboardingCards/FrequencyPreference";
import CrowdPreference from "./components/OnboardingCards/CrowdPreference";
import TimePreference from "./components/OnboardingCards/TimePreference";
import LoginOrSignup from "./components/OnboardingCards/LoginOrSignup";
import UserFormP1 from "./components/OnboardingCards/UserFormP1";
import UserFormP2 from "./components/OnboardingCards/UserFormP2";
import UserFormP3 from "./components/OnboardingCards/UserFormP3";
import InsideOutside from "./components/OnboardingCards/InsideOutside";
import RankingNightlifeImportance from "./components/OnboardingCards/RankingNightlifeImportance";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginOrSignup"
        component={LoginOrSignup}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserFormP1"
        component={UserFormP1}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserFormP2"
        component={UserFormP2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NightlifePreference"
        component={NightlifePreference}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RankingNightLifeImportance"
        component={RankingNightlifeImportance}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserFormP1"
        component={UserFormP1}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserFormP2"
        component={UserFormP2}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InsideOutside"
        component={InsideOutside}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserFormP3"
        component={UserFormP3}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FrequencyPreference"
        component={FrequencyPreference}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrowdPreference"
        component={CrowdPreference}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MusicPreference"
        component={MusicPreferences}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TimePreference"
        component={TimePreference}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HowFarFromYou"
        component={HowFarFromYou}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalityScreenReveal"
        component={PersonalityScreenReveal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalityScreenReveal2"
        component={PersonalityScreenReveal2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserFormP4"
        component={UserFormP4}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WhoAreYouWith"
        component={WhoAreYouWith}
        options={{ headerShown: false }}
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
    return (
      <FormDataProvider>
        <OnboardingStack />
      </FormDataProvider>
    );
  }

  // Show LoginStack if no access token
  if (!accessToken) {
    return (
      <FormDataProvider>
        <LoginStack />
      </FormDataProvider>
    );
  }

  // Otherwise, show the main app after login & onboarding
  return <BottomNavigator />;
};
