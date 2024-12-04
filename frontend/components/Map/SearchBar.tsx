import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type SearchBarProps = {
  placeholderText: string;
  icon?: boolean
  onSubmitEditing?: (text: string) => void;
}

const SearchBar = ({ placeholderText, icon, onSubmitEditing }: SearchBarProps) => {
  const [searchText, setSearchText] = React.useState("");

  return (
    <View style={styles.searchContainer}>
      {icon && <MaterialCommunityIcons
        name="magnify"
        size={20}
        color="#aaa"
        style={styles.searchIcon}
      />}
      <TextInput
        style={styles.searchInput}
        placeholder={placeholderText}
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => onSubmitEditing && onSubmitEditing(searchText)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#fff",
    backgroundColor: "#444",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
