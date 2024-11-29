import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Pressable,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FeedScreen from "../screen/search/FeedScreen";
import PredictorsScreen from "../screen/search/PredictorsScreen";
import { Images } from "../assets/images";
import { scale } from "../../helper";
import { SCREENS } from "../constant/navigation.constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "../component/Icons";
import { ICONS } from "../constant/icons.constants";
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fonts } from "../constant";
import { Icon } from "react-native-elements/dist/icons/Icon";
import GeneralList from "../screen/GeneralList";

const mockData = [
  // { id: "1", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "2", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "3", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "4", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "5", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "6", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "7", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "8", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "9", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "10", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "11", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "12", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "13", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "14", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "15", name: "Jacob Jones", accuracy: "78.90%" },
  // { id: "16", name: "Jacob Jones", accuracy: "78.90%" },
];

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const route = useRoute().params;
  const backRoute = route?.previousScreen
    ? route?.previousScreen
    : SCREENS.HOME;

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate(SCREENS.OTHER_USER_PROFILE)}
      >
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
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.accuracy}>{item.accuracy} Accurate</Text>
            </View>
            <View
              style={{
                paddingRight: 16,
              }}
            >
              <Icons type={ICONS.BLUE_RIGHT} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white" }}
        edges={["left", "right", "top"]}
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchBoxContainer}>
            <Icons type={ICONS.HEAD_SEARCH} />

            <TextInput
              style={styles.searchBox}
              placeholder="Enter username"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              autoFocus
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(backRoute)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          {mockData.length && searchQuery ? (
            <FlatList
              data={mockData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
          ) : !mockData.length && searchQuery ? (
            <View style={styles.emptyCon}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 50,
                }}
              >
                <Icons type={ICONS.NOT_FOUND} />

                <Text style={styles.noWinText}>No Results</Text>
                <Text style={styles.noWinText2}>
                  Sorry, there are no results for this search. Please try better
                  word.
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCon}>
              <Icons type={ICONS.SEARCH_S} />
              <Text style={styles.textMid}>Find other predictors</Text>
            </View>
          )}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingVertical: 3,
    paddingBottom: 8,
  },
  emptyCon: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
  },

  listContainer: {
    paddingLeft: 16,
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
    //fontWeight: "400",
  },
  textMid: {
    fontSize: 16,
    color: "#000000",
    marginTop: 16,
    fontFamily: fonts.f600,
  },
  searchBoxContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 0.8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    paddingHorizontal: 16,
  },
  searchBox: {
    flex: 1,
    // height: 40,
    paddingLeft: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#101010",
    fontFamily: fonts.f400,
  },
  cancelButton: {
    color: "#717272",
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: fonts.f500,
  },
  tabBar: {
    backgroundColor: "white",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    elevation: 0,
  },
  labelStyle: {
    fontSize: 16,
    textTransform: "none",
    fontFamily: fonts.f500,
  },
  indicatorStyle: {
    backgroundColor: "#024BAC",
    height: 3,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    flex: 1,
    borderBottomColor: "#0000001A",
    borderBottomWidth: 1,
    paddingVertical: 9,
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontFamily: fonts.f700,
    color: "#333",
  },
  accuracy: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontFamily: fonts.f500,
  },
});

export default SearchScreen;
