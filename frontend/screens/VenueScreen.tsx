import React from "react";
import {Text, View, Image} from "react-native";
import StarReview from "@/components/StarReview";
import UpcomingEventScroll from "@/components/UpcomingEventScroll";

const VenueScreen: React.FC = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <UpcomingEventScroll/>
        </View>
    );
}

export default VenueScreen;