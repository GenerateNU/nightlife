import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import VenueHeader from '@/components/VenueHeader';
import UserReview from '@/components/UserReview';
import AddMedia from '@/components/AddMedia';
import PostButton from '@/components/PostButton';

const VenueReviewScreen = () => {
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
    padding: 10,
  },
});

export default VenueReviewScreen;
