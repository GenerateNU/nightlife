import React from 'react';
import { Pressable, Image, StyleSheet, ImageStyle, ViewStyle, ImageSourcePropType, Dimensions } from 'react-native';

// Get device width for responsiveness
const { width } = Dimensions.get('window');

// A function to scale values based on screen width (responsive design)
const scaleSize = (size: number) => (width / 375) * size;

interface ProfileTabProps {
    onPress: () => void;
    icon: ImageSourcePropType; // Use icon as an image source
    isActive?: boolean;
    tabStyle?: ViewStyle;
    iconStyle?: ImageStyle; // Update to ImageStyle
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onPress, icon, isActive = false, tabStyle, iconStyle }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.tab,
                isActive ? styles.tabActive : null,
                pressed ? styles.tabPressed : null,
                tabStyle,
            ]}
        >
            <Image source={icon} style={[styles.icon, iconStyle]} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#333',
        paddingVertical: scaleSize(10), // Dynamically scale padding
        borderRadius: scaleSize(8), // Dynamically scale border radius
        marginHorizontal: scaleSize(5), // Dynamically scale margins
        alignItems: 'center',
        width: scaleSize(100), // Adjust width (20% of screen width)
        gap: 5, // Dynamically scale gap between icon and text
    },
    tabActive: {
        backgroundColor: '#000', // Darker background for active tab
    },
    tabPressed: {
        backgroundColor: '#555', // Even darker background when tab is pressed
    },
    icon: {
        width: scaleSize(30), // Dynamically scale icon size
        height: scaleSize(30), // Dynamically scale icon size
        resizeMode: 'contain', // Ensure icons fit well within their bounds
    },
});

export default ProfileTab;
