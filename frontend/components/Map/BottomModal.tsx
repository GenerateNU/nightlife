import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BottomModal = () => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Easy Access</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Highly Rated</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Happening Today</Text>
      <View style={styles.contentContainer}>
        <View style={styles.eventBox}>
        </View>
        <View style={styles.eventBox}>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1c1c1e', // Adjust to match Figma
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#333', // Adjust to match Figma
    borderRadius: 8,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventBox: {
    width: '48%',
    height: 100,
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomModal;
