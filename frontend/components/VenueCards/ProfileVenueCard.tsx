import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';

const { width } = Dimensions.get('window');
const scaleSize = (size: number) => (width / 375) * size;

interface ProfileVenueCardProps {
    image?: ImageSourcePropType; 
    title: string;
    distance: string;
    rating: string;
}

const ProfileVenueCard: React.FC<ProfileVenueCardProps> = ({ image, title, distance, rating }) => {
    return (
        <View style={styles.card}>

            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={image} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                )}
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.distance}>{distance} mi</Text>
                <Text style={styles.rating}>{rating}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: (width / 2.2) - scaleSize(10),
        backgroundColor: '#333',
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 4,
        borderWidth: 2,
        borderColor: "gray"
    },
    imageContainer: {
        height: width * 0.3,
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
        fontFamily: 'Archivo_500Medium',
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
        fontFamily: 'Archivo_700Bold',
    },
    distance: {
        color: '#bbb',
        fontSize: scaleSize(14),
        marginBottom: scaleSize(8),
        fontFamily: 'Archivo_500Medium',
    },
    rating: {
        color: '#fff',
        fontSize: scaleSize(14),
        position: 'absolute',
        bottom: scaleSize(8),
        right: scaleSize(8),
        fontFamily: 'Archivo_500Medium',
    },
});

export default ProfileVenueCard;