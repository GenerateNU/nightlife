import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity, Image } from 'react-native';
import ProfileButtons from '@/components/Buttons/ProfileButtons';
import ProfileTabButton from '@/components/Buttons/ProfileTabButton';
import ProfileVenueCard from '@/components/VenueCards/ProfileVenueCard';
import { useAuth } from '@/context/AuthContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchUserProfileService } from '@/services/authService';

import { API_DOMAIN } from "@env";

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

type Venue = {
    name: string;
}

type NestedVenue = {
    venue: Venue;
}

const ProfileScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('Friends');
    const { user, accessToken, setUserAsync, logout } = useAuth();
    const [friendCount, setFriendCount] = useState(0);
    const [savedVenues, setSavedVenues] = useState([]);
    const [visitedVenues, setVisitedVenues] = useState([]);
    const [reviewedVenues, setReviewedVenues] = useState([]);

    const [unauthorized, setUnauthorized] = useState(false);

    const navigation = useNavigation()

    useEffect(() => {
        const fetchData = async () => {
            if (user && accessToken) {
                const userData = await fetchUserProfileService(user.email, accessToken);
                if (userData) { setUserAsync(userData); } else { setUnauthorized(true); }
            }
        };
        try {
            fetchData();
        }
        catch (error) {
            console.error(error);
            setUnauthorized(true);
        }
    });

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                if (user && accessToken) {
                    const userData = await fetchUserProfileService(user.email, accessToken);
                    if (userData) { setUserAsync(userData); } else { setUnauthorized(true); }
                }
            };
            const fetchFriendCount = async () => {
                if (user && accessToken) {
                    const response = await fetch(`${API_DOMAIN}/friendships/${user.user_id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const data = await response.json();
                    setFriendCount(data.length);
                }
            }
            const fetchSavedVenues = async () => {
                if (user && accessToken) {
                    const response = await fetch(`${API_DOMAIN}/profiles/saved-venues/${user.user_id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data)
                    if (data) {
                        setSavedVenues(data);
                    }
                }
            }
            const fetchVisitedVenues = async () => {
                if (user && accessToken) {
                    const response = await fetch(`${API_DOMAIN}/profiles/visited-venues/${user.user_id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const data = await response.json();
                    if (data) {
                        setVisitedVenues(data);
                    }
                }
            }
            const fetchReviewedVenues = async () => {
                if (user && accessToken) {
                    const response = await fetch(`${API_DOMAIN}/profiles/reviewed-venues/${user.user_id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const data = await response.json();
                    if (data) {
                        setReviewedVenues(data);
                    }
                }
            }
            fetchData();
            fetchFriendCount();
            fetchSavedVenues();
            fetchVisitedVenues();
            fetchReviewedVenues();
        }, [])
    );

    const toggleModal = () => setModalVisible(!isModalVisible);

    return (
        unauthorized ? (
            <View style={styles.container}>
                <Text style={{ color: '#fff', textAlign: "center" }}>Unauthorized</Text>
                <TouchableOpacity
                    onPress={logout}
                    style={{
                        backgroundColor: 'red',
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: '#fff', textAlign: "center" }}>Logout</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.container}>
       
                <View style={styles.headerContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: user?.profile_picture_url ||
                                "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
                        }}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{user?.first_name}</Text>
                        <Text style={styles.name}>
                            @{user?.username} • {user?.pronouns || "no pronouns"}
                        </Text>
                        <Text style={styles.name}>
                            {friendCount} friend(s) • {user?.age} yrs
                        </Text>
                    </View>
                </View>
    
                <View style={styles.bioContainer}>
                    <Text style={styles.bioText}>
                        {user?.biography || "No biography for this user."}
                    </Text>
                </View>
    
                <View style={styles.profileButtonsContainer}>
                    <ProfileButtons
                        onPress={() => navigation.navigate("EditProfile")}
                        title="Edit Profile"
                    />
                    <ProfileButtons onPress={toggleModal} title="Share Profile" />
                </View>
    
                <View style={styles.tabsContainer}>
                    <ProfileTabButton
                        onPress={() => setActiveTab(ProfileTabs.Friends)}
                        icon={userAddIcon}
                    />
                    <ProfileTabButton
                        onPress={() => setActiveTab(ProfileTabs.Venues)}
                        icon={venuesIcon}
                    />
                    <ProfileTabButton
                        onPress={() => setActiveTab(ProfileTabs.Bookmarks)}
                        icon={bookmarkIcon}
                    />
                </View>
    
                <ScrollView style={{ marginTop: 6 }}>
                    {activeTab === ProfileTabs.Friends && (
                        <View style={styles.venueListContainer}>
                            {reviewedVenues &&
                                reviewedVenues.map((venue: NestedVenue, index) => (
                                    <ProfileVenueCard
                                        key={index}
                                        title={venue.venue.name}
                                        distance="0"
                                        rating="4.5 ★ (329)"
                                        image={{
                                            uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                                        }}
                                    />
                                ))}
                        </View>
                    )}
                    {activeTab === ProfileTabs.Bookmarks && (
                        <View style={styles.venueListContainer}>
                            {savedVenues &&
                                savedVenues.map((venue: Venue, index) => (
                                    <ProfileVenueCard
                                        key={index}
                                        title={venue.name}
                                        distance="0"
                                        rating="4.5 ★ (329)"
                                        image={{
                                            uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                                        }}
                                    />
                                ))}
                        </View>
                    )}
                    {activeTab === ProfileTabs.Venues && (
                        <View style={styles.venueListContainer}>
                            {visitedVenues &&
                                visitedVenues.map((venue: Venue, index) => (
                                    <ProfileVenueCard
                                        key={index}
                                        title={venue.name}
                                        distance="0"
                                        rating="4.5 ★ (329)"
                                        image={{
                                            uri: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                                        }}
                                    />
                                ))}
                        </View>
                    )}
                </ScrollView>
    
                <Modal visible={isModalVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={styles.backArrow}
                        >
                            <Text style={styles.backArrowText}>{'<'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Share Profile</Text>
                    </View>
                </Modal>
            </View>
        )
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
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
        borderColor: "#5656a6"
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
        backgroundColor: '#3a3a54',
        borderRadius: scaleSize(8),
        borderWidth: 2,
        borderColor: "#5656a6",
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
