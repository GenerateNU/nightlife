import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import {Text, View} from "react-native";

const StarReview = ({size = 15, review = 4}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {Array.from({ length: review }, (_, index) => (
            <AntDesign key={index} name="star" size={size} />
        ))}
        </View>
    )
}

export default StarReview;