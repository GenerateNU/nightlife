import React from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import ProfileButtons from '@/components/Buttons/ProfileButtons';
import ProfileVenueCard from '@/components/VenueCards/ProfileVenueCard';
import ProfileTabButton from '@/components/Buttons/ProfileTabButton';

// Get device width and height for dynamic scaling
const { width } = Dimensions.get('window');

// Function to scale size based on the screen width
const scaleSize = (size: number) => (width / 375) * size;

const ProfileScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                {/* Placeholder for Profile Image */}
                <View style={styles.profileImagePlaceholder} />
                <Text style={styles.username}>@username</Text>
                <Text style={styles.name}>name</Text>
            </View>

            {/* Friends Count */}
            <View style={styles.friendsContainer}>
                <View style={styles.friendsButton}>
                    <Text style={styles.friendsText}>[#] friends</Text>
                </View>
            </View>

            {/* Profile Buttons */}
            <View style={styles.profileButtonsContainer}>
                <ProfileButtons onPress={() => {}} title="edit profile" />
                <ProfileButtons onPress={() => {}} title="share profile" />
            </View>

            <Text style={styles.bioText}>bio</Text>

            {/* Tab Navigation */}
            <View style={styles.tabsContainer}>
                <ProfileTabButton onPress={() => {}} icon={require('@/assets/favicon.png')} />
                <ProfileTabButton onPress={() => {}} icon={require('@/assets/favicon.png')} />
                <ProfileTabButton onPress={() => {}} icon={require('@/assets/favicon.png')} />
            </View>

            {/* Venue List */}
            <ScrollView style={{ marginTop: 20 }}>
                <View style={styles.venueListContainer}>
                    <ProfileVenueCard title="Awesome Venue" distance="5.3" rating="4.5 ★" />
                    <ProfileVenueCard title="Rock Concert" distance="2.7" rating="4.8 ★" />
                    <ProfileVenueCard title="No Image Venue" distance="6.2" rating="4.2 ★" />
                    <ProfileVenueCard title="Venue 4" distance="7.1" rating="4.0 ★" />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        paddingTop: scaleSize(40),
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
    profileImagePlaceholder: {
        width: scaleSize(80),
        height: scaleSize(80),
        borderRadius: scaleSize(40),
        backgroundColor: '#666',
        marginBottom: scaleSize(10),
    },
    username: {
        color: '#fff',
        fontSize: scaleSize(18),
        fontWeight: 'bold',
    },
    name: {
        color: '#fff',
        fontSize: scaleSize(16),
    },
    friendsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleSize(10),
        marginBottom: scaleSize(10),
    },
    friendsButton: {
        backgroundColor: '#444',
        paddingVertical: scaleSize(10),
        paddingHorizontal: scaleSize(20),
        borderRadius: scaleSize(50),
        marginRight: scaleSize(10),
    },
    friendsText: {
        color: '#fff',
        fontSize: scaleSize(16),
    },
    profileButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: scaleSize(15),
    },
    bioText: {
        color: '#fff',
        marginTop: scaleSize(10),
        marginBottom: scaleSize(20),
        fontSize: scaleSize(16),
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: scaleSize(10),
    },
    venueListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow items to wrap to the next line
        justifyContent: 'space-between', // Distribute items across the row
        padding: scaleSize(16),
    },
});

export default ProfileScreen;
