import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type SearchBarProps = {
  placeholderText: string;
  icon?: boolean
  onSubmitEditing?: (text: string) => void;
  style?: object;
}

const SearchBar = ({ placeholderText, icon, onSubmitEditing, style }: SearchBarProps) => {
  const [searchText, setSearchText] = React.useState("");

  return (
    <View style={[styles.searchContainer, style]}>
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
    backgroundColor: "#3a3a54",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#5656a6",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    paddingHorizontal: 12,
    elevation: 5,
    marginTop: 40,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#fff",
    backgroundColor: "#3a3a54",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
