import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

type UploadImageProps = {
  onImageUpload: (uri: string | null) => void;
};

export default function UploadImage({ onImageUpload }: UploadImageProps) {

  const [image, setImage] = useState("")

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      onImageUpload(imageUri); // Pass the image URI to the parent component
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 350,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 30,
    marginTop: -10,
  },
  buttonText: {
    color: "black",
    fontFamily: "Archivo",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: -40
  },
});
