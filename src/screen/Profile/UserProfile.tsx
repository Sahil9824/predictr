import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../../../helper";
import PredictionCard from "../../component/PredictionCard";
import { Images } from "../../assets/images";
import { Colors, fonts } from "../../constant";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { SCREENS } from "../../constant/navigation.constants";
import FilterCard from "../../component/FilterCard";

const data = [
  { id: "1", index: 0 },
  { id: "2", index: 1 },
  { id: "3", index: 2 },
  { id: "4", index: 3 },
];

const NoData = () => {
  return (
    <View style={styles.notFoundBox}>
      <Icons type={ICONS.NOT_FOUND} />

      <Text style={styles.noWinText}>No Predictions Made Yet</Text>
      <Text style={styles.noWinText2}>
        Start predicting now to see your insights and track your performance on
        the Predictr!
      </Text>
    </View>
  );
};

const HeaderOptions = ({
  isSelected,
  setIsSelected,
  openFilter,
  filteredOptions,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
        paddingHorizontal: scale(10),
      }}
    >
      <View style={{ flexDirection: "row", height: scale(50) }}>
        {/* My Feed Pressable */}
        <Pressable
          onPress={() => setIsSelected(0)}
          style={[
            { width: scale(144), justifyContent: "center" },
            isSelected === 0 && {
              borderBottomColor: Colors.primaryBlue,
              borderBottomWidth: scale(3),
              height: scale(50),
            },
          ]}
        >
          <Text
            style={[
              {
                fontFamily: fonts.f400,
                fontSize: scale(15),
                lineHeight: scale(21),
                textAlign: "center",
                fontWeight: "400",
              },
              isSelected === 0 && {
                fontFamily: fonts.f800,
                color: Colors.primaryBlue,
                fontWeight: "800",
              },
            ]}
          >
            My Predictions
          </Text>
        </Pressable>

        {/* Explore Pressable */}
        <Pressable
          onPress={() => setIsSelected(1)}
          style={[
            { width: scale(116), justifyContent: "center" },
            isSelected === 1 && {
              borderBottomColor: Colors.primaryBlue,
              borderBottomWidth: scale(3),
              height: scale(50),
            },
          ]}
        >
          <Text
            style={[
              {
                fontFamily: fonts.f400,
                fontSize: scale(15),
                lineHeight: scale(21),
                textAlign: "center",
                fontWeight: "400",
              },
              isSelected === 1 && {
                fontFamily: fonts.f800,
                color: Colors.primaryBlue,
                fontWeight: "800",
              },
            ]}
          >
            Bookmarks
          </Text>
        </Pressable>
      </View>

      {/* More Options Button to open the FilterScreen */}
      <Pressable onPress={openFilter}>
        {filteredOptions ? (
          <Image
            source={Images.FilterSelected}
            style={{ height: scale(24), width: scale(24), marginEnd: scale(7) }}
          />
        ) : (
          <Image
            source={Images.moreOptions}
            style={{ height: scale(24), width: scale(24), marginEnd: scale(7) }}
          />
        )}
      </Pressable>
    </View>
  );
};

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [isSelected, setIsSelected] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(null);
  const filterCardRef = useRef(null);

  const route = useRoute();
  const isReset = route.params?.isReset || false;

  const navigation = useNavigation();

  const handleFilterReset = () => {
    console.log("Filter has been reset");
    setFilteredOptions(null);
  };

  const openFilterCard = () => {
    filterCardRef.current?.present();
  };

  return (
    <>
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
        <TouchableWithoutFeedback
          style={{ backgroundColor: "red" }}
          onPress={() => navigation.navigate(SCREENS.MENU)}
        >
          <Icons type={ICONS.SANDWICH} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={Images.avatar17} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <View style={styles.headText}>
              <Text style={styles.profileName}>Lincoln Philips</Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate(SCREENS.SELECT_AVATAR, {
                    isEdit: true,
                  })
                }
              >
                <Icons type={ICONS.EDIT} />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.emailStyle}>writetonikunj98@gmail.com</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: scale(10),
                justifyContent: "space-between",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate(SCREENS.GENERAL_SCREEN, {
                    title: "Followers",
                    data: null,
                    backscreen: SCREENS.PROFILE,
                  })
                }
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
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate(SCREENS.GENERAL_SCREEN, {
                    title: "Followings",
                    data: null,
                    backscreen: SCREENS.PROFILE,
                  })
                }
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
              </TouchableWithoutFeedback>
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
        <HeaderOptions
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          openFilter={openFilterCard}
          filteredOptions={filteredOptions}
        />

        {/* FlatList for Predictions */}
        <FlatList
          data={data}
          renderItem={({ item }) =>
            data.length ? (
              <View style={styles.cardContainer}>
                <PredictionCard index={item.index} />
              </View>
            ) : (
              <NoData />
            )
          }
          keyExtractor={(item) => item.id.toString()}
          scrollEventThrottle={16}
        />

        <FilterCard
          ref={filterCardRef}
          onFilterReset={handleFilterReset}
          isReset={isReset}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },
  tabHead: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  filter: {
    position: "absolute",
    right: 11,
    top: 11,
    zIndex: 10,
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
    backgroundColor: "#fff",
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
  tabBar: {
    backgroundColor: "white",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    elevation: 0,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "none",
  },
  indicatorStyle: {
    backgroundColor: "#024BAC",
    height: 3,
  },
  notFoundBox: {
    flex: 1,
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
    fontWeight: "700",
  },

  noWinText2: {
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: "#717272",
    textAlign: "center",
    marginTop: 4,
    fontWeight: "400",
  },
});

export default UserProfile;
