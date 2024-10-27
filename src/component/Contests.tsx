import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icons from "./Icons";
import { ICONS } from "../constant/icons.constants";
import { fonts } from "../constant";
import { scale } from "../../helper";
import { Images } from "../assets/images";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constant/navigation.constants";
import RNPickerSelect from "react-native-picker-select";

const dummyDates = [
  { label: "August 2024 (Ongoing)", value: "August 24" },
  { label: "July 2024", value: "July 30" },
  { label: "June 2024", value: "June 11" },
  { label: "June 2024", value: "June 5" },
];

const dummyUsers = [
  {
    name: "Edwards Nilson",
    accuracy: "88%",
    predictionNos: 10,
    rank: 1,
    participated: true,
  },
  {
    name: "Mandela Nilson",
    accuracy: "54%",
    predictionNos: "06",
    rank: 2,
    participated: true,
  },
  {
    name: "Bill Tech",
    accuracy: "45%",
    predictionNos: "03",
    rank: 3,
    participated: true,
  },

  {
    name: "Kinyle Jam",
    accuracy: "13%",
    predictionNos: "02",
    rank: 4,
    participated: true,
  },
  {
    name: "Kinyle Jam",
    accuracy: "13%",
    predictionNos: "02",
    rank: 5,
    participated: true,
  },
  {
    name: "Kinyle Jam",
    accuracy: "13%",
    predictionNos: "02",
    rank: 6,
    participated: true,
  },
  {
    name: "Kinyle Jam",
    accuracy: "13%",
    predictionNos: "02",
    rank: 7,
    participated: true,
  },
  {
    isUser: true,
    participated: true,
    name: "Userslef Self",
    accuracy: "13%",
    predictionNos: "02",
    rank: 8,
  },
  {
    isUser: true,
    participated: false,
    name: "Userslef Self",
    accuracy: "13%",
    predictionNos: "00",
    rank: 9,
  },
  {
    isUser: false,
    participated: true,
    name: "Userslef Self",
    accuracy: "13%",
    predictionNos: "00",
    rank: 10,
  },
  {
    isUser: false,
    participated: true,
    name: "Userslef Self",
    accuracy: "13%",
    predictionNos: "00",
    rank: 11,
  },
];

const Contests = ({ openBottomSheet }) => {
  const [selectedOption, setSelectedOption] = useState("August 24 (OnGoing)");
  const pickerRef = useRef();
  const inputRef = useRef(null);

  const openPicker = () => {
    pickerRef.current.togglePicker(); // Toggle the picker
  };

  const navigation = useNavigation();

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
          {rank === 1 && <Icons type={ICONS.GOLD} width={scale(28)} />}
          {rank === 2 && <Icons type={ICONS.SILVER} width={scale(28)} />}
          {rank === 3 && <Icons type={ICONS.BRONZE} width={scale(28)} />}
          {rank > 3 && participated && (
            <View style={{ width: scale(28), alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: fonts.f600,
                  //fontWeight: "600",
                  fontSize: scale(14),
                  color: "#151B26",
                }}
              >
                {rank}
              </Text>
            </View>
          )}
          {rank > 3 && !participated && (
            <View style={{ width: scale(28), alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: fonts.f600,
                  //fontWeight: "600",
                  fontSize: scale(14),
                  color: "#151B26",
                }}
              >
                -
              </Text>
            </View>
          )}

          <Pressable
            style={{
              height: scale(32),
              width: scale(32),
              borderRadius: scale(8),
              overflow: "hidden",
            }}
            onPress={() => navigation.navigate(SCREENS.OTHER_USER_PROFILE)}
          >
            <Image
              style={{ height: "100%", width: "100%" }}
              source={Images.avatar1}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate(SCREENS.OTHER_USER_PROFILE)}
            style={styles.nameBox}
          >
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
          </Pressable>
        </View>
      </View>
    );
  };

  const handleHowWorksPress = () => {
    // openBottomSheet();
    navigation.navigate(SCREENS.HOW_IT_WORKS);
  };

  return (
    // <TouchableWithoutFeedback onPress={handleOutsidePress}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headBox}>
          <RNPickerSelect
            fixAndroidTouchableBug
            ref={pickerRef}
            onValueChange={setSelectedOption}
            items={dummyDates}
            useNativeAndroidPickerStyle={false}
            placeholder={{}}
            style={{
              viewContainer: {
                marginRight: 4,
              },
              inputIOS: {
                color: "#101010",
                fontFamily: fonts.f600,
                fontSize: 14,
                //fontWeight: "600",
                width: "100%",
              },
              inputAndroid: {
                color: "#101010",
                fontFamily: fonts.f600,
                //fontWeight: "600",
                fontSize: 14,
                width: "100%",
              },
            }}
          />
          <TouchableWithoutFeedback onPress={openPicker}>
            <Image source={Images.Chevron_down} />
          </TouchableWithoutFeedback>
        </View>

        <Pressable onPress={handleHowWorksPress}>
          <Text style={styles.text2}>How it works?</Text>
        </Pressable>
      </View>

      {/* Dropdown Menu */}

      <View style={styles.table}>
        <View style={styles.tableBox}>
          <View style={styles.tableBoxIn}>
            <Icons type={ICONS.HASH} />
            <Text style={{ ...styles.predictText, marginLeft: scale(12) }}>
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
    paddingRight: 16,
    paddingLeft: 6,
    paddingVertical: Platform.OS === "ios" ? 16 : 0,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    // backgroundColor: "blue",
  },

  headText: {
    fontFamily: fonts.f600,
    fontSize: scale(14),
    color: "#101010",
    marginRight: 4,
    //fontWeight: "600",
  },

  text2: {
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: "#717272",
    //fontWeight: "400",
  },

  table: {
    // marginTop: scale(10),
    // flex: 1,
  },

  notFoundBox: {
    height: "100%",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    marginTop: "30%",
    paddingHorizontal: 39,
    paddingBottom: "60%",
  },

  noWinText: {
    fontFamily: fonts.f700,
    fontSize: scale(18),
    color: "#000000",
    textAlign: "center",
    marginTop: 16,
    //fontWeight: "700",
  },

  noWinText2: {
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: "#717272",
    textAlign: "center",
    marginTop: 4,
    //fontWeight: "400",
  },

  tableBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
    paddingVertical: 10,
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
    //fontWeight: "400",
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
    //fontWeight: "600",
  },

  nameBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
    flex: 1,
    marginLeft: -4,
    paddingBottom: 11,
    marginTop: 11,
  },

  name: {
    fontFamily: fonts.f700,
    fontSize: scale(14),
    color: "#151B26",
    //fontWeight: "700",
  },

  subName: {
    fontFamily: fonts.f500,
    fontSize: scale(12),
    color: "#717272",
    //fontWeight: "500",
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
