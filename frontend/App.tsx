import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from "@/navigation/BottomNavigator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "@/screens/LoginScreen";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React from 'react';
import NightlifePreference from './components/OnboardingCards/NightlifePreference';
import AddPhoto from './components/OnboardingCards/AddPhoto';
import MusicPreferences from './components/OnboardingCards/MusicPreference';
import PersonalityScreenReveal from './components/OnboardingCards/PersonalityScreenReveal'
import PersonalityScreenReveal2 from './components/OnboardingCards/PersonalityScreenReveal2'
import HowFarFromYou from './components/OnboardingCards/HowFarFromYou';
import FrequencyPreference from './components/OnboardingCards/FrequencyPreference';
import CrowdPreference from './components/OnboardingCards/CrowdPreference';
import TimePreference from './components/OnboardingCards/TimePreference';


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
            backgroundColor: '#111729',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
      <Stack.Navigator initialRouteName="NightlifePreference">
          <Stack.Screen 
              name="NightlifePreference" 
              component={NightlifePreference} 
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
              name="AddPhoto" 
              component={AddPhoto} 
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
