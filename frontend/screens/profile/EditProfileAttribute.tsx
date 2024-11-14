import { useAuth } from "@/context/AuthContext";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Chevron from "@/assets/chevron.svg";

type RootStackParamList = {
    EditProfileAttribute: { field: string };
  };
  
  type EditProfileAttributeProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "EditProfileAttribute">;
    route: RouteProp<RootStackParamList, "EditProfileAttribute">;
  };

// TODO: handle for types other than string
// TODO: handle error responses from API

const EditProfileAttribute = ({ navigation, route }: EditProfileAttributeProps) => {

    const field = route?.params?.field;

    if (!field) navigation.goBack();

    const [value, setValue] = useState(null);

    const { user, accessToken } = useAuth();

    const handleSave = async () => {

        console.log(value)
        const res = await fetch(`http://localhost:8080/profiles/${user?.email}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        if (!value) navigation.goBack();

        const userReq = await fetch(`http://localhost:8080/profiles/update/${data.user_id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                [field]: value
            })
        })

        const userRes = await userReq.json();
        console.log(userRes)

        navigation.goBack();
    }

    return (
        <View style={styles.scrollContainer}>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Chevron width={15} height={15} />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Profile</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter a value..."
                placeholderTextColor="#888"
                value={value}
                onChangeText={setValue}
            />

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    goBackButton: {
        padding: 6,
        backgroundColor: "#007bff",
        borderRadius: 6,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    scrollContainer: {
        padding: 20,
        backgroundColor: '#1c1c1c',
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        fontFamily: 'Archivo_700Bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 5,
        padding: 10,
        fontFamily: 'Archivo_500Medium',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    }
});

export default EditProfileAttribute;