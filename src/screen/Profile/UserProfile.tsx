import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../../../helper";
import PredictionCard from "../../component/PredictionCard";
import { Images } from "../../assets/images";
import { Colors, fonts } from "../../constant";
import { useNavigation } from "@react-navigation/native";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { SceneMap, TabView } from "react-native-tab-view";

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "MyPredictions", title: "MyPredictions" },
    { key: "Bookmarks", title: "Bookmarks" },
  ]);

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const MyPredictions = () => (
    <View style={{ paddingHorizontal: 16 }}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <PredictionCard
          key={index}
          // index={item.id}
          // isFavorited={item.isFavorited}
          // onFavoritePress={() => toggleFavorite(item.id)}
        />
      ))}
    </View>
  );

  const Bookmarks = () => (
    <View style={{ paddingHorizontal: 16 }}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <PredictionCard
          key={index}
          // index={item.id}
          // isFavorited={item.isFavorited}
          // onFavoritePress={() => toggleFavorite(item.id)}
        />
      ))}
    </View>
  );

  const renderScene = SceneMap({
    MyPredictions,
    Bookmarks,
  });

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.mainHeader}>
        <Text
          style={{
            fontFamily: fonts.f800,
            fontSize: scale(22),
            color: Colors.labelBlack,
            fontWeight: "800",
          }}
        >
          Profile
        </Text>
        <Icons type={ICONS.SANDWICH} />
      </View>
      <View style={styles.profileHeader}>
        <Image source={Images.avatar17} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <View style={styles.headText}>
            <Text style={styles.profileName}>Lincoln Philips</Text>
            <Icons type={ICONS.EDIT} />
          </View>
          <Text style={styles.emailStyle}>writetonikunj98@gmail.com</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: scale(10),
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: scale(14),
                  color: "#505050",
                  fontFamily: fonts.f700,
                }}
              >
                88
              </Text>
              <Text
                style={{
                  fontFamily: fonts.f400,
                  fontWeight: "400",
                  fontSize: scale(14),
                  color: "#505050",
                }}
              >
                followers
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: scale(14),
                  color: "#505050",
                  fontFamily: fonts.f700,
                }}
              >
                55
              </Text>
              <Text
                style={{
                  fontFamily: fonts.f400,
                  fontWeight: "400",
                  fontSize: scale(14),
                  color: "#505050",
                }}
              >
                following
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedTab === "All" && styles.selectedTabItem,
          ]}
          onPress={() => setSelectedTab("All")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "All" && styles.selectedTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedTab === "Week" && styles.selectedTabItem,
          ]}
          onPress={() => setSelectedTab("Week")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Week" && styles.selectedTabText,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedTab === "Month" && styles.selectedTabItem,
          ]}
          onPress={() => setSelectedTab("Month")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Month" && styles.selectedTabText,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>114</Text>
          <Text style={styles.statLabel}>Rank</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statLabel}>Predictions #</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>43%</Text>
          <Text style={styles.statLabel}>Accuracy %</Text>
        </View>
      </View>

      {/* FlatList for Predictions */}
      <View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get("window").width }}
          // style={{ height: height - 300 }} //
        />

        <Pressable>
          {false ? (
            <Image
              source={Images.FilterSelected}
              style={{
                height: scale(24),
                width: scale(24),
                marginEnd: scale(7),
              }}
            />
          ) : (
            <Image
              source={Images.moreOptions}
              style={{
                height: scale(24),
                width: scale(24),
                marginEnd: scale(7),
              }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  emailStyle: {
    fontFamily: fonts.f400,
    fontSize: 15,
    fontWeight: "400",
    color: "#00000080",
    marginTop: 4,
  },
  mainHeader: {
    flexDirection: "row",
    padding: moderateScale(16),
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileHeader: {
    flexDirection: "column",
    padding: moderateScale(16),
    alignItems: "center",
  },
  profileImage: {
    width: scale(130),
    height: scale(130),
    borderRadius: scale(20),
  },
  profileInfo: {
    //
  },
  profileName: {
    fontSize: moderateScale(24),
    fontWeight: "700",
    color: Colors.labelBlack,
  },
  profileStats: {
    color: "#888",
    marginVertical: verticalScale(4),
  },
  followButton: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(12),
    alignItems: "center",
  },
  follow: {
    backgroundColor: "#024BAC",
  },
  following: {
    backgroundColor: "#ddd",
  },
  followText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: moderateScale(16),
  },
  followingText: {
    color: "#717272",
    fontWeight: "bold",
    fontSize: moderateScale(16),
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: scale(15),
    backgroundColor: "#F9F9F9",
    borderRadius: scale(10),
    borderColor: "#ddd",
    borderWidth: 1,
  },
  tabItem: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: "center",
    borderRadius: scale(10),
    backgroundColor: "#F9F9F9",
  },
  selectedTabItem: {
    backgroundColor: "#E5E5E5",
  },
  tabText: {
    fontSize: moderateScale(16),
    color: "#000",
    fontWeight: "400",
  },
  selectedTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(10),
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "#F6F8F9",
    width: scale(108),
    height: scale(70),
    justifyContent: "center",
    borderRadius: scale(8),
  },
  statNumber: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: Colors.labelBlack,
  },
  statLabel: {
    color: "#888",
    fontSize: moderateScale(12),
    fontWeight: "400",
  },
  predictionsHeader: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(10),
    color: Colors.labelBlack,
  },
  cardContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
  },
  card: {
    padding: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default UserProfile;
