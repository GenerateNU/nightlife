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
        <View style={[styles.card, { backgroundColor: accent}]}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.eventTitle}>{title}</Text>
                <Text style={styles.eventDateTime}>{subtitle}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
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
        marginRight: 10,
        width: 200,
        height: 170,
        borderWidth: 2,
        borderColor: "#735ad1",
    },
    image: {
        width: "100%",
        height: 100,
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
        color: "#ffffff",
        marginTop: 5,
    },
});

export default EventCard;