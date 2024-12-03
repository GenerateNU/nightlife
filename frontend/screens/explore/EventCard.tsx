import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type EventCardProps = {
    image: string;
    title: string;
    subtitle: string;
    accent: string;
};

const EventCard = ({ image, title, subtitle, accent }: EventCardProps) => {
    return (
        <View style={[styles.card, { backgroundColor: accent, borderColor: accent }]}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.eventTitle}>{title.length > 20 ? title.slice(0, 20) + "..." : title}</Text>
                <Text style={styles.eventDateTime}>{subtitle}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#2d2d44",
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 10,
        width: 200,
        borderWidth: 2,
        borderColor: "#735ad1",
    },
    image: {
        width: "100%",
        aspectRatio: 16 / 9,
    },
    cardContent: {
        padding: 10,
        height: "auto"
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
    eventDateTime: {
        fontSize: 14,
        color: "#ffffff",
        marginTop: 5,
    },
});

export default EventCard;
