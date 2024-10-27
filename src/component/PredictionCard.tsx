import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from "react-native";
import { scale } from "../../helper";
import { Colors, fonts } from "../constant";
import { Images } from "../assets/images";
import { useEffect, useRef, useState } from "react";
import ShareCard from "./ShareCard";
import Icons from "./Icons";
import { ICONS } from "../constant/icons.constants";
import { SCREENS } from "../constant/navigation.constants";
import { useNavigation } from "@react-navigation/native";

interface IPredictionCard {
  index: number;
  isFavorited: () => void;
  onFavoritePress: () => void;
  isFollowBtn?: boolean;
  imgSrc: string;
  style: any;
  isBookmarked: boolean;
}

const PredictionCard = ({
  index,
  imgSrc,
  isFollowBtn,
  style,
  isBookmarked = false,
}: IPredictionCard) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [liked, setLiked] = useState(false); // State to track if liked
  const [disliked, setDisliked] = useState(false); // State to track if disliked

  const [textWidth, setTextWidth] = useState(0);
  const [likeCount, setLikeCount] = useState(45); // Count for likes
  const [dislikeCount, setDislikeCount] = useState(70); // Count for dislikes
  const shareCardRef = useRef(null);
  const [isSaved, setIsSaved] = useState(isBookmarked);

  const navigation = useNavigation();

  const handleToggleSave = () => {
    setIsSaved((p) => !p);
  };

  const onSharePress = () => {
    if (shareCardRef.current) {
      shareCardRef.current.present();
    }
  };

  const handlePress = () => {
    setToolTipVisible(true);
  };

  useEffect(() => {
    if (toolTipVisible) {
      const timer = setTimeout(() => setToolTipVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [toolTipVisible]);

  // Function to handle like
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1); // Decrement like count
    } else {
      Vibration.vibrate(100);

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
      Vibration.vibrate(100);

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
      <StatusBar backgroundColor="white" />

      <View
        style={[
          {
            marginVertical: 4,
            borderRadius: scale(26),
            overflow: "hidden",
            borderWidth: 1,
            borderColor: Colors.lightGrey,
            backgroundColor: "#f0f3f5",
            ...style,
          },
          index === 2 && { borderColor: Colors.textRed, borderWidth: 2 },
          index === 3 && { borderColor: Colors.bgGreen, borderWidth: 2 },
        ]}
      >
        <View
          style={{
            padding: scale(16),
            borderBottomWidth: 1,
            borderRadius: scale(20),
            borderBottomColor: "white",
            backgroundColor: "white",
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.15,
            shadowRadius: 9,
            elevation: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 12,
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(SCREENS.OTHER_USER_PROFILE)}
            >
              <Image
                source={Images.avatar6}
                style={{
                  height: scale(40),
                  width: scale(40),
                  borderRadius: scale(8),
                  marginRight: 8,
                }}
              />
            </TouchableWithoutFeedback>
            <View style={{ flexGrow: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate(SCREENS.OTHER_USER_PROFILE)
                  }
                >
                  <Text
                    style={{
                      fontFamily: fonts.f800,
                      fontSize: scale(15),
                      lineHeight: scale(19),
                      color: Colors.textBlack,
                      //fontWeight: "800",
                    }}
                    suppressHighlighting={true}
                  >
                    {"Nikunj Maniya"}{" "}
                  </Text>
                </TouchableWithoutFeedback>
                <Text
                  style={{
                    fontFamily: fonts.f400,
                    //fontWeight: "400",

                    fontSize: scale(12),
                    lineHeight: scale(15),
                  }}
                >
                  {"40.3%"}
                </Text>
              </View>
              <Text>{"2 hours ago"}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                height: "100%",
                paddingTop: 3,
              }}
            >
              {isFollowBtn && (
                <TouchableOpacity activeOpacity={0.8}>
                  <Text
                    style={{
                      color: "#024BAC",
                      //fontWeight: "800",
                      fontFamily: fonts.f800,
                      fontSize: 14,
                      marginRight: 10,
                    }}
                  >
                    Follow
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableWithoutFeedback
                onPress={handleToggleSave}
                style={{ paddingHorizontal: 10 }}
              >
                {isSaved ? (
                  <Icons
                    type={ICONS.BOOKMARK}
                    fill="#024BAC"
                    stroke="#024BAC"
                  />
                ) : (
                  <Icons type={ICONS.BOOKMARK} />
                )}
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(15),
                lineHeight: scale(21),
                color: Colors.textBlack,
                //fontWeight: "400",
              }}
            >
              {"I think "}
            </Text>

            <Pressable
              onPress={handlePress}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setTextWidth(width);
              }}
              style={{
                backgroundColor: Colors.primaryBLueLight,
                paddingHorizontal: scale(6),
                paddingVertical: scale(4),
                borderRadius: scale(6),
                marginHorizontal: 3,
                position: "relative",
              }}
            >
              {toolTipVisible && (
                <View style={[styles.tooltip, { left: textWidth / 2 - 70 }]}>
                  <Text style={styles.tooltipText}>Tesla Stock (TSLA)</Text>
                </View>
              )}
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(15),
                  lineHeight: scale(19),
                  color: Colors.textBlack,
                  //fontWeight: "700",
                }}
              >
                {"TSLA"}
              </Text>
            </Pressable>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(15),
                //fontWeight: "400",

                lineHeight: scale(21),
                color: Colors.textBlack,
              }}
            >
              {" will go "}
            </Text>
            <View
              style={{
                backgroundColor: Colors.primaryBLueLight,
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 6,
                marginHorizontal: 3,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(15),
                  lineHeight: scale(19),
                  color: Colors.textBlack,
                  //fontWeight: "700",
                }}
              >
                {" Up 4% "}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(15),
                lineHeight: scale(21),
                color: Colors.textBlack,
                //fontWeight: "400",
              }}
            >
              {" by "}
            </Text>
            <View
              style={{
                backgroundColor: Colors.primaryBLueLight,
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 6,
                marginHorizontal: 3,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(15),
                  lineHeight: scale(19),
                  color: Colors.textBlack,
                  //fontWeight: "700",
                }}
              >
                {"Apr 5"}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(15),
              lineHeight: scale(21),
              color: Colors.textBlack,
              //fontWeight: "400",
            }}
          >
            {
              "Becasue, lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel fermentum mi venenatis vitae nibh."
            }
          </Text>

          {imgSrc && (
            <Image
              source={imgSrc}
              style={{
                width: "100%",
                height: 190,
                marginTop: 12,
                borderRadius: 16,
              }}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              alignItems: "center",
            }}
          >
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
                    fontFamily: liked ? fonts.f700 : fonts.f400,
                    fontSize: scale(13),
                    lineHeight: scale(19),
                    color: liked ? "#024BAC" : Colors.textGrey,
                    // fontWeight: liked ? "700" : "400",
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
                    fontFamily: disliked ? fonts.f700 : fonts.f400,
                    fontSize: scale(13),
                    lineHeight: scale(19),
                    color: disliked ? "#E33F3F" : Colors.textGrey,
                    // fontWeight: disliked ? "700" : "400",
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
                onPress={() => navigation.navigate(SCREENS.POST)}
              >
                <Image
                  source={Images.comment}
                  style={{
                    height: scale(16),
                    width: scale(16),
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    fontFamily: fonts.f400,
                    fontSize: scale(13),
                    lineHeight: scale(19),
                    color: Colors.textGrey,
                    //fontWeight: "400",
                  }}
                >
                  {"Comment"}
                </Text>
              </Pressable>
            </View>

            <TouchableOpacity onPress={onSharePress}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={Images.share}
                  style={{ height: scale(16), width: scale(16) }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: scale(16),
            justifyContent: "space-between",
            overflow: "hidden",
            paddingRight: 48,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(12),
                color: Colors.textGrey,
                lineHeight: scale(19),
                //fontWeight: "400",
              }}
            >
              {"When Guessed"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(15),
                lineHeight: scale(19),
                color: Colors.textBlack,
                //fontWeight: "700",
              }}
            >
              {"228.52 USD"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(12),
                color: Colors.textGrey,
                //fontWeight: "400",
              }}
            >
              {"24 Oct, 7:59 pm"}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(12),
                color: Colors.textGrey,
                lineHeight: scale(19),
                //fontWeight: "400",
              }}
            >
              {"Last Updated"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(15),
                lineHeight: 19,
                color: Colors.textBlack,
                //fontWeight: "700",
              }}
            >
              {"221.20 USD"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(12),
                color: Colors.textGrey,
                //fontWeight: "400",
              }}
            >
              {"28 Oct, 2:59 pm"}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(12),
                color: Colors.textGrey,
                lineHeight: scale(19),
                //fontWeight: "400",
              }}
            >
              {"Movement"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(15),
                  lineHeight: scale(19),
                  color: Colors.textRed,
                  //fontWeight: "700",
                }}
              >
                {"-3.2%"}
              </Text>
              <Image
                source={Images.downArrow}
                style={{ height: scale(12), width: scale(12), marginLeft: 2 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {index === 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: scale(16),
              backgroundColor: "#DFE3E6",
              borderBottomEndRadius: scale(24),
              borderBottomStartRadius: scale(24),
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={Images.noMovement}
                style={{
                  height: scale(18),
                  width: scale(18),
                  marginRight: scale(6),
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(14),
                  color: Colors.textBlack,
                  //fontWeight: "700",
                }}
              >
                {"No movement yet"}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.f400,
                //fontWeight: "400",
                fontSize: 14,
                color: "#717272",
              }}
            >
              {"Result in 5d"}
            </Text>
          </View>
        )}

        {index === 1 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: scale(16),
              backgroundColor: "#FBBABA",
              borderBottomEndRadius: scale(24),
              borderBottomStartRadius: scale(24),
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={Images.wrongMark}
                style={{
                  height: scale(18),
                  width: scale(18),
                  marginRight: scale(6),
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(14),
                  color: Colors.textRed,
                  //fontWeight: "700",
                }}
              >
                {"Inaccuracy"}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(10),
                  lineHeight: scale(12),
                  marginLeft: scale(4),
                  marginTop: scale(3),
                  //fontWeight: "700",
                  letterSpacing: 0.4,
                }}
              >
                {"LIVE TRACKING"}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.f400,
                //fontWeight: "400",
                fontSize: 14,
                color: "#717272",
              }}
            >
              {"Result in 5d"}
            </Text>
          </View>
        )}

        {index === 2 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: scale(16),
              backgroundColor: Colors.textRed,
              borderBottomEndRadius: scale(24),
              borderBottomStartRadius: scale(24),
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={Images.wrongMarkWhite}
                style={{
                  height: scale(18),
                  width: scale(18),
                  marginRight: scale(6),
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(14),
                  color: Colors.white,
                }}
              >
                {"Inaccurate"}
              </Text>
            </View>
          </View>
        )}

        {index === 3 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: scale(16),
              backgroundColor: Colors.bgGreen,
              borderBottomEndRadius: scale(24),
              borderBottomStartRadius: scale(24),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={Images.wrongMarkWhite}
                style={{
                  height: scale(18),
                  width: scale(18),
                  marginRight: scale(6),
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(14),
                  color: Colors.white,
                  //fontWeight: "700",
                }}
              >
                {"30% Accurate"}
              </Text>
            </View>
          </View>
        )}
        <ShareCard ref={shareCardRef} />
      </View>
    </>
  );
};

export default PredictionCard;

const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",
    width: 150,
    bottom: scale(30),
    backgroundColor: "#000000BF",
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tooltipText: {
    color: "white",
    fontFamily: fonts.f500,
    fontSize: scale(12),
    //fontWeight: "500",
    letterSpacing: scale(12) * -0.02,
  },
});
