import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import EventCard from "./EventCard";

import BIRD from "../../assets/personas/BIRD.png";
import CAT from "../../assets/personas/CAT.png";
import GIRL from "../../assets/personas/GIRL.png";
import GREEN from "../../assets/personas/GREEN.png";
import MAN from "../../assets/personas/MAN.png";
import MERMAID from "../../assets/personas/MERMAID.png";
import ZAP from "../../assets/personas/ZAP.png";
import { API_DOMAIN } from "@env";
import { useAuth } from "@/context/AuthContext";

const PERSONA_IMAGES = {
    BIRD,
    CAT,
    GIRL,
    GREEN,
    MAN,
    MERMAID,
    ZAP,
};

type Venue = {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    image: string;
};

type EventsScrollableProps = {
    title: string;
    persona?: keyof typeof PERSONA_IMAGES;
    accent: string;
};

const shuffleArray = <T,>(array: T[]): T[] => {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
};

const EventsScrollable: React.FC<EventsScrollableProps> = ({
                                                               title,
                                                               persona,
                                                               accent,
                                                           }) => {
    const { accessToken } = useAuth();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const res = await fetch(`${API_DOMAIN}/venues`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await res.json();

                const mappedVenues = data.map((venue: any) => ({
                    id: venue.venue_id,
                    name: venue.name,
                    address: venue.address,
                    city: venue.city,
                    state: venue.state,
                    image:
                        "https://academy.la/wp-content/uploads/2024/06/best-club-near-me-hollywood-1024x576.webp",
                }));

                setVenues(shuffleArray(mappedVenues));
            } catch (error) {
                console.error("Failed to fetch venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, [accessToken]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={{ justifyContent: "center", textAlign: "center" }}>
                    Loading...
                </Text>
            </View>
        );
    }

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
                data={venues}
                keyExtractor={(venue) => venue.id}
                renderItem={({ item }) => (
                    <EventCard
                        image={item.image}
                        title={item.name}
                        subtitle={`${item.city}, ${item.state}`}
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
});

export default EventsScrollable;
