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

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "feeds", title: "Feeds" },
    { key: "predictors", title: "Predictors" },
  ]);

  const route = useRoute().params;
  const backRoute = route?.previousScreen
    ? route?.previousScreen
    : SCREENS.HOME;

  console.log(route, "namam");

  const renderScene = SceneMap({
    feeds: FeedScreen,
    predictors: PredictorsScreen,
  });

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
              placeholder=""
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              autoFocus
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(backRoute)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          style={{ backgroundColor: "white" }}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicatorStyle}
              style={styles.tabBar}
              labelStyle={styles.labelStyle}
              activeColor="#024BAC"
              inactiveColor="#999"
            />
          )}
        />
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
    color: "#717272",
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
    //fontWeight: "500",
    textTransform: "none",
    fontFamily: fonts.f500,
  },
  indicatorStyle: {
    backgroundColor: "#024BAC",
    height: 3,
  },
});

export default SearchScreen;
