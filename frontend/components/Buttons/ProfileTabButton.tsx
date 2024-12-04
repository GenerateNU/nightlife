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
        backgroundColor: '#3a3a54',
        paddingVertical: scaleSize(10),
        borderRadius: scaleSize(8),
        alignItems: 'center',
        width: scaleSize(106),
        borderWidth: 2,
        borderColor: "#5656a6"
    },
    tabActive: {
        backgroundColor: '#000',
    },
    tabPressed: {
        backgroundColor: '#3a3a54',
    },
    icon: {
        width: scaleSize(30),
        height: scaleSize(30),
        resizeMode: 'contain',
    },
});

export default ProfileTab;
