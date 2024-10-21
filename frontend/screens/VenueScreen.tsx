import React from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import StarReview from "@/components/StarReview";
import UpcomingEventScroll from "@/components/UpcomingEventScroll";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';


const VenueScreen: React.FC = () => {
    const Tab = createBottomTabNavigator();
    return (
        <View style={styles.container}>
            <View style={styles.header}> 
                <View>
                    <Text style={{fontSize: 24}}> Venue Name </Text>
                        <View style={styles.review}> 
                            <Text> 4.7 </Text>
                            <StarReview /> 
                            <Text> (14) </Text>
                            <View style={{display: 'flex', paddingLeft: 250, flexDirection: 'row' }}>
                                <Text>Club</Text>
                                <FontAwesome style={{paddingLeft: 4}} name="circle" size={16} color="black" />
                                <FontAwesome style={{paddingLeft: 2}} name="circle" size={16} color="black" />
                                <FontAwesome style={{paddingLeft: 2}} name="circle" size={16} color="black" />
                            </View>
                        </View>
                    <View style={styles.review}> 
                        <Text> 123 Boston St </Text>
                        <Text style={{paddingLeft: 260}}> 6:00 - 2:00 AM </Text>
                    </View>
                
                </View>
                <View style={styles.bookmark}>
                    <Feather name="bookmark" size={22} color="black" />
                    <Entypo name="dots-three-vertical" size={22} color="black" />
                </View>
            </View>
            
            <UpcomingEventScroll />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: 10,
      paddingTop: 10
    },
    review: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 6,
    },
    header: {
    display: 'flex', 
    flexDirection: 'row'
    },
    bookmark: {
    paddingTop: 5,
    position: 'absolute',
    left: 415,
    display: 'flex',
     flexDirection: 'row'
    }
})


export default VenueScreen;