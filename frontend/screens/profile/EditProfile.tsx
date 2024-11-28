import { useAuth } from '@/context/AuthContext';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';

import Chevron from "../../assets/chevron.svg";

import EditProfileAttributeIcon from "@/assets/editProfileAttributeChevron.svg";

import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { fetchUserProfileService } from '@/services/authService';

type RootStackParamList = {
  EditProfileAttribute: { field: string, existing: string };
}

type EditProfileProps = {
  navigation: NavigationProp<RootStackParamList>;
}

const EditProfile = ({ navigation }: EditProfileProps) => {

  const { user, logout, setUserAsync, accessToken } = useAuth();

  console.log(user)

  const [privacy, setPrivacy] = React.useState(user?.privacy);

  const togglePrivacy = async () => {
    await fetch(`http://localhost:8080/profiles/update/${user?.user_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privacy: !privacy
      })
    })
    setPrivacy(!privacy);
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (user && accessToken) {
          const userData = await fetchUserProfileService(user.email, accessToken);
          if (userData) {
            await setUserAsync(userData);
          }
        }
      };
      fetchData();
    }, [])
  );

  const fields: { key: string, display: string, value: string }[] = [
    {
      key: "firstName",
      display: "Name",
      value: user?.first_name || "update",
    },
    {
      key: "username",
      display: "Username",
      value: user?.username || "update"
    },
    {
      key: "age",
      display: "Age",
      value: user?.age?.toString() || "update"
    },
    {
      key: "email",
      display: "Email",
      value: user?.email || "update"
    },
    {
      key: "pronouns",
      display: "Pronouns",
      value: user?.pronouns || "update"
    },
    // TODO: add personality type to user model
    {
      key: "personality_type",
      display: "Personality Type",
      value: "update"
    },
    {
      key: "biography",
      display: "Biography",
      value: user?.biography || "update"
    },
    {
      key: "instagram_url",
      display: "Instagram",
      value: user?.instagram_url || "update"
    },
    {
      key: "tik_tok_url",
      display: "TikTok",
      value: user?.tik_tok_url || "update"
    },
    {
      key: "twitter_url",
      display: "Twitter",
      value: user?.twitter_url || "update"
    },
  ]

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Chevron width={15} height={15} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: user?.profile_picture_url || "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" }} />
        <Text style={styles.editProfilePictureText}>Edit</Text>
      </View>
      {fields.map((field, index) => (
        <View style={styles.editThing} key={index}>
          <Text style={styles.aboutYouText}>{field.display}</Text>
          <TouchableOpacity style={styles.editX} onPress={() => navigation.navigate("EditProfileAttribute", { field: field.key, existing: field.value })}>
            <Text style={styles.aboutYouText}>{field.value.length > 20 ? `${field.value.slice(0, 20).trim()}...` : field.value}</Text>
            <EditProfileAttributeIcon style={styles.xImage} />
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.editThing}>
        <Text style={styles.aboutYouText}>Private?</Text>
        <Switch
          trackColor={{ false: "#007bff", true: "#007bff" }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={togglePrivacy}
          value={privacy}
          style={styles.switch}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButtonText: {
    color: "white",
    fontFamily: "Archivo_700Bold",
    textAlign: "center",
    fontSize: 14,
  },
  goBackButton: {
    padding: 6,
    backgroundColor: "#007bff",
    borderRadius: 6,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  goBackButtonText: {
    color: "white",
    fontFamily: "Archivo_500Medium",
  },
  xImage: {
    marginBottom: 4,
    marginLeft: 6
  },
  editX: {
    flexDirection: "row",
    alignItems: "center",
  },
  editThing: {
    backgroundColor: "#1c1c1c",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingVertical: 2
  },
  aboutYouText: {
    color: "white",
    fontFamily: "Archivo_500Medium",
    fontSize: 16,
    paddingBottom: 6,
  },
  switch: {
    transform: [{ scaleX: .75 }, { scaleY: .75 }],
    marginTop: -6,
  },
  profilePictureContainer: {
    marginBottom: 16,
  },
  profilePicture: {
    width: 128,
    height: 128,
    borderRadius: 96,
    alignSelf: "center",
  },
  editProfilePictureText: {
    color: "white",
    textAlign: "center",
    paddingVertical: 8,
    fontFamily: "Archivo_500Medium",
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1c1c1c",
  },
  title: {
    fontSize: 26,
    color: "white",
    fontFamily: "Archivo_700Bold",
  },
  button: {
    padding: 16,
    backgroundColor: "#007bff",
    borderRadius: 6,
    marginVertical: 16,
  },
  text: {
    fontFamily: "Archivo_500Medium",
    color: "white",
  },
});

export default EditProfile;
