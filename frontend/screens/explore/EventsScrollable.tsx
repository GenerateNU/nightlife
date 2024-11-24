import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import EventCard from "./EventCard";

const EventsScrollable = () => {

    const events = [
        {
            id: "1",
            image: "https://planning-org-uploaded-media.s3.amazonaws.com/image/Planning-2020-02-image26.jpg",
            title: "Concert Night",
            dateTime: "Dec 10, 2024 • 8:00 PM",
        },
        {
            id: "2",
            image: "https://planning-org-uploaded-media.s3.amazonaws.com/image/Planning-2020-02-image26.jpg",
            title: "Festival Beats",
            dateTime: "Dec 15, 2024 • 6:00 PM",
        },
        {
            id: "3",
            image: "https://planning-org-uploaded-media.s3.amazonaws.com/image/Planning-2020-02-image26.jpg",
            title: "Jazz Evening",
            dateTime: "Dec 20, 2024 • 9:00 PM",
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Events on Your Radar</Text>
            <FlatList
                horizontal
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <EventCard
                        image={item.image}
                        title={item.title}
                        dateTime={item.dateTime}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    listContainer: {
        paddingVertical: 10,
    },
    card: {
        backgroundColor: "#2d2d44",
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 15,
        width: 200,
        height: 200,
    },
    image: {
        width: "100%",
        height: 120,
    },
    cardContent: {
        padding: 10,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    eventDateTime: {
        fontSize: 14,
        color: "#ccc",
        marginTop: 5,
    },
    seeAllButton: {
        marginTop: 20,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    seeAllText: {
        fontSize: 16,
        color: "#fff",
    },
});

export default EventsScrollable;