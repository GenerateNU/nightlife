import React from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { VenueCard, VenuePreview } from "@/screens/explore/VenueCard";
import { useNavigation, useRoute } from "@react-navigation/native";

type VenueCardPageProps = {
    venues: VenuePreview[];
};

const VenueCardPage: React.FC<VenueCardPageProps> = () => {

    const route = useRoute();

    const venues: VenuePreview[] = route.params?.venues || [];

    console.log(venues);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ display: "flex", borderColor: "#5656a6", borderWidth: 2, borderRadius: 6, marginTop: 10, marginHorizontal: 20}}>
                <Text style={{ color: "#fff", padding: 10, marginLeft: 10 }}>Back</Text>
            </TouchableOpacity>
            <FlatList
                data={venues}
                renderItem={({ item }) => <VenueCard venue_preview={item} />}
                keyExtractor={(item) => item.venue_id}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                style={{ marginTop: 10, marginHorizontal: 10 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "Archivo_700Bold",
        marginLeft: 10,
        marginBottom: 10,
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
        paddingVertical: 10,
    },
    listContent: {
        paddingHorizontal: 10,
    },
});

export default VenueCardPage;
