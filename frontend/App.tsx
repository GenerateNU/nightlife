import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from "@/components/BottomNavigator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "@/screens/LoginScreen";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import React from 'react';
import CrowdAndFrequencyPreference from './components/OnboardingCards/CrowdAndFrequencyPreference';
import NightlifePreference from './components/OnboardingCards/NightlifePreference';
import SplashScreen from './components/OnboardingCards/SplashScreen';
import AddPhoto from './components/OnboardingCards/AddPhoto';

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
                  title: "Nightlife Preference",
                  headerStyle: {
                      backgroundColor: '#111729',
                  },
                  headerTintColor: '#fff',
              }} 
          />
          <Stack.Screen 
              name="CrowdAndFrequencyPreference" 
              component={CrowdAndFrequencyPreference} 
              options={{
                  title: "Crowd & Frequency Preference",
                  headerStyle: {
                      backgroundColor: '#111729',
                  },
                  headerTintColor: '#fff',
              }} 
          />
          <Stack.Screen 
              name="AddPhoto" 
              component={AddPhoto} 
              options={{
                  title: "Now, Add a Photo",
                  headerStyle: {
                      backgroundColor: '#111729',
                  },
                  headerTintColor: '#fff',
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
