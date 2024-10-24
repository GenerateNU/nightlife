import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import {View} from "react-native";

const StarReview = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {Array.from({ length: 4 }, (_, index) => (
            <AntDesign key={index} name="star" size={15} color="white"/>
        ))}
        </View>
    )
}

export default StarReview;