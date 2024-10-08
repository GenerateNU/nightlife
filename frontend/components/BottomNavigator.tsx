import * as React from 'react';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from "@/screens/HomeScreen";
import SearchScreen from "@/screens/SearchScreen";
import UpdatesScreen from "@/screens/UpdatesScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import SettingsScreen from "@/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const bottomTabNavOptions: BottomTabNavigationOptions = {
    tabBarStyle: {
        backgroundColor: '#111729',
        height: 100,
        paddingVertical: 3,
    },
    tabBarLabelStyle: {
        paddingBottom: 8,
    },
    tabBarIconStyle: {
        marginTop: 8,
    },
    headerStyle: {
        backgroundColor: '#111729',
    },
    headerTintColor: '#fff',
    tabBarActiveTintColor: '#4ba3e3',
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
            <Tab.Screen name="Browse" component={SearchScreen} options={createScreenOptions("Search", "magnify")}/>
            <Tab.Screen name="Updates" component={UpdatesScreen} options={createScreenOptions("Updates", "bell")}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={createScreenOptions("Profile", "account-circle")}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={createScreenOptions("Settings", "cog")}/>
        </Tab.Navigator>
    );
}
