import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, Dimensions } from 'react-native';

// Get device width for dynamic sizing
const { width } = Dimensions.get('window');

// A function to scale size values dynamically based on the screen width
const scaleSize = (size: number) => (width / 375) * size; // Assuming 375 is the base width for iPhone

interface ProfileButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onPress, title, buttonStyle, textStyle }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                buttonStyle,
                pressed && styles.buttonPressed, // Apply pressed style when active
            ]}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000', // Default background color
        paddingVertical: scaleSize(12.8), // Scaled padding
        paddingHorizontal: scaleSize(48), // Scaled padding for width
        borderRadius: scaleSize(99), // Scaled border radius for rounded edges
        borderWidth: 2, // Static 2px border
        borderColor: 'transparent', // No visible border
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.4, // Make the button width 80% of the screen width
    },
    text: {
        color: '#fff', // White text color
        textTransform: 'uppercase', // Uppercase text
        fontWeight: '900', // Bold font
        fontSize: scaleSize(10), // Scaled font size
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif', // System fonts
    },
    buttonPressed: {
        backgroundColor: '#0056b3', // Darker blue when pressed
    },
});

export default ProfileButton;
