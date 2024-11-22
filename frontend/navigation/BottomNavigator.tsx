import * as React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "@/screens/HomeScreen";
import UpdatesScreen from "@/screens/UpdatesScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import MapScreen from "@/screens/MapScreen";
import VenueScreen from "@/screens/VenueScreen";
import { BottomTabParamList } from "../types/NavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "@/screens/profile/EditProfile";
import EditProfileAttribute from "@/screens/profile/EditProfileAttribute";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const bottomTabNavOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    backgroundColor: "#1c1c1c",
    height: 100,
    paddingVertical: 3,
    borderTopWidth: 0,
  },
  tabBarShowLabel: false,
  tabBarIconStyle: {
    marginTop: 4,
  },
  headerStyle: {
    backgroundColor: "#1c1c1c",
    shadowColor: "transparent",
    height: 48,
  },
  headerTitle: "",
  headerTintColor: "#fff",
  tabBarActiveTintColor: "#0ea5e9",
};

type RootStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  EditProfileAttribute: { field: string; existing: string };
};

const createScreenOptions = (
  label: string,
  iconName: keyof typeof MaterialCommunityIcons.glyphMap
): BottomTabNavigationOptions => ({
  tabBarLabel: label,
  tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name={iconName} color={color} size={size} />
  ),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProfileStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfileAttribute" component={EditProfileAttribute} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

export function BottomNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={bottomTabNavOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={createScreenOptions("Home", "home")}
      />
      <Tab.Screen
        name="Browse"
        component={MapScreen}
        options={createScreenOptions("Search", "magnify")}
      />
      <Tab.Screen
        name="Updates"
        component={UpdatesScreen}
        options={createScreenOptions("Updates", "bell")}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={createScreenOptions("Profile", "account-circle")}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={createScreenOptions("Settings", "cog")}
      />
      <Tab.Screen
        name="Venue"
        component={VenueScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
