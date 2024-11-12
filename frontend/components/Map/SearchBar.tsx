import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const SearchBar = () => {
  const [searchText, setSearchText] = React.useState("");

  return (
    <View style={styles.searchContainer}>
      <MaterialCommunityIcons
        name="magnify"
        size={20}
        color="#aaa"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search location"
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#333",
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  searchIcon: {
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    color: "#fff",
    backgroundColor: "#444",
    fontFamily: "Archivo_500Medium"
  },
});

export default SearchBar;
