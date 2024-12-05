import {Button, Text, TouchableOpacity, View} from "react-native";
import {useAuth} from "@/context/AuthContext";
import React from "react";

const SettingsScreen: React.FC = () => {

    const { logout } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen</Text>
            <TouchableOpacity>
               <Button title="Logout" onPress={logout} />
            </TouchableOpacity>
        </View>
    );
}

export default SettingsScreen;