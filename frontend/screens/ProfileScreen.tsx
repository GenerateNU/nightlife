import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity, TextInput, Button } from 'react-native';
import ProfileButtons from '@/components/Buttons/ProfileButtons';
import ProfileVenueCard from '@/components/VenueCards/ProfileVenueCard';
import ProfileTabButton from '@/components/Buttons/ProfileTabButton';

const { width } = Dimensions.get('window');

// Function to scale size based on the screen width
const scaleSize = (size: number) => (width / 375) * size;

const ProfileScreen: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false); 
    const [isEditModalVisible, setEditModalVisible] = useState(false); 

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
            {/* Profile Header */}
            <View style={styles.headerContainer}>
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
                <ProfileButtons onPress={toggleEditModal} title="edit profile" /> 
                <ProfileButtons onPress={toggleModal} title="share profile" /> 
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
                            <View style={styles.profileImagePlaceholder} />
                            <Text style={styles.name}>name</Text>
                            <Text style={styles.username}>@username</Text>
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
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: scaleSize(16),
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
