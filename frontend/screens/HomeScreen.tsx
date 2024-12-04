import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import SearchBar from "@/components/Map/SearchBar";
import EventsScrollable from "./explore/EventsScrollable";

import { API_DOMAIN } from "@env";
import { useNavigation } from "@react-navigation/native";

const HomeScreen: React.FC = () => {

    const navigation = useNavigation();

    const handleSearch = async (text: string) => {


        const req = await fetch(`${API_DOMAIN}/venues/search?q=${encodeURIComponent(text)}`);
    
        if (!req.ok) {
            console.error("Failed to search for venues");
            return;
        }
    
        const res = await req.json();

        navigation.navigate("VenueCards", { venues: res });
    }

    return (
        <View style={styles.container}>
            <SearchBar placeholderText="Search venues..." onSubmitEditing={handleSearch} />
            <ScrollView contentContainerStyle={styles.scrollableContent}>
                <EventsScrollable title={"On Your Radar"} accent="#382873"/>
                <EventsScrollable title={"Recommended for You"} accent="#382873" />
                <EventsScrollable title={"Hidden Grooves"} persona="BIRD" accent={"#F1B149"} />
                <EventsScrollable title={"Opus Evenings"} persona="CAT" accent={"#E1675A"} />
                <EventsScrollable title={"Fun, Flirty, Fierce!"} persona="GIRL" accent={"#D976AF"} />
                <EventsScrollable title={"Taste Adventure"} persona="GREEN" accent={"#90ad50"} />
                <EventsScrollable title={"Kick Back & Unwind"} persona="MAN" accent={"#C39C3D"} />
                <EventsScrollable title={"Anything Can Happen"} persona="MERMAID" accent={"#7b82ad"} />
                <EventsScrollable title={"Electric Vibes"} persona="ZAP" accent={"#268ECE"} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c1c1c",
    },
    scrollableContent: {
        paddingTop: 64,
        paddingHorizontal: 2
    },
    searchBarContainer: {
        marginBottom: 20,
    },
    sectionContainer: {
        marginBottom: 30,
    },
});

export default HomeScreen;
