import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = () => {
    const [searchText, setSearchText] = React.useState('');

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search location"  
                placeholderTextColor="#999"  
                value={searchText}
                onChangeText={setSearchText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
});

export default SearchBar;
