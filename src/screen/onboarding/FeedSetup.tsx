import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageProps,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Images } from "../../assets/images";
import Button from "../../component/Button";
import { Colors, fonts } from "../../constant";
import { scale } from "../../../helper";
import { SCREENS } from "../../constant/navigation.constants";

// interface Props {
//   navigation: StackNavigationProp<RootStackParamList, "FeedSetup">;
//   route: RouteProp<RootStackParamList, "FeedSetup">;
// }

const data = [
  {
    id: 1,
    image: Images.avatar5,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 2,
    image: Images.avatar6,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 3,
    image: Images.avatar7,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 4,
    image: Images.avatar3,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 5,
    image: Images.avatar8,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 6,
    image: Images.avatar7,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 7,
    image: Images.avatar9,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 8,
    image: Images.avatar10,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 9,
    image: Images.avatar11,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 10,
    image: Images.avatar12,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 11,
    image: Images.avatar13,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 12,
    image: Images.avatar14,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 13,
    image: Images.avatar15,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 14,
    image: Images.avatar16,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 15,
    image: Images.avatar17,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 16,
    image: Images.avatar18,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 17,
    image: Images.avatar1,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 18,
    image: Images.avatar2,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 19,
    image: Images.avatar4,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
];

//TODO: keep it in separate file
interface TileProp {
  item: {
    id: number;
    image: ImageProps;
    name: string;
    isFollowed: boolean;
    percent: string;
  };
  followList: number[];
  addToFollowList: (id: number) => void;
  removeFromFollowList: (id: number) => void;
}

const Titles: React.FC<TileProp> = ({
  item,
  addToFollowList,
  removeFromFollowList,
  followList,
}) => {
  const [isFollowed, setIsFollowed] = useState(followList.includes(item.id));
  // console.log("is", isFollowed, item.isFollowed);

  const onPress = () => {
    if (item.isFollowed) {
      removeFromFollowList(item.id);
    } else {
      addToFollowList(item.id);
    }
    setIsFollowed((prev) => !prev);
    item.isFollowed = !item.isFollowed;
  };

  useEffect(() => {
    setIsFollowed(followList.includes(item.id));
  }, [item.isFollowed, followList]);

  return (
    <>
      <View
        style={{
          marginVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={item.image}
            style={{ height: 40, width: 40, borderRadius: 12 }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 12,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.f800,
                fontSize: 15,
                lineHeight: 20,
                color: Colors.textBlack,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: 13,
                lineHeight: 20,
                marginLeft: 10,
              }}
            >
              {item.percent}
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 6,
          }}
          onPress={onPress}
        >
          {isFollowed && (
            <Image
              source={Images.checkmark}
              style={{ height: 15, width: 15, marginRight: 8 }}
            />
          )}
          <Text
            style={[
              isFollowed
                ? {}
                : {
                    fontFamily: fonts.f800,
                    fontSize: 14,
                    color: Colors.primaryBlue,
                  },
            ]}
          >
            {isFollowed ? "Following" : "Follow"}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          width: "86%",
          height: 1,
          backgroundColor: Colors.border,
          alignSelf: "flex-end",
        }}
      />
    </>
  );
};

const FeedSetup: React.FC<any> = ({ navigation, route }) => {
  const [username, setUsername] = useState(route.params.username);
  const [profileImage, setProfileImage] = useState(route.params.profileImage);
  const [listData, setListData] = useState(data);
  const [followList, setFollowList] = useState<number[]>([]);

  const [searchText, setSearchText] = useState("");

  const addToFollowList = (id: number) => {
    setFollowList((prev) => [...prev, id]);
  };

  const removeFromFollowList = (id: number) => {
    setFollowList((prev) => prev.filter((item) => item != id));
  };

  const followTop10 = () => {
    setListData((prev) =>
      prev.map((item, index) => {
        if (index < 10) {
          if (!followList.filter((i) => i === item.id)?.at(0)) {
            addToFollowList(item.id);
          }
          item.isFollowed = true;
        }
        return item;
      })
    );
  };
  console.log("ff", followList);

  const navigateToLogin = () => {
    navigation.navigate(SCREENS.LOGIN);
  };

  useEffect(() => {
    if (route.params.username) {
      setUsername(route.params.username);
    }
    if (route.params.profileImage) {
      setProfileImage(route.params.profileImage);
    }
  }, [route.params.username, route.params.profileImage]);

  // useFocusEffect(() => {
  //   setListData(data);

  //   // setFollowList([])
  // })

  useEffect(() => {
    if (searchText) {
      setListData(
        data.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setListData(data);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImg} />
        <Text style={styles.text}>{username}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{"Setup your feed"}</Text>
        <Text style={styles.subText}>
          {"Follow minimum 5 predictors to enable My Feed"}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Image
          source={Images.search}
          style={styles.searchImg}
          resizeMode="contain"
        />
        <TextInput
          style={styles.search}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.followContainer}>
        <Text
          style={styles.followCount}
        >{`${followList.length} Following`}</Text>
        {listData.length >= 10 && (
          <Text onPress={followTop10} style={styles.top10}>
            {"Follow Top 10"}
          </Text>
        )}
      </View>
      <View style={styles.listContainer} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            {"No record found"}
          </Text>
        }
        data={listData}
        renderItem={({ item }) => (
          <Titles
            item={item}
            addToFollowList={addToFollowList}
            removeFromFollowList={removeFromFollowList}
            followList={followList}
          />
        )}
        keyExtractor={(item) => item?.id?.toString()}
      />
      {followList.length > 0 && (
        <Button text="Done" onPress={navigateToLogin} style={styles.line} />
      )}
    </View>
  );
};

export default FeedSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: scale(20),
    paddingHorizontal: scale(15),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    borderRadius: 8,
    width: scale(32),
    height: scale(32),
    overflow: "hidden",
  },
  text: {
    fontFamily: fonts.f400,
    color: Colors.textBlack,
    paddingLeft: scale(10),
  },
  title: {
    fontFamily: fonts.f800,
    fontSize: scale(32),
    lineHeight: scale(40),
    color: Colors.textBlack,
  },
  subText: {
    marginVertical: 6,
    fontFamily: fonts.f400,
    fontSize: scale(15),
    color: Colors.textBlack,
  },
  header: {
    marginVertical: 10,
  },
  searchContainer: {
    marginTop: scale(15),
    flexDirection: "row",
    paddingHorizontal: scale(12),
    height: scale(40),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  searchImg: {
    height: scale(18),
    width: scale(18),
  },
  search: {
    marginHorizontal: scale(10),
    width: "90%",
    paddingTop: scale(12),
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(15),
    paddingBottom: scale(12),
  },
  followCount: {
    fontFamily: fonts.f400,
    fontSize: scale(14),
  },
  top10: {
    fontFamily: fonts.f800,
    fontSize: scale(14),
    color: Colors.primaryBlue,
  },
  listContainer: {
    width: "86%",
    height: 1,
    backgroundColor: Colors.border,
    alignSelf: "flex-end",
  },
  list: { flex: 1 },
  line: { marginTop: scale(15) },
});
