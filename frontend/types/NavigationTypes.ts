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
  Venue: { venue: { venue_id: string; name: string; address: string } };
  Rating: undefined;
};

// Define navigation prop types for screens that need parameters
export type VenueRouteProp = RouteProp<BottomTabParamList, "Venue">;
export type BrowseRouteProp = RouteProp<BottomTabParamList, "Browse">;
export type RatingRouteProp = RouteProp<BottomTabParamList, "Rating">;

// Define a typed navigation prop for useNavigation
export type BottomTabNavProps = BottomTabNavigationProp<BottomTabParamList>;
