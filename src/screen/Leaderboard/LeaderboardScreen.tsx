import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../../../helper";
import { Images } from "../../assets/images";
import { Colors, fonts } from "../../constant";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../constant/navigation.constants";
import RNPickerSelect from "react-native-picker-select";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { SafeAreaView } from "react-native-safe-area-context";

interface LeaderboardEntry {
  id: number;
  name: string;
  accuracy: string;
  isCurrentUser: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    id: 1,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
  {
    id: 2,
    name: "Jacob Jones",
    accuracy: "72.70% Accurate",
    isCurrentUser: false,
  },
  {
    id: 3,
    name: "Jacob Jones",
    accuracy: "71.50% Accurate",
    isCurrentUser: false,
  },
  {
    id: 4,
    name: "Jacob Jones",
    accuracy: "67.55% Accurate",
    isCurrentUser: false,
  },
  {
    id: 7,
    name: "Brooklyn Simmons",
    accuracy: "60.34% Accurate",
    isCurrentUser: true,
  },
  {
    id: 8,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
  {
    id: 9,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
  {
    id: 10,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
  {
    id: 11,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
  {
    id: 12,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
  {
    id: 13,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
  {
    id: 14,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
  {
    id: 15,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
  },
];

const dummyDates = [
  {
    label: "All-Time",
    value: 0,
  },
  {
    label: "Week",
    value: 1,
  },
  {
    label: "Month",
    value: 2,
  },
];

const LeaderboardScreen = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("August 24 (OnGoing)");

  const navigation = useNavigation();

  const onSearchPress = () => {
    navigation.navigate(SCREENS.SEARCH);
  };

  const renderEntry = ({ item }: { item: LeaderboardEntry }) => (
    <View
      style={[styles.entryContainer, item.isCurrentUser && styles.currentUser]}
    >
      <View style={styles.rankContainer}>
        <Text style={styles.id}>{item.id}</Text>
        <Image source={Images.avatar6} style={styles.avatar} />
        <View>
          <Text style={styles.name}>
            {item.name}{" "}
            {item.isCurrentUser && <Text style={styles.youText}>You</Text>}
          </Text>
          <Text style={styles.accuracy}>{item.accuracy}</Text>
        </View>
      </View>
      <Image source={Images.Chevron_right} />
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Leaderboard</Text>
            <View style={styles.rankLabel}>
              <Text style={styles.rankNumber}>#7</Text>
              <Text style={styles.rankText}>You</Text>
            </View>
          </View>
          <View></View>
          <View style={{ paddingHorizontal: 15 }}>
            <TouchableOpacity onPress={onSearchPress}>
              <Image
                source={Images.headerSearch}
                style={{
                  height: scale(18),
                  width: scale(18),
                  justifyContent: "flex-end",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                paddingHorizontal: 7,
                fontSize: scale(16),
                marginLeft: moderateScale(10),
                color: "#717272",
                fontWeight: "500",
              }}
            >
              #
            </Text>
            <Text
              style={{
                paddingHorizontal: 7,
                fontSize: scale(16),
                marginLeft: moderateScale(4),
                color: "#717272",
                fontWeight: "400",
              }}
            >
              Predictors
            </Text>
          </View>
          <View style={{ marginEnd: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <RNPickerSelect
              onValueChange={setSelectedOption}
              items={dummyDates}
              placeholder={{}}
              style={{
                viewContainer: { marginRight: 8 },
                inputIOS: {
                  color: "#717272",
                  fontFamily: fonts.f400,
                  fontSize: 14,
                  fontWeight: "400",
                },
                inputAndroid: {
                  color: "#717272",
                  fontFamily: fonts.f400,
                  fontSize: 14,
                  fontWeight: "400",
                },
              }}
            /> */}
              <Image source={Images.Chevron_down} />
            </View>
          </View>
        </View>

        <FlatList
          data={leaderboardData}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(10),
  },
  headerText: {
    fontSize: scale(22),
    fontWeight: "800",
    color: Colors.textBlack,
  },
  rankLabel: {
    flexDirection: "row",
    backgroundColor: "#CCDFF7",
    borderRadius: moderateScale(6),
    padding: moderateScale(4),
    marginStart: 10,
  },
  rankNumber: {
    fontSize: scale(15),
    color: "#024BAC",
    fontWeight: "bold",
  },
  rankText: {
    fontSize: scale(15),
    marginLeft: moderateScale(4),
    color: "#024BAC",
    fontWeight: "bold",
  },
  filterText: {
    fontSize: scale(15),
    color: Colors.textBlack,
    fontWeight: "300",
  },
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  currentUser: {
    backgroundColor: "#e0f2ff",
  },
  rankContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: 8,
    marginRight: moderateScale(8),
  },
  name: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: Colors.textBlack,
  },
  id: {
    fontSize: scale(16),
    fontWeight: "500",
    marginRight: 15,
    color: Colors.textBlack,
  },
  youText: {
    color: "#024BAC",
    fontSize: scale(16),
  },
  accuracy: {
    fontSize: scale(14),
    fontWeight: "500",
  },
  dropdown: {
    position: "absolute",
    top: verticalScale(100),
    left: scale(204),
    backgroundColor: "#101010",
    borderColor: "#E7E7E7",
    borderWidth: 1,
    borderRadius: 16,
    padding: scale(10),
    zIndex: 1000,
    width: scale(165),
  },

  box: {
    height: 19,
    width: 19,
    marginRight: 8,
  },

  dropdownItem: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(5),
  },

  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LeaderboardScreen;
