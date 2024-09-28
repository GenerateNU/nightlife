import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import VenueHeader from '@/components/VenueHeader';
import UserReview from '@/components/UserReview';
import AddMedia from '@/components/AddMedia';
import PostButton from '@/components/PostButton';

const VenueReviewScreen : React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <VenueHeader />
      <UserReview />
      <AddMedia />
      <PostButton />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1c1c1e',
      padding: 10,
    },
});

export default VenueReviewScreen;
