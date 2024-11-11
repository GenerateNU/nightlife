import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const EditProfileData = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [profilePictureURL, setProfilePictureURL] = useState('');
    const [personalityType, setPersonalityType] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [biography, setBiography] = useState('');
    const [instagramURL, setInstagramURL] = useState('');
    const [tikTokURL, setTikTokURL] = useState('');
    const [twitterURL, setTwitterURL] = useState('');
    const [phone, setPhone] = useState('');
    const [privacy, setPrivacy] = useState('');

    const { user, accessToken } = useAuth();

    const handleSave = async () => {
        console.log('Updated Data:', { firstName, username, email, age, profilePictureURL, personalityType, pronouns, biography, instagramURL, tikTokURL, twitterURL, phone, privacy });

        console.log("Username: " + user?.username)

        const token = accessToken;

        const res = await fetch(`http://localhost:8080/profiles/${user?.username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        console.log("User ID: " + data.user_id)

        const userReq = await fetch(`http://localhost:8080/profiles/update/${data.user_id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username
            })
        })

        const userRes = await userReq.json();
        console.log(userRes)


        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Edit Profile Data</Text>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#888"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor="#888"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Profile Picture URL"
                placeholderTextColor="#888"
                value={profilePictureURL}
                onChangeText={setProfilePictureURL}
                keyboardType="url"
            />
            <TextInput
                style={styles.input}
                placeholder="Personality Type"
                placeholderTextColor="#888"
                value={personalityType}
                onChangeText={setPersonalityType}
            />
            <TextInput
                style={styles.input}
                placeholder="Pronouns"
                placeholderTextColor="#888"
                value={pronouns}
                onChangeText={setPronouns}
            />
            <TextInput
                style={styles.input}
                placeholder="Biography"
                placeholderTextColor="#888"
                value={biography}
                onChangeText={setBiography}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Instagram URL"
                placeholderTextColor="#888"
                value={instagramURL}
                onChangeText={setInstagramURL}
                keyboardType="url"
            />
            <TextInput
                style={styles.input}
                placeholder="TikTok URL"
                placeholderTextColor="#888"
                value={tikTokURL}
                onChangeText={setTikTokURL}
                keyboardType="url"
            />
            <TextInput
                style={styles.input}
                placeholder="Twitter URL"
                placeholderTextColor="#888"
                value={twitterURL}
                onChangeText={setTwitterURL}
                keyboardType="url"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#888"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Privacy (e.g., true/false)"
                placeholderTextColor="#888"
                value={privacy}
                onChangeText={setPrivacy}
            />

            <Button title="Save" onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});

export default EditProfileData;
