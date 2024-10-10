import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../helper';
import { Images } from '../../assets/images';
import { Colors } from '../../constant';


interface LeaderboardEntry {
  id: number;
  name: string;
  accuracy: string;
  isCurrentUser: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  { id: 1, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
  { id: 2, name: 'Jacob Jones', accuracy: '72.70% Accurate', isCurrentUser: false },
  { id: 3, name: 'Jacob Jones', accuracy: '71.50% Accurate', isCurrentUser: false },
  { id: 4, name: 'Jacob Jones', accuracy: '67.55% Accurate', isCurrentUser: false },
  { id: 7, name: 'Brooklyn Simmons', accuracy: '60.34% Accurate', isCurrentUser: true },
  { id: 8, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
  { id: 9, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
  { id: 10, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
  { id: 11, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
  { id: 12, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
  { id: 13, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
  { id: 14, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
  { id: 15, name: 'Jacob Jones', accuracy: '78.90% Accurate', isCurrentUser: false },
];

const LeaderboardScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All-time');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const renderEntry = ({ item }: { item: LeaderboardEntry }) => (
    <View style={[styles.entryContainer, item.isCurrentUser && styles.currentUser]}>
      <View style={styles.rankContainer}>
        <Text style={styles.id}>{item.id}</Text>
        <Image
          source={Images.avatar6}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>
            {item.name} {item.isCurrentUser && <Text style={styles.youText}>You</Text>}
          </Text>
          <Text style={styles.accuracy}>{item.accuracy}</Text>
        </View>
      </View>
      <Image
        source={Images.Chevron_right}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderColor: '#e0e0e0', }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Leaderboard</Text>
          <View style={styles.rankLabel}>
            <Text style={styles.rankNumber}>#7</Text>
            <Text style={styles.rankText}>You</Text>
          </View>
        </View>
        <View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Image
            source={Images.headerSearch}
            style={{ height: scale(18), width: scale(18), justifyContent: "flex-end" }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, alignItems: "center", borderBottomWidth: 1, borderColor: '#e0e0e0', }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ paddingHorizontal: 7, fontSize: scale(16), marginLeft: moderateScale(10), color: '#717272', fontWeight: '500' }}>#</Text>
          <Text style={{ paddingHorizontal: 7, fontSize: scale(16), marginLeft: moderateScale(4), color: '#717272', fontWeight: '400' }}>Predictors</Text>
        </View>
        <View style={{ marginEnd: 15 }}>
          <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={styles.filterText}>{selectedFilter}</Text>
              <Image
                source={Images.Chevron_down}
                style={{marginLeft: 10}}
              />
          
            </View>
           
          </TouchableOpacity>
        </View>
      </View>




      <FlatList
        data={leaderboardData}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsFilterModalVisible(false)}>
          <View style={styles.modalContainer}>
            {['All-time', 'Month', 'Week'].map((filter) => (
              <Pressable
                key={filter}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedFilter(filter);
                  setIsFilterModalVisible(false);
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", }}>
                  {selectedFilter === filter && <Image
                    source={Images.Check}
                    style={{ marginHorizontal: 20 }}
                  />
                  }
                  <Text style={selectedFilter === filter ? styles.selectedOption : styles.optionText}>
                    {filter}
                  </Text>
                </View>

              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(10),
  },
  headerText: {
    fontSize: scale(22),
    fontWeight: '800',
    color: Colors.textBlack
  },
  rankLabel: {
    flexDirection: 'row',
    backgroundColor: '#CCDFF7',
    borderRadius: moderateScale(6),
    padding: moderateScale(4),
    marginStart: 10
  },
  rankNumber: {
    fontSize: scale(15),
    color: '#024BAC',
    fontWeight: 'bold',
  },
  rankText: {
    fontSize: scale(15),
    marginLeft: moderateScale(4),
    color: '#024BAC',
    fontWeight: 'bold',
  },
  filterText: {
    fontSize: scale(15),
    color: Colors.textBlack,
    fontWeight: '300',
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  currentUser: {
    backgroundColor: '#e0f2ff',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: 8,
    marginRight: moderateScale(8),
  },
  name: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: Colors.textBlack
  },
  id: {
    fontSize: scale(16),
    fontWeight: '500',
    marginRight: 15,
    color: Colors.textBlack
  },
  youText: {
    color: '#024BAC',
    fontSize: scale(16),
  },
  accuracy: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: verticalScale(100),
    paddingRight: moderateScale(14),
  },
  modalContainer: {
    backgroundColor: Colors.labelBlack,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    width: moderateScale(170),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  modalOption: {
    paddingVertical: verticalScale(10),
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: scale(16),
    color: '#fff',

  },
  selectedOption: {
    fontSize: scale(16),
    color: '#fff',
    fontWeight: 'bold',
    paddingRight: scale(45)
  },
});

export default LeaderboardScreen;
