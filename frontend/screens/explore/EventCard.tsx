import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type EventCardProps = {
    image: string;
    title: string;
    dateTime: string;
};

const EventCard = ({ image, title, dateTime }: EventCardProps) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.eventTitle}>{title}</Text>
                <Text style={styles.eventDateTime}>{dateTime}</Text>
            </View>
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
        marginRight: 10,
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: "#555",
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

export default EventCard;