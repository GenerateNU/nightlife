import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const EditProfile = ({ navigation }) => {

  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: user?.profile_picture_url || "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" }} />
        <Text style={styles.editProfilePictureText}>Edit</Text>
      </View>
      {/* <Text style={styles.aboutYouText}>
        About You
      </Text> */}
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Name</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.first_name || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Username</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.username || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Your Age</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.age || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Personality Type</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{"N/A"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Pronouns</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.pronouns || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Email</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.email || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Biography</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>
            {user?.biography ? (user.biography.length > 30 ? `${user.biography.slice(0, 30).trim()}...` : user.biography) : "add"}
          </Text>

          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Instagram URL</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.instagram_url || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>TikTok URL</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.tik_tok_url || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Twitter/X URL</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.twitter_url || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editThing}>
        <Text style={styles.aboutYouText}>Private?</Text>
        <View style={styles.editX}>
          <Text style={styles.aboutYouText}>{user?.privacy || "add"}</Text>
          <Image style={styles.xImage} source={require("@/assets/profile_x.png")} />
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.text} onPress={() => navigation.navigate('EditProfileData')}>
          Edit Profile Data
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignContent: "center"
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
