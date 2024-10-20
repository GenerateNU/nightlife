import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import SearchBar from '@/components/SearchBar';

const MapScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <SearchBar /> 
            <MapView style={styles.map} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapScreen;
