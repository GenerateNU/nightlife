import * as React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
//import MapScreen from "@/screens/MapScreen";
import VenueScreen from "@/screens/venue/VenueScreen";
import { BottomTabParamList } from "../types/NavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "@/screens/profile/EditProfile";
import EditProfileAttribute from "@/screens/profile/EditProfileAttribute";
import RatingScreen from "@/screens/venue/RatingScreen";
import VenueReviews from "@/screens/venue/VenueReviews";
import RateReviewScreen from "@/screens/venue/RateReviewScreen";
import MapScreen from "@/screens/MapScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import UpdatesScreen from "@/screens/UpdatesScreen";
import VenueCardPage from "@/screens/explore/VenueCardPage";

const Tab = createBottomTabNavigator<BottomTabParamList>();


const bottomTabNavOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    backgroundColor: "#382873",
    height: 80,
    padding: 6,
    borderTopWidth: 0,
    paddingHorizontal: 26,
  },
  tabBarShowLabel: true,
  tabBarLabelStyle: {
    fontFamily: "Archivo_700Bold",
    paddingTop: 4
  },
  tabBarIconStyle: {
    marginTop: 5,
    marginHorizontal: 12
  },
  headerStyle: {
    backgroundColor: "#1c1c1c",
    shadowColor: "transparent",
    height: 48,
  },
  headerTitle: "",
  headerTintColor: "#fff",
  tabBarActiveTintColor: "hotpink",
  tabBarInactiveTintColor: "white",
};

type RootStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  EditProfileAttribute: { field: string; existing: string };
  Venue: undefined;
  VenueCards: undefined;
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

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Venue" component={VenueScreen} options={{ headerShown: false }} />
    <Stack.Screen name="VenueCards" component={VenueCardPage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export function BottomNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={bottomTabNavOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={createScreenOptions("Home", "home")}
      />
      <Tab.Screen
        name="Browse"
        component={MapScreen}
        options={createScreenOptions("Search", "magnify")}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={createScreenOptions("Profile", "account-circle")}
      /> 
      <Tab.Screen
        name="Venue"
        component={VenueScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
        />

      <Tab.Screen
        name="Rating"
        component={RatingScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
        />
        <Tab.Screen
        name="RatingReview"
        component={RateReviewScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
        />
      <Tab.Screen
        name="VenueReviews"
        component={VenueReviews}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
