import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from '../../assets/images';
import { scale } from '../../../helper';

const mockData = [
  { id: '1', name: 'Jacob Jones', accuracy: '78.90%' },
  { id: '2', name: 'Jacob Jones', accuracy: '78.90%' },
  { id: '3', name: 'Jacob Jones', accuracy: '78.90%' },
  { id: '4', name: 'Jacob Jones', accuracy: '78.90%' },
  { id: '5', name: 'Jacob Jones', accuracy: '78.90%' },
];

const PredictorsScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          {/* Avatar */}
          <Image
            source={Images.avatar6}
            style={{
              height: scale(40),
              width: scale(40),
              borderRadius: 8,
              marginRight: 8,
            }}
          />
          {/* Name and Accuracy */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.accuracy}>{item.accuracy} Accurate</Text>
          </View>
          {/* Follow Button */}
          <TouchableOpacity>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
        {/* Divider */}
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <FlatList
      data={mockData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  accuracy: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  followButtonText: {
    color: '#024BAC',
    fontWeight: '800',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginLeft: scale(48), 
  },
});

export default PredictorsScreen;
