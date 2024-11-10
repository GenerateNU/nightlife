import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity, TextInput } from 'react-native';
import ProfileButtons from '@/components/Buttons/ProfileButtons';
import ProfileVenueCard from '@/components/VenueCards/ProfileVenueCard';
import ProfileTabButton from '@/components/Buttons/ProfileTabButton';

import userAddIcon from '@/assets/user-add.png';
import venuesIcon from '@/assets/venues.png';
import bookmarkIcon from '@/assets/bookmark.png';

import { Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import EditProfile from './profile/EditProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

// Function to scale size based on the screen width
const scaleSize = (size: number) => (width / 375) * size;

enum ProfileTabs {
    Friends = 'Friends',
    Bookmarks = 'Bookmarks',
    Venues = 'Venues',
}

const ProfileScreen: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false); 
    const [isEditModalVisible, setEditModalVisible] = useState(false); 
    const [activeTab, setActiveTab] = useState(ProfileTabs.Friends);
    const { user } = useAuth();


    const navigation = useNavigation();

    // Function to toggle modal visibility
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Function to toggle edit modal visibility
    const toggleEditModal = () => {
        setEditModalVisible(!isEditModalVisible);
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.profileImagePlaceholder} source={{ uri: user?.profile_picture_url || "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"}} />
                <Text style={styles.username}>@{user?.username}</Text>
                <Text style={styles.name}>{user?.first_name + " " + user?.email}</Text>
            </View>

            <View style={styles.friendsContainer}>
                <Text style={styles.friendsText}>22 friends</Text>
                <Text style={styles.friendsText}>16 followers</Text>
            </View>

            <View style={styles.profileButtonsContainer}>
                <ProfileButtons onPress={toggleModal} title="edit profile" /> 
                <ProfileButtons onPress={toggleModal} title="share profile" /> 
            </View>

            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>
                    This is a very interesting bio that tells you a lot about this user... at least, I think so.
                </Text>
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabsContainer}>
                <ProfileTabButton onPress={() => setActiveTab(ProfileTabs.Friends)} icon={userAddIcon} />
                <ProfileTabButton onPress={() => setActiveTab(ProfileTabs.Venues)} icon={venuesIcon} />
                <ProfileTabButton onPress={() => setActiveTab(ProfileTabs.Bookmarks)} icon={bookmarkIcon} />
            </View>

            {/* Venue List */}
            <ScrollView style={{ marginTop: 12 }}>
                {activeTab === ProfileTabs.Friends && (
                    <View style={styles.venueListContainer}>
                        <ProfileVenueCard title="Club Passim" distance="1.3" rating="4.5 ★ (329)" image={{uri: "https://media.istockphoto.com/id/1464613492/photo/empty-music-venue-with-stage-and-bar.jpg?s=612x612&w=0&k=20&c=s8Vu1K0MLYN1FAn3_WpmrlKscl8L03v8jtn4AHMjZcU="}}/>
                        <ProfileVenueCard title="Lizard Lounge" distance="2.7" rating="4.8 ★ (112)" image={{uri: "https://media.istockphoto.com/id/1464613492/photo/empty-music-venue-with-stage-and-bar.jpg?s=612x612&w=0&k=20&c=s8Vu1K0MLYN1FAn3_WpmrlKscl8L03v8jtn4AHMjZcU="}}/>
                        <ProfileVenueCard title="Concord Hall" distance="6.2" rating="4.2 ★ (1.2k)" image={{uri: "https://media.istockphoto.com/id/1464613492/photo/empty-music-venue-with-stage-and-bar.jpg?s=612x612&w=0&k=20&c=s8Vu1K0MLYN1FAn3_WpmrlKscl8L03v8jtn4AHMjZcU="}}/>
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
            <Modal
                visible={isModalVisible} 
                transparent={false} 
                animationType="fade" 
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    {/* Back Button - Small Arrow */}
                    <TouchableOpacity onPress={toggleModal} style={styles.backArrow}>
                        <Text style={styles.backArrowText}>{'<'}</Text>
                    </TouchableOpacity>

                    {/* Modal Content */}
                    <View style={styles.modalContent}>
                        {/* Profile Image and Info */}
                        <View style={styles.profileCard}>
                            <Image style={styles.profileImagePlaceholder} source={{ uri: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"}} />
                            <Text style={styles.username}>@{user?.username}</Text>
                            <Text style={styles.name}>{user?.first_name}</Text>
                        </View>

                        {/* Placeholder for QR Code */}
                        <View style={styles.qrCodePlaceholder}>
                            <Text style={styles.qrCodeText}>qr code</Text>
                        </View>

                        {/* Buttons for Copy and Share */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.copyButton}>
                                <Text style={styles.buttonText}>copy link</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareButton}>
                                <Text style={styles.buttonText}>share link</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit Profile Modal */}
            <Modal
                visible={isEditModalVisible}
                transparent={false} 
                animationType="slide" 
                onRequestClose={toggleEditModal}
            >
                <ScrollView contentContainerStyle={styles.modalContainer}>
                    <TouchableOpacity onPress={toggleEditModal} style={styles.backArrow}>
                        <Text style={styles.backArrowText}>{'<'}</Text>
                    </TouchableOpacity>

                    {/* Edit Form */}
                    <View style={styles.editProfileForm}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>

                        {/* Username Field */}
                        <TextInput 
                            style={styles.inputField}
                            placeholder="Username"
                            placeholderTextColor="#888"
                        />

                        {/* First Name Field */}
                        <TextInput 
                            style={styles.inputField}
                            placeholder="First Name"
                            placeholderTextColor="#888"
                        />

                        {/* Bio Field */}
                        <TextInput 
                            style={[styles.inputField, styles.bioInput]} 
                            placeholder="Bio"
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor="#888"
                        />

                        {/* Location Field */}
                        <TextInput 
                            style={styles.inputField}
                            placeholder="Location"
                            placeholderTextColor="#888"
                        />
                        {/* Save Button */}
                        <TouchableOpacity style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        paddingTop: scaleSize(20),
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
        marginVertical: scaleSize(10),
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleSize(14)
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
        marginTop: scaleSize(0),
        gap: scaleSize(16),
    },
    bioContainer: {
        marginVertical: scaleSize(8),
        marginHorizontal: scaleSize(26),
        padding: scaleSize(12),
        backgroundColor: '#333',
        borderRadius: scaleSize(10),
    },
    bioText: {
        color: '#fff',
        fontSize: scaleSize(16),
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '88%',
    },
    venueListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: scaleSize(15),
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: scaleSize(20),
        alignItems: 'center',
    },
    profileCard: {
        alignItems: 'center',
        marginBottom: scaleSize(20),
    },
    qrCodePlaceholder: {
        width: scaleSize(250),
        height: scaleSize(250),
        backgroundColor: 'rgba(255, 105, 180, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(20),
        marginVertical: scaleSize(20),
    },
    qrCodeText: {
        color: '#fff',
        fontSize: scaleSize(18),
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: scaleSize(40),
    },
    copyButton: {
        flex: 1,
        backgroundColor: 'rgba(255, 105, 180, 0.8)',
        paddingVertical: scaleSize(15),
        marginRight: scaleSize(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(10),
    },
    shareButton: {
        flex: 1,
        backgroundColor: 'rgba(255, 105, 180, 0.8)',
        paddingVertical: scaleSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(10),
    },
    buttonText: {
        color: '#fff',
        fontSize: scaleSize(16),
        fontWeight: '600',
    },
    backArrow: {
        position: 'absolute', 
        top: scaleSize(50), 
        left: scaleSize(20),
        paddingVertical: scaleSize(10),
        paddingHorizontal: scaleSize(15), 
    },
    backArrowText: {
        color: '#fff',
        fontSize: scaleSize(30),
    },
    // Edit Profile Modal Styles
    editProfileForm: {
        width: '90%',
        padding: scaleSize(20),
    },
    modalTitle: {
        color: '#fff',
        fontSize: scaleSize(24),
        fontWeight: 'bold',
        marginBottom: scaleSize(20),
        textAlign: 'center',
    },
    inputField: {
        backgroundColor: '#333',
        color: '#fff',
        paddingVertical: scaleSize(10),
        paddingHorizontal: scaleSize(15),
        borderRadius: scaleSize(10),
        fontSize: scaleSize(16),
        marginBottom: scaleSize(15),
    },
    bioInput: {
        height: scaleSize(100),
        textAlignVertical: 'top',
    },
    profilePicContainer: {
        alignItems: 'center',
        marginVertical: scaleSize(20),
    },
    profilePicLabel: {
        color: '#fff',
        fontSize: scaleSize(18),
        marginBottom: scaleSize(10),
    },
    profilePicPlaceholder: {
        width: scaleSize(80),
        height: scaleSize(80),
        borderRadius: scaleSize(40),
        backgroundColor: '#666',
    },
    saveButton: {
        backgroundColor: 'rgba(255, 105, 180, 0.8)',
        paddingVertical: scaleSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(10),
        marginTop: scaleSize(20),
    },
    saveButtonText: {
        color: '#fff',
        fontSize: scaleSize(16),
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
