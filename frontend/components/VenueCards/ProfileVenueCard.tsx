import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';

// Get screen width for dynamic sizing
const { width } = Dimensions.get('window');

// A function to scale size values dynamically based on screen width
const scaleSize = (size: number) => (width / 375) * size;

interface ProfileVenueCardProps {
    image?: ImageSourcePropType; // Optional image source
    title: string;
    distance: string;
    rating: string;
}

const ProfileVenueCard: React.FC<ProfileVenueCardProps> = ({ image, title, distance, rating }) => {
    return (
        <View style={styles.card}>
            {/* Image section */}
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={image} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                )}
            </View>

            {/* Text Section */}
            <View style={styles.infoContainer}>
                {/* Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Distance */}
                <Text style={styles.distance}>{distance} mi</Text>

                {/* Rating */}
                <Text style={styles.rating}>{rating}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: (width / 2.2) - scaleSize(16), // 48% of the screen width minus margins
        backgroundColor: '#4f4f4f',
        borderRadius: 8,
        overflow: 'hidden',
        margin: scaleSize(8), // Dynamic margin between cards
    },
    imageContainer: {
        height: width * 0.3, // Dynamic height based on screen width (30% of screen width)
        backgroundColor: '#000',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    placeholderText: {
        color: '#fff',
        fontSize: scaleSize(16),
    },
    infoContainer: {
        padding: scaleSize(8),
        backgroundColor: '#333',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scaleSize(16),
        marginBottom: scaleSize(4),
    },
    distance: {
        color: '#bbb',
        fontSize: scaleSize(14),
        marginBottom: scaleSize(8),
    },
    rating: {
        color: '#fff',
        fontSize: scaleSize(14),
        position: 'absolute',
        bottom: scaleSize(8),
        right: scaleSize(8),
    },
});

export default ProfileVenueCard;
