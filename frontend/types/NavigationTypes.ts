// types/navigation.d.ts
import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Define the types for each screen's route parameters
export type BottomTabParamList = {
  Home: undefined;
  Browse: undefined;
  Updates: undefined;
  Profile: undefined;
  Settings: undefined;
  Venue: { 
    venue: { venue_id: string; name: string; address: string };
    defaultTab?: string;  
  };
  Rating: undefined;
  VenueReviews: undefined;
  RateReviews: { venueName: string, venueAddress: string, venueType: string, venueCity: string, username: string };
};


// Define navigation prop types for screens that need parameters
export type VenueRouteProp = RouteProp<BottomTabParamList, "Venue">;
export type BrowseRouteProp = RouteProp<BottomTabParamList, "Browse">;
export type RatingRouteProp = RouteProp<BottomTabParamList, "Rating">;
export type VenueReviewsRouteProp = RouteProp<BottomTabParamList, "VenueReviews">;
export type RateReviewsRouteProp = RouteProp<BottomTabParamList, "RateReviews">
// Define a typed navigation prop for useNavigation
export type BottomTabNavProps = BottomTabNavigationProp<BottomTabParamList>;
