import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../../../helper";
import { Images } from "../../assets/images";
import { Colors, fonts } from "../../constant";
import { useNavigation } from "@react-navigation/native";
import { APP_NAVIGATION, SCREENS } from "../../constant/navigation.constants";
import RNPickerSelect from "react-native-picker-select";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import AnimatedSearch from "../../component/SearchBar";
import Input from "../../component/Input";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

interface LeaderboardEntry {
  id: number;
  predictions: number;
  name: string;
  accuracy: string;
  isCurrentUser: boolean;
  isTop?: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    id: 1,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 5,
  },
  {
    id: 2,
    name: "Jacob Jones",
    accuracy: "72.70% Accurate",
    isCurrentUser: false,
    predictions: 3,
  },
  {
    id: 3,
    name: "Jacob Jones",
    accuracy: "71.50% Accurate",
    isCurrentUser: false,
    predictions: 1,
  },
  {
    id: 4,
    name: "Jacob Jones",
    accuracy: "67.55% Accurate",
    isCurrentUser: false,
    predictions: 6,
  },
  {
    id: 7,
    name: "Brooklyn S",
    accuracy: "60.34% Accurate",
    isCurrentUser: true,
    predictions: 7,
  },
  {
    id: 8,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 6,
  },
  {
    id: 9,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 4,
  },
  {
    id: 10,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 3,
  },
  {
    id: 11,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 1,
  },
  {
    id: 12,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 10,
  },
  {
    id: 13,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 20,
  },
  {
    id: 14,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 13,
  },
  {
    id: 15,
    name: "Jacob Jones",
    accuracy: "78.90% Accurate",
    isCurrentUser: false,
    predictions: 12,
  },
];

const dummyDates = [
  {
    label: "All-Time",
    value: 1,
  },
  {
    label: "Weekly",
    value: 2,
  },
  {
    label: "Monthly",
    value: 3,
  },
  {
    label: "Contest Standings",
    value: 4,
  },
];
const dummyMonths = [
  {
    label: "Nov 2024 (Live)",
    value: 1,
  },
  {
    label: "Oct 2024",
    value: 2,
  },
  {
    label: "Aug 2024",
    value: 3,
  },
  {
    label: "July, 2024",
    value: 4,
  },
];

const LeaderboardScreen = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [isInfo, setIsInfo] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [pickOpen, setPickOpen] = useState(false);
  const pickerRef = useRef();
  const monthPickerRef = useRef();
  const isContentStanding = selectedOption == 4 || false;

  const navigation = useNavigation();

  const onSearchPress = () => {
    setIsInput(true);
  };

  const openPicker = () => {
    pickerRef.current.togglePicker();
  };

  const openMonthPicker = () => {
    monthPickerRef.current.togglePicker();
  };

  const RenderEntry = ({ item }: { item: LeaderboardEntry }) => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate(SCREENS.OTHER_USER_PROFILE, {
          previousScreen: SCREENS.LEADERBOARD,
        })
      }
    >
      <View
        style={[
          styles.entryContainer,
          item.isCurrentUser && item.isTop && styles.currentUser,
        ]}
      >
        <View style={styles.rankContainer}>
          {item.isCurrentUser && item.isTop ? (
            <Text
              style={{ ...styles.id, fontFamily: fonts.f700, color: "#FFC803" }}
            >
              #{item.id}
            </Text>
          ) : (
            <Text style={styles.id}>{item.id}</Text>
          )}
          <Image source={Images.avatar6} style={styles.avatar} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: item.isCurrentUser && item.isTop ? 0 : 1,
              borderColor: "#f0f0f0",
              paddingVertical: verticalScale(12),
              paddingRight: moderateScale(8),
              zIndex: 1,
            }}
          >
            <View>
              <Text
                style={{
                  ...styles.name,
                  color: item.isTop ? "#FFFFFF" : "#151B26",
                }}
              >
                {item.name}{" "}
                {item.isCurrentUser && (
                  <Text
                    style={{
                      ...styles.youText,
                      color: item.isTop ? "#FFC803" : "#024BAC",
                    }}
                  >
                    You
                  </Text>
                )}
              </Text>
              <Text
                style={{
                  ...styles.accuracy,
                  color: item.isTop ? "#CCDFF7" : "#717272",
                }}
              >
                {item.accuracy}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                zIndex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {item.isTop && item.predictions < 3 && (
                  <>
                    <TouchableWithoutFeedback onPress={() => setIsInfo(true)}>
                      <Icons type={ICONS.YELLOW_INFO} />
                    </TouchableWithoutFeedback>
                  </>
                )}
                <Text
                  style={{
                    ...styles.name,
                    color: item.isTop && "#FFFFFF",
                    fontSize: scale(13),
                  }}
                >
                  {item.predictions}
                </Text>
              </View>
              <Icons
                type={ICONS.BLUE_RIGHT}
                stroke={item.isTop ? "white" : "#025ED7"}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    // if (selectedOption !== 4) return;

    setSelectedMonth(1);
  }, [selectedOption]);

  console.log(
    selectedMonth,
    selectedOption,

    selectedMonth == 1 && selectedOption == 4
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
            {selectedMonth == 1 && selectedOption == 4 && (
              <View style={styles.rankLabel}>
                <View
                  style={{
                    height: 9,
                    width: 9,
                    borderRadius: 4.5,
                    backgroundColor: "#E33F3F",
                  }}
                ></View>
                <Text style={styles.rankText}>Live Contest</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.topBox}>
          {!isInput ? (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <RNPickerSelect
                    ref={pickerRef}
                    onValueChange={setSelectedOption}
                    items={dummyDates}
                    fixAndroidTouchableBug={true}
                    placeholder={
                      {
                        // color:
                      }
                    }
                    onClose={() => setPickOpen(false)}
                    onOpen={() => setPickOpen(true)}
                    // onOpen={openPicker}

                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputIOS: {
                        color: "#101010",
                        fontFamily: fonts.f600,
                        fontSize: 15,
                        width: "100%",
                      },
                      inputAndroid: {
                        color: "#101010",
                        fontFamily: fonts.f600,
                        fontSize: 15,
                        width: "100%",
                        padding: 0,
                      },
                    }}
                  />
                  <Pressable
                    style={{
                      marginTop: 2,
                      paddingLeft: 4,
                      height: 17,
                      width: 17,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={openPicker}
                  >
                    <Image source={Images.Chevron_down} />
                  </Pressable>
                </View>
                {isContentStanding && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RNPickerSelect
                      ref={monthPickerRef}
                      onValueChange={setSelectedMonth}
                      items={dummyMonths}
                      placeholder={{}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                      // onOpen={openMonthPicker}
                      // onClose={openMonthPicker}
                      style={{
                        inputIOS: {
                          color: "#101010",
                          fontFamily: fonts.f600,
                          fontSize: 15,
                          width: "100%",
                        },
                        inputAndroid: {
                          color: "#101010",
                          fontFamily: fonts.f600,
                          fontSize: 15,
                          width: "100%",
                          padding: 0,
                        },
                      }}
                    />
                    <View
                      style={{
                        marginTop: 2,
                        paddingLeft: 4,
                        height: 17,
                        width: 17,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableWithoutFeedback onPress={openMonthPicker}>
                        {/* <Icons type={ICONS.DOWN_ARROW} /> */}
                        <Image source={Images.Chevron_down} />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                )}
              </View>

              <TouchableWithoutFeedback onPress={onSearchPress}>
                <Icons type={ICONS.SEARCH_LEAD} />
              </TouchableWithoutFeedback>
            </>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Enter Username"
                placeholderTextColor="#717272"
                value={inputVal}
                onChangeText={(text) => setInputVal(text)}
                style={{
                  fontSize: scale(14),
                  fontFamily: fonts.f400,
                  color: "#101010",
                  width: "90%",
                }}
              />
              <TouchableWithoutFeedback onPress={() => setIsInput(false)}>
                <Icons type={ICONS.CLOSE_LEAD} />
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            paddingRight: moderateScale(16),
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#e0e0e0",
            paddingLeft: moderateScale(26),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: scale(16),
                color: "#717272",
                fontFamily: fonts.f500,
              }}
            >
              #
            </Text>
            <Text
              style={{
                // paddingHorizontal: 7,
                fontSize: scale(16),
                marginLeft: moderateScale(22),
                color: "#717272",
                fontFamily: fonts.f400,
              }}
            >
              Predictors
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                paddingHorizontal: 7,
                fontSize: scale(16),
                color: "#717272",
                fontFamily: fonts.f400,

                //fontWeight: "400",
              }}
            >
              Predictions
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 7,
            zIndex: 1,
            position: "relative",
          }}
        >
          <RenderEntry
            item={{
              id: "7",
              name: "Brooklyn S",
              accuracy: "60.34% Accurate",
              isCurrentUser: true,
              isTop: true,
              predictions: 2,
            }}
          />
          {leaderboardData.length ? (
            leaderboardData.map((item, index) => (
              <RenderEntry item={item} key={index} />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ width: 300, height: 240 }}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "contain",
                  }}
                  source={Images.LeadEmpty}
                />
              </View>
            </View>
          )}
        </ScrollView>

        <Modal
          visible={isInfo}
          animationType="none"
          transparent={true}
          style={{ backgroundColor: "red" }}
          presentationStyle="overFullScreen"
          statusBarTranslucent
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onPress={() => setIsInfo(false)}
          >
            <View style={styles.modalBox}>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  backgroundColor: "#151B26",
                  paddingVertical: 20,
                  borderRadius: 10,
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.f400,
                    color: "#FFFFFF",
                    fontSize: scale(14),
                    width: scale(242),
                  }}
                >
                  You did not qualify due to posting only two predictions,
                  minimum 3 predictions are required.
                </Text>
                <View
                  style={{
                    backgroundColor: "#FFFFFF1A",
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableWithoutFeedback onPress={() => setIsInfo(false)}>
                    <Icons type={ICONS.POP_CLOSE} />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </Pressable>
        </Modal>
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

  modalBox: {
    width: "90%",
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  topBox: {
    width: "100%",
    backgroundColor: "#F0F3F5",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
    paddingHorizontal: moderateScale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    alignItems: "center",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(10),
  },
  headerText: {
    fontSize: scale(22),
    color: Colors.textBlack,
    fontFamily: fonts.f800,
  },
  rankLabel: {
    flexDirection: "row",
    backgroundColor: "#FBBABA80",
    borderRadius: moderateScale(8),
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginStart: 10,
    alignItems: "center",
  },

  rankText: {
    fontSize: scale(14),
    marginLeft: moderateScale(4),
    color: "#E33F3F",
    fontFamily: fonts.f700,
  },
  filterText: {
    fontSize: scale(15),
    color: Colors.textBlack,
    fontFamily: fonts.f300,
  },
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: moderateScale(18),
    marginHorizontal: 8,
    paddingRight: moderateScale(8),
    zIndex: 1,
  },
  currentUser: {
    backgroundColor: "#024BAC",
    borderRadius: 12,
    zIndex: 1,
  },
  rankContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: 8,
    marginRight: moderateScale(12),
    // paddingHorizontal: moderateScale(16),
  },
  name: {
    fontSize: scale(16),
    fontFamily: fonts.f700,
    color: Colors.textBlack,
  },
  id: {
    fontSize: scale(15),
    marginRight: 12,
    color: Colors.textBlack,
    width: 28,
    fontFamily: fonts.f600,
  },
  youText: {
    color: "#024BAC",
    fontFamily: fonts.f700_Italic,
    fontSize: scale(15),
  },
  accuracy: {
    fontSize: scale(14),
    fontFamily: fonts.f500,
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
