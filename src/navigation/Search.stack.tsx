import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FeedScreen from "../screen/search/FeedScreen";
import PredictorsScreen from "../screen/search/PredictorsScreen";
import { Images } from "../assets/images";
import { scale } from "../../helper";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "feeds", title: "Feeds" },
    { key: "predictors", title: "Predictors" },
  ]);

  const renderScene = SceneMap({
    feeds: FeedScreen,
    predictors: PredictorsScreen,
  });

  return (
    <>
      {/* Search Box with Icon and Cancel Button */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBoxContainer}>
          <Image
            source={Images.headerSearch}
            style={{ height: scale(18), width: scale(18), marginLeft: 10 }}
          />
          <TextInput
            style={styles.searchBox}
            placeholder=""
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Tab View */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
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
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    margin: 10,
    marginTop: 25,
  },
  searchBoxContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 0.8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#717272",
  },
  cancelButton: {
    color: "#717272",
    paddingLeft: 10,
    fontSize: 16,
  },
  tabBar: {
    backgroundColor: "white",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    elevation: 0,
    paddingHorizontal: 30,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "none",
  },
  indicatorStyle: {
    backgroundColor: "#024BAC",
    height: 3,
    width: 180,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default SearchScreen;
