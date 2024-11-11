import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity, TextInput, Image } from 'react-native';
import ProfileButtons from '@/components/Buttons/ProfileButtons';
import ProfileTabButton from '@/components/Buttons/ProfileTabButton';
import ProfileVenueCard from '@/components/VenueCards/ProfileVenueCard';
import { useAuth } from '@/context/AuthContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchUserProfileService } from '@/services/authService';

import userAddIcon from '@/assets/user-add.png';
import venuesIcon from '@/assets/venues.png';
import bookmarkIcon from '@/assets/bookmark.png';

const { width } = Dimensions.get('window');
const scaleSize = (size) => (width / 375) * size;

enum ProfileTabs {
    Friends = 'Friends',
    Bookmarks = 'Bookmarks',
    Venues = 'Venues',
}

const ProfileScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('Friends');
    const { user, accessToken, setUserAsync } = useAuth();

    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                if (user && accessToken) {
                    const userData = await fetchUserProfileService(user.email, accessToken);
                    if (userData) setUserAsync(userData);
                }
            };
            fetchData();
        }, [user, accessToken])
    );

    const toggleModal = () => setModalVisible(!isModalVisible);

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: user?.profile_picture_url || "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" }}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{user?.first_name}</Text>
                    <Text style={styles.name}>@{user?.username} • {user?.pronouns || "no pronouns"}</Text>
                    <Text style={styles.name}>12 followers</Text>
                </View>
            </View>

            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>
                    {user?.biography || "No biography for this user."}
                </Text>
            </View>

            {/* Profile Buttons */}
            <View style={styles.profileButtonsContainer}>
                <ProfileButtons onPress={() => navigation.navigate("EditProfile")} title="Edit Profile" />
                <ProfileButtons onPress={toggleModal} title="Share Profile" />
            </View>

            <View style={styles.tabsContainer}>
                <ProfileTabButton onPress={() => setActiveTab(ProfileTabs.Friends)} icon={userAddIcon} />
                <ProfileTabButton onPress={() => setActiveTab(ProfileTabs.Venues)} icon={venuesIcon} />
                <ProfileTabButton onPress={() => setActiveTab(ProfileTabs.Bookmarks)} icon={bookmarkIcon} />
            </View>

            <ScrollView style={{ marginTop: 12 }}>
                {activeTab === ProfileTabs.Friends && (
                    <View style={styles.venueListContainer}>
                        <ProfileVenueCard title="Club Passim" distance="1.3" rating="4.5 ★ (329)" image={{uri: "https://media.istockphoto.com/id/1464613492/photo/empty-music-venue-with-stage-and-bar.jpg?s=612x612&w=0&k=20&c=s8Vu1K0MLYN1FAn3_WpmrlKscl8L03v8jtn4AHMjZcU="}}/>
                        <ProfileVenueCard title="Lizard Lounge" distance="2.7" rating="4.8 ★ (112)" image={{uri: "https://www.venuboston.com/wp-content/uploads/2020/01/Venu-001-1024x683.jpg"}}/>
                        <ProfileVenueCard title="Concord Hall" distance="6.2" rating="4.2 ★ (1.2k)" image={{uri: "https://img.freepik.com/premium-photo/modern-nightclub-interior-with-neon-lights-stylish-bar-trendy-nightlife-venue_621302-8528.jpg"}}/>
                        <ProfileVenueCard title="Blue Moon" distance="0.1" rating="4.0 ★ (59)" image={{uri: "https://media.istockphoto.com/id/1464613492/photo/empty-music-venue-with-stage-and-bar.jpg?s=612x612&w=0&k=20&c=s8Vu1K0MLYN1FAn3_WpmrlKscl8L03v8jtn4AHMjZcU="}}/>
                    </View>
                )}
                {activeTab === ProfileTabs.Bookmarks && (
                    <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>Bookmarks</Text>
                )}
                {activeTab === ProfileTabs.Venues && (
                    <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>Venues</Text>
                )}
            </ScrollView>

            {/* Share Profile Modal */}
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={toggleModal} style={styles.backArrow}>
                        <Text style={styles.backArrowText}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Share Profile</Text>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        paddingTop: scaleSize(20),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleSize(24),
        marginBottom: scaleSize(6),
        gap: scaleSize(8)
    },
    profileImage: {
        width: scaleSize(80),
        height: scaleSize(80),
        borderRadius: scaleSize(40),
        backgroundColor: '#666',
        borderWidth: 3,
        borderColor: "cornflowerblue"
    },
    userInfo: {
        marginLeft: scaleSize(15),
        justifyContent: 'center',
    },
    username: {
        color: '#fff',
        fontSize: scaleSize(18),
        fontWeight: 'bold',
        fontFamily: 'Archivo_700Bold',
    },
    name: {
        color: '#aaa',
        fontSize: scaleSize(16),
        fontFamily: 'Archivo_500Medium',
    },
    friendsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: scaleSize(10),
    },
    friendsText: {
        color: '#fff',
        fontSize: scaleSize(16),
    },
    profileButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        alignSelf: 'center',
        gap: scaleSize(8),
    },
    bioContainer: {
        marginHorizontal: scaleSize(20),
        marginVertical: scaleSize(8),
        padding: scaleSize(10),
        backgroundColor: '#333',
        borderRadius: scaleSize(8),
        borderWidth: 2,
        borderColor: "gray",
    },
    bioText: {
        color: '#fff',
        fontSize: scaleSize(14),
        fontFamily: 'Archivo_500Medium',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: scaleSize(10),
        gap: 8
    },
    scrollContainer: {
        marginTop: scaleSize(10),
    },
    venueListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: scaleSize(22)
    },
    tabText: {
        color: '#fff',
        textAlign: 'center',
        marginVertical: scaleSize(20),
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: scaleSize(20),
    },
    backArrow: {
        position: 'absolute',
        top: scaleSize(40),
        left: scaleSize(20),
    },
    backArrowText: {
        color: '#fff',
        fontSize: scaleSize(24),
    },
    modalTitle: {
        color: '#fff',
        fontSize: scaleSize(24),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProfileScreen;
