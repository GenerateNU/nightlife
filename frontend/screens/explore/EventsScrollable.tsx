import React from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import EventCard from "./EventCard";

import BIRD from "../../assets/personas/BIRD.png";
import CAT from "../../assets/personas/CAT.png";
import GIRL from "../../assets/personas/GIRL.png";
import GREEN from "../../assets/personas/GREEN.png";
import MAN from "../../assets/personas/MAN.png";
import MERMAID from "../../assets/personas/MERMAID.png";
import ZAP from "../../assets/personas/ZAP.png";

const PERSONA_IMAGES = {
    BIRD,
    CAT,
    GIRL,
    GREEN,
    MAN,
    MERMAID,
    ZAP,
};

type EventsScrollableProps = {
    title: string;
    persona: keyof typeof PERSONA_IMAGES;
    accent: string;
};

const EventsScrollable: React.FC = ({ title, persona, accent }: EventsScrollableProps) => {
    const events = [
        {
            id: "1",
            image: "https://academy.la/wp-content/uploads/2024/06/best-club-near-me-hollywood-1024x576.webp",
            title: "Concert Night",
            dateTime: "4:30-11:30 PM",
        },
        {
            id: "2",
            image: "https://academy.la/wp-content/uploads/2024/06/best-club-near-me-hollywood-1024x576.webp",
            title: "Festival Beats",
            dateTime: "4:30-11:30 PM",
        },
        {
            id: "3",
            image: "https://academy.la/wp-content/uploads/2024/06/best-club-near-me-hollywood-1024x576.webp",
            title: "Jazz Evening",
            dateTime: "4:30-11:30 PM",
        },
    ];

    return (
        <View style={styles.container}>
            {persona && (
                <Image
                    source={PERSONA_IMAGES[persona]}
                    style={styles.backgroundImage}
                />
            )}

            <Text style={styles.headerText}>{title}</Text>
            <FlatList
                horizontal
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <EventCard
                        image={item.image}
                        title={item.title}
                        dateTime={item.dateTime}
                        accent={accent || "#2d2d44"}
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
        backgroundColor: "#1a1a2e",
        paddingHorizontal: 15,
        marginBottom: 15,
        position: "relative",
        overflow: "hidden",
    },
    backgroundImage: {
        position: "absolute",
        top: -24,
        right: 24,
        bottom: 0,
        width: 84,
        resizeMode: "cover",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 16,
        fontFamily: "Archivo_700Bold",
        zIndex: 1,
    },
    listContainer: {
        paddingVertical: 0,
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
});

export default EventsScrollable;
