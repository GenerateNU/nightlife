import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Chevron from "@/assets/chevron.svg";
import {API_DOMAIN} from "@env";

type RootStackParamList = {
    EditProfileAttribute: { field: string, existing: string };
};

type EditProfileAttributeProps = NativeStackScreenProps<RootStackParamList, 'EditProfileAttribute'>;

// TODO: handle for types other than string
// TODO: handle error responses from API

const EditProfileAttribute: React.FC<EditProfileAttributeProps> = ({ navigation, route }) => {

    const field = route?.params?.field;
    const existing = route?.params?.existing;

    if (!field) navigation.goBack();

    const [value, setValue] = useState<string|null>(existing || null);

    const { user, accessToken } = useAuth();

    const handleChange = (text: string) => {
        setValue(text);
    }

    const handleSave = async () => {

        if (!value) navigation.goBack();

        const req = await fetch(`${API_DOMAIN}/profiles/update/${user?.user_id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                [field]: field === "age" ? parseInt(value as string) : value
            })
        })

        if (req.ok) {
            const userData = await req.json();
            console.log(userData);
        }

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
                keyboardType={field === "age" ? "number-pad" : "default"}
                placeholder="Enter a value..."
                placeholderTextColor="#888"
                value={value || ""}
                onChangeText={handleChange}
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