import React, { useState, useEffect } from "react";
import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import StarReview from "@/components/StarReview";
import UpcomingEventScroll from "@/components/UpcomingEventScroll";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RatingScrollBar from "@/components/RatingScrollBar";

const RatingScreen: React.FC = () => {
    return (
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={{marginLeft: -4, color: 'white', fontSize: 26, fontWeight: 'bold'}}>Royale</Text>
                        <View style={styles.review}> 
                            <Text style={{color: 'white'}}> 4.7 </Text>
                            <StarReview /> 
                            <Text style={{color: 'white'}}> (14) </Text>
                            <View style={{display: 'flex', paddingLeft: 165, flexDirection: 'row' }}>
                                <Text style={{color: 'white'}}>Club</Text>
                                <FontAwesome style={{paddingLeft: 4}} name="circle" size={16} color="white" />
                                <FontAwesome style={{paddingLeft: 2}} name="circle" size={16} color="white" />
                                <FontAwesome style={{paddingLeft: 2}} name="circle" size={16} color="white" />
                            </View>
                        </View>
                        <View style={styles.review}> 
                             <Text style={{color: 'white'}}>5</Text>
                             <Text style={{color: 'white', paddingLeft: 172}}> 6:00 - 2:00 AM </Text>
                         </View>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                        <RatingScrollBar minTitle="Chill" maxTitle="Energetic"/>
                        <RatingScrollBar minTitle="Underground" maxTitle="Mainstream"/>
                        <RatingScrollBar minTitle="Affordable" maxTitle="Expensive"/>
                        <RatingScrollBar minTitle="Classy" maxTitle="Rowdy"/>
                        <RatingScrollBar minTitle="Sit down" maxTitle="Rave"/>
                        <RatingScrollBar minTitle="Casual" maxTitle="Exclusive"/>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
    },
    review: {
    display: 'flex',
    flexDirection: 'row',
    },
    header: {
    display: 'flex', 
    flexDirection: 'row'
    },
    bookmark: {
    paddingTop: 5,
    right: 40,
    display: 'flex',
     flexDirection: 'row'
    },
    tabContainer: {
        marginTop: -20
    },
    buttonText: {
    fontSize: 14, 
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    },
    button: {
    backgroundColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 30
    },
    text: {
        fontSize: 24,
        marginBottom: 10,
        color: 'white',
      },
      slider: {
        width: 300,
        height: 40,
      },
      thumb: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#1EB1FC',
        position: 'absolute',
        top: -10,
      },
      
    });
    


export default RatingScreen;
    