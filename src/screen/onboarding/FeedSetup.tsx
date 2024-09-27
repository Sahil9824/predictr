import { RouteProp } from "@react-navigation/native";
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
import Button from "../../component/ Button";
import { Colors, fonts } from "../../constant";
import { RootStackParamList } from "../../navigation/MainNavigation";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "FeedSetup">;
  route: RouteProp<RootStackParamList, "FeedSetup">;
}

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
    image: Images.avatar1,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 11,
    image: Images.avatar2,
    name: "Anika Kentar",
    percent: "40.3%",
    isFollowed: false,
  },
  {
    id: 12,
    image: Images.avatar3,
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
  addToFollowList: (id: number) => void;
  removeFromFollowList: (id: number) => void;
}

const Titles: React.FC<TileProp> = ({
  item,
  addToFollowList,
  removeFromFollowList,
}) => {
  const [isFollowed, setIsFollowed] = useState(item.isFollowed);

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
    setIsFollowed(item.isFollowed);
  }, [item.isFollowed]);

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
          <Image source={item.image} style={{ height: 40, width: 40 }} />
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

const FeedSetup: React.FC<Props> = ({ navigation, route }) => {
  const [username, setUsername] = useState(route.params.username);
  const [profileImage, setProfileImage] = useState(route.params.profileImage);
  const [listData, setListData] = useState(data);
  const [followList, setFollowList] = useState<number[]>([]);

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
          } else {
          }
          item.isFollowed = true;
        }
        return item;
      })
    );
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (route.params.username) {
      setUsername(route.params.username);
    }
    if (route.params.profileImage) {
      setProfileImage(route.params.profileImage);
    }
  }, [route.params.username, route.params.profileImage]);

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
        <TextInput style={styles.search} placeholder="Search" />
      </View>
      <View style={styles.followContainer}>
        <Text
          style={styles.followCount}
        >{`${followList.length} Following`}</Text>
        <Text onPress={followTop10} style={styles.top10}>
          {"Follow Top 10"}
        </Text>
      </View>
      <View style={styles.listContainer} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={listData}
        renderItem={({ item }) => (
          <Titles
            item={item}
            addToFollowList={addToFollowList}
            removeFromFollowList={removeFromFollowList}
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
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  text: {
    fontFamily: fonts.f400,
    color: Colors.textBlack,
    paddingLeft: 10,
  },
  title: {
    fontFamily: fonts.f800,
    fontSize: 32,
    lineHeight: 40,
    color: Colors.textBlack,
  },
  subText: {
    marginVertical: 6,
    fontFamily: fonts.f400,
    fontSize: 15,
    color: Colors.textBlack,
  },
  header: {
    marginVertical: 10,
  },
  searchContainer: {
    marginTop: 15,
    flexDirection: "row",
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  searchImg: {
    height: 18,
    width: 18,
  },
  search: {
    marginHorizontal: 10,
    width: "90%",
    paddingTop: 12,
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingBottom: 12,
  },
  followCount: {
    fontFamily: fonts.f400,
    fontSize: 14,
  },
  top10: {
    fontFamily: fonts.f800,
    fontSize: 14,
    color: Colors.primaryBlue,
  },
  listContainer: {
    width: "86%",
    height: 1,
    backgroundColor: Colors.border,
    alignSelf: "flex-end",
  },
  list: { flex: 1 },
  line: { marginTop: 15 },
});
