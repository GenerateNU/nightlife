import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const scaleSize = (size: number) => (width / 375) * size;

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
                pressed && styles.buttonPressed,
            ]}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3a3a54',
        paddingVertical: scaleSize(12),
        paddingHorizontal: scaleSize(0),
        borderRadius: scaleSize(6),
        borderWidth: 2,
        borderColor: '#5656a6',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.435,
    },
    text: {
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: scaleSize(14),
        fontFamily: 'Archivo_700Bold',
    },
    buttonPressed: {
        backgroundColor: '#0056b3',
    },
});

export default ProfileButton;
