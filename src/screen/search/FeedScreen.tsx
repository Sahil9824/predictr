import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PredictionCard from "../../component/PredictionCard"; 


const data = [
  { id: '1', index: 0 },
  { id: '2', index: 1 },
  { id: '3', index: 2 },
  { id: '4', index: 3 }
];

const FeedScreen = () => {

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={{ paddingHorizontal: 16 }}>
          </View>
        </>
      }
      data={data}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 16 }}>
          <PredictionCard index={item.index} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      scrollEventThrottle={16}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default FeedScreen;
