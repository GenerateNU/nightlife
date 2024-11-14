import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Chevron from "../../assets/chevron.svg";

import EditProfileAttributeIcon from "@/assets/editProfileAttributeChevron.svg";

import { NavigationProp } from "@react-navigation/native";

type EditProfileProps = {
  navigation: NavigationProp<any>;
}

const EditProfile = ({ navigation }: EditProfileProps) => {

  const { user } = useAuth();

  const fields: {key: string, value: string}[] = [
    {
      key: "Name",
      value: user?.first_name || "update",
    },
    {
      key: "Username",
      value: user?.username || "update"
    },
    {
      key: "Age",
      value: user?.age.toString() || "update"
    },
    {
      key: "Email",
      value: user?.email || "update"
    },
    {
      key: "Pronouns",
      value: user?.pronouns || "update"
    },
    // TODO: add personality type to user model
    {
      key: "Personality Type",
      value: "update"
    },
    {
      key: "Biography",
      value: user?.biography || "update"
    },
    {
      key: "Instagram",
      value: user?.instagram_url || "update"
    },
    {
      key: "TikTok",
      value: user?.tik_tok_url || "update"
    },
    {
      key: "Twitter",
      value: user?.twitter_url || "update"
    },
    {
      key: "Private?",
      value: user?.privacy != null ? (user.privacy ? "yes" : "no") : "update"
    }
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
          <Text style={styles.aboutYouText}>{field.key}</Text>
          <TouchableOpacity style={styles.editX} onPress={() => navigation.navigate("EditProfileData", { field: field.key.toLowerCase() })}>
            <Text style={styles.aboutYouText}>{field.value.length > 20 ? `${field.value.slice(0, 20).trim()}...` : field.value}</Text>
            <EditProfileAttributeIcon style={styles.xImage} />
          </TouchableOpacity>
        </View>
      ))}
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
