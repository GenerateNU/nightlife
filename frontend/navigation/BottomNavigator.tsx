import * as React from 'react';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from "@/screens/HomeScreen";
import UpdatesScreen from "@/screens/UpdatesScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import MapScreen from '@/screens/MapScreen';
import VenueScreen from '@/screens/VenueScreen';

const Tab = createBottomTabNavigator();


const bottomTabNavOptions: BottomTabNavigationOptions = {
    tabBarStyle: {
        backgroundColor: '#1c1c1c',
        height: 100,
        paddingVertical: 3,
        borderTopWidth: 0,
    },
    tabBarShowLabel: false,
    tabBarIconStyle: {
        marginTop: 4,
    },
    headerStyle: {
        backgroundColor: '#0ea5e9',
        shadowColor: 'transparent',
        height: 64,
    },
    headerTitle: "",
    headerTintColor: '#fff',
    tabBarActiveTintColor: '#0ea5e9',
}

const createScreenOptions = (label: string, iconName: keyof (typeof MaterialCommunityIcons.glyphMap)): BottomTabNavigationOptions => ({
    tabBarLabel: label,
    tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name={iconName} color={color} size={size} />
    ),
});

export function BottomNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={bottomTabNavOptions}>
            <Tab.Screen name="Home" component={HomeScreen} options={createScreenOptions("Home", "home")}/>
            <Tab.Screen name="Browse" component={MapScreen} options={createScreenOptions("Search", "magnify")}/>
            <Tab.Screen name="Updates" component={UpdatesScreen} options={createScreenOptions("Updates", "bell")}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={createScreenOptions("Profile", "account-circle")}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={createScreenOptions("Settings", "cog")}/>
            <Tab.Screen name="Venue" component={VenueScreen} options={createScreenOptions("VenueEx", "cog")}/>
        </Tab.Navigator>
    );
}
