import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Image,
} from "react-native";
import Icons from "./Icons";
import { ICONS } from "../constant/icons.constants";
import { fonts } from "../constant";
import { scale } from "../../helper";
import { Images } from "../assets/images";

const Contests = ({ openBottomSheet }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("August 24 (OnGoing)");

  const dummyDates = [
    "August 24 (OnGoing)",
    "July 30",
    "June 11",
    "June 5",
    "June 21",
    "June 22",
    "June 23",
    "June 24",
    "June 25",
    "June 26",
  ];

  const dummyUsers = [
    {
      name: "Edwards Nilson",
      accuracy: "88%",
      predictionNos: 10,
      rank: 1,
    },
    {
      name: "Mandela Nilson",
      accuracy: "54%",
      predictionNos: "06",
      rank: 2,
    },
    {
      name: "Bill Tech",
      accuracy: "45%",
      predictionNos: "03",
      rank: 3,
    },

    {
      name: "Kinyle Jam",
      accuracy: "13%",
      predictionNos: "02",
      rank: 4,
    },
    {
      isUser: true,
      participated: true,
      name: "Userslef Self",
      accuracy: "13%",
      predictionNos: "02",
      rank: 5,
    },
    {
      isUser: true,
      participated: false,
      name: "Userslef Self",
      accuracy: "13%",
      predictionNos: "00",
      rank: 6,
    },
  ];

  const handleToggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    if (isDropdownVisible) {
      setDropdownVisible(false); // Close dropdown when clicking outside
    }
  };

  const UserPredictor = ({ data }) => {
    const { isUser, rank, name, accuracy, predictionNos, participated } = data;

    return (
      <View
        style={[
          styles.userBox,
          (rank === 1 || rank === 2 || rank === 3) && {
            backgroundColor: "#E9F1FC",
            opacity: 0.9,
          },
        ]}
      >
        <View style={styles.textBox}>
          {rank === 1 && <Icons type={ICONS.GOLD} />}
          {rank === 2 && <Icons type={ICONS.SILVER} />}
          {rank === 3 && <Icons type={ICONS.BRONZE} />}
          {rank > 3 && participated && (
            <View style={{ width: 28, alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: fonts.f600,
                  fontSize: 14,
                  color: "#151B26",
                }}
              >
                {rank}
              </Text>
            </View>
          )}
          {rank > 3 && !participated && (
            <View style={{ width: 28, alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: fonts.f600,
                  fontSize: 14,
                  color: "#151B26",
                }}
              >
                -
              </Text>
            </View>
          )}

          <View
            style={{
              height: 32,
              width: 32,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Image
              style={{ height: "100%", width: "100%" }}
              source={Images.avatar1}
            />
          </View>
          <View style={styles.nameBox}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.name}>{name}</Text>
                {isUser &&
                  (participated ? (
                    <Text
                      style={{
                        ...styles.name,
                        color: "#024BAC",
                        marginLeft: 8,
                      }}
                    >
                      You
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...styles.name,
                        color: "#DC0000",
                        marginLeft: 8,
                      }}
                    >
                      Not Participated
                    </Text>
                  ))}
              </View>
              <Text style={styles.subName}>{accuracy} Accurate</Text>
            </View>
            <Text style={styles.no}>{predictionNos}</Text>
          </View>
        </View>
      </View>
    );
  };

  const handleHowWorksPress = () => {
    openBottomSheet();
  };

  return (
    // <TouchableWithoutFeedback onPress={handleOutsidePress}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleToggleDropdown} style={styles.headBox}>
          <Text style={styles.headText}>{selectedOption}</Text>
          <Icons type={ICONS.DOWN_ARROW} />
        </Pressable>

        <Pressable onPress={handleHowWorksPress}>
          <Text style={styles.text2}>How it works?</Text>
        </Pressable>
      </View>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          {dummyDates.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={styles.dropdownItem}
            >
              <View style={[styles.optionContent]}>
                <View style={[styles.box]}>
                  {selectedOption === option && (
                    <Icons type={ICONS.SELECTED} style={styles.selectedIcon} />
                  )}
                </View>
                <Text
                  style={{
                    color: "#F6F8F9",
                    fontFamily: fonts.f400,
                    fontSize: 15,
                  }}
                >
                  {option}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.table}>
        <View style={styles.tableBox}>
          <View style={styles.tableBoxIn}>
            <Icons type={ICONS.HASH} />
            <Text style={{ ...styles.predictText, marginLeft: 12 }}>
              Predictors
            </Text>
          </View>
          <Text style={styles.predictText}>Predictions</Text>
        </View>

        {!dummyUsers?.length ? (
          <View style={styles.notFoundBox}>
            <Icons type={ICONS.NOT_FOUND} />

            <Text style={styles.noWinText}>No Winners This Month</Text>
            <Text style={styles.noWinText2}>
              Unfortunately, no one met the criteria to win this month. Keep
              predicting and you could be the next champion!
            </Text>
          </View>
        ) : (
          <ScrollView scrollEnabled>
            {dummyUsers.map((user, index) => (
              <UserPredictor data={user} key={index} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default Contests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  headText: {
    fontFamily: fonts.f600,
    fontSize: scale(14),
    color: "#101010",
    marginRight: 4,
  },

  text2: {
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: "#717272",
  },

  table: {
    marginTop: scale(10),
    // flex: 1,
  },

  notFoundBox: {
    height: "100%",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    marginTop: "30%",
    paddingHorizontal: 39,
  },

  noWinText: {
    fontFamily: fonts.f700,
    fontSize: scale(18),
    color: "#000000",
    textAlign: "center",
    marginTop: 16,
  },

  noWinText2: {
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: "#717272",
    textAlign: "center",
    marginTop: 4,
  },

  tableBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
    paddingVertical: scale(10),
    paddingHorizontal: 16,
  },

  tableBoxIn: {
    flexDirection: "row",
    alignItems: "center",
  },

  predictText: {
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: "#717272",
  },

  userBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 11,
    paddingLeft: 16,
  },

  textBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },

  no: {
    marginRight: 16,
    fontFamily: fonts.f600,
    fontSize: scale(13),
    color: "#151B26",
    marginTop: 11,
  },

  nameBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
    flex: 1,
    marginLeft: -4,
    paddingBottom: scale(16),
    marginTop: 11,
  },

  name: {
    fontFamily: fonts.f700,
    fontSize: scale(14),
    color: "#151B26",
  },

  subName: {
    fontFamily: fonts.f500,
    fontSize: scale(12),
    color: "#717272",
  },

  dropdown: {
    position: "absolute",
    top: scale(45),
    left: scale(65),
    backgroundColor: "#101010", // Background color of dropdown
    borderColor: "#E7E7E7",
    borderWidth: 1,
    borderRadius: 16, // Border radius for dropdown
    padding: scale(10),
    zIndex: 1000,
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
