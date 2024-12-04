import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";

export type VenuePreview = {
    venue_id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    venue_type: string;
    total_rating: number;
    price: number;
}

type EventCardProps = {
    venue_preview: VenuePreview;
};

export const VenueCard = ({ venue_preview }: EventCardProps) => {

    const navigation = useNavigation();
    const venue_id = venue_preview.venue_id;

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Venue", { venue_id })}>
            <View style={styles.card}>
                <Image source={{ uri: "https://visitturkey.in/wp-content/uploads/2024/07/izmir-nightlife-bars-clubs-and-lounges-1200x900.webp" }} style={styles.image} />
                <View style={styles.cardContent}>
                    <Text style={styles.eventTitle}>{venue_preview.name}</Text>
                    <Text style={styles.eventDateTime}>{venue_preview.address}</Text>
                    <Text style={styles.eventDateTime}>{venue_preview.city}, {venue_preview.state} {venue_preview.zip_code}</Text>
                    <Text style={styles.eventDateTime}>{venue_preview.venue_type} Rating: {venue_preview.total_rating} Price: {venue_preview.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#2d2d44",
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 10,
        width: "auto",
        height: "auto",
        borderWidth: 2,
        borderColor: "#735ad1",
        marginVertical: 6,
        padding: 0
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
