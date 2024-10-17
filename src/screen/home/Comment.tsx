import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Images } from "../../assets/images";
import { scale } from "../../../helper";
import { Colors, fonts } from "../../constant";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../constant/navigation.constants";

const Comment = ({ name, ago, content, avatar }) => {
  const [liked, setLiked] = useState(false); // State to track if liked
  const [disliked, setDisliked] = useState(false); // State to track if disliked
  const [likeCount, setLikeCount] = useState(0); // Count for likes
  const [dislikeCount, setDislikeCount] = useState(0); // Count for dislikes
  const [isReply, setIsReply] = useState(true);

  const navigation = useNavigation();

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1); // Decrement like count
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1); // Increment like count
      if (disliked) {
        setDisliked(false); // Reset dislike if liked
        setDislikeCount((prev) => prev - 1); // Decrement dislike count
      }
    }
  };

  // Function to handle dislike
  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount((prev) => prev - 1); // Decrement dislike count
    } else {
      setDisliked(true);
      setDislikeCount((prev) => prev + 1); // Increment dislike count
      if (liked) {
        setLiked(false); // Reset like if disliked
        setLikeCount((prev) => prev - 1); // Decrement like count
      }
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate(SCREENS.OTHER_USER_PROFILE)}
        >
          <Image
            source={avatar}
            style={{ height: 24, width: 24, borderRadius: 6 }}
          />
        </Pressable>

        <View style={{ paddingLeft: 8 }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.ago}>{ago}</Text>
          </View>

          <Text style={styles.contentText}>{content}</Text>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={handleLike}
              style={{
                width: 56,
                flexDirection: "row",
                alignItems: "center",
                marginRight: scale(20),
              }}
            >
              <Image
                source={liked ? Images.likeFilled : Images.like}
                style={{ height: scale(16), width: scale(16), marginRight: 4 }}
              />
              <Text
                style={{
                  fontFamily: liked ? fonts.f700 : fonts.f500,
                  fontSize: scale(13),
                  lineHeight: scale(19),
                  color: liked ? "#024BAC" : Colors.textGrey,
                  fontWeight: liked ? "700" : "500",
                }}
              >
                {disliked || liked ? likeCount : "Agree"}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleDislike}
              style={{
                width: 73,
                flexDirection: "row",
                alignItems: "center",
                marginRight: scale(20),
              }}
            >
              <Image
                source={disliked ? Images.dislikeFilled : Images.dislike}
                style={{ height: scale(16), width: scale(16), marginRight: 4 }}
              />
              <Text
                style={{
                  fontFamily: disliked ? fonts.f700 : fonts.f500,
                  fontSize: scale(13),
                  lineHeight: scale(19),
                  color: disliked ? "#E33F3F" : Colors.textGrey,
                  fontWeight: disliked ? "700" : "500",
                }}
              >
                {disliked || liked ? dislikeCount : "Disagree"}
              </Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: scale(10),
              }}
              // onPress={() => navigation.navigate(SCREENS.POST)}
            >
              <Text
                style={{
                  fontFamily: fonts.f400,
                  fontSize: scale(13),
                  lineHeight: scale(19),
                  color: Colors.textGrey,
                  fontWeight: "400",
                }}
              >
                {"Reply"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {isReply && (
        <>
          <View style={{ ...styles.container, paddingLeft: 30, marginTop: 4 }}>
            <Pressable
              onPress={() => navigation.navigate(SCREENS.OTHER_USER_PROFILE)}
            >
              <Image
                source={avatar}
                style={{ height: 24, width: 24, borderRadius: 6 }}
              />
            </Pressable>

            <View style={{ paddingLeft: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.ago}>{ago}</Text>
              </View>

              <Text style={styles.contentText}>{content}</Text>

              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={handleLike}
                  style={{
                    width: 56,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: scale(20),
                  }}
                >
                  <Image
                    source={liked ? Images.likeFilled : Images.like}
                    style={{
                      height: scale(16),
                      width: scale(16),
                      marginRight: 4,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: liked ? fonts.f700 : fonts.f500,
                      fontSize: scale(13),
                      lineHeight: scale(19),
                      color: liked ? "#024BAC" : Colors.textGrey,
                      fontWeight: liked ? "700" : "500",
                    }}
                  >
                    {disliked || liked ? likeCount : "Agree"}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleDislike}
                  style={{
                    width: 73,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: scale(20),
                  }}
                >
                  <Image
                    source={disliked ? Images.dislikeFilled : Images.dislike}
                    style={{
                      height: scale(16),
                      width: scale(16),
                      marginRight: 4,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: disliked ? fonts.f700 : fonts.f500,
                      fontSize: scale(13),
                      lineHeight: scale(19),
                      color: disliked ? "#E33F3F" : Colors.textGrey,
                      fontWeight: disliked ? "700" : "500",
                    }}
                  >
                    {disliked || liked ? dislikeCount : "Disagree"}
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: scale(10),
                  }}
                  // onPress={() => navigation.navigate(SCREENS.POST)}
                >
                  <Text
                    style={{
                      fontFamily: fonts.f400,
                      fontSize: scale(13),
                      lineHeight: scale(19),
                      color: Colors.textGrey,
                      fontWeight: "400",
                    }}
                  >
                    {"Reply"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: 12,
  },

  textName: {
    fontFamily: fonts.f700,
    fontWeight: "700",
    fontSize: scale(14),
    color: "#151B26",
    marginRight: 4,
  },

  ago: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: scale(13),
    color: "#717272",
  },

  contentText: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: scale(15),
    color: "#151B26",
    marginTop: 4,
    marginBottom: 8,
  },

  header: {
    flexDirection: "row",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#00000020",
  },

  avoidingView: {
    flex: 1,
  },
});
