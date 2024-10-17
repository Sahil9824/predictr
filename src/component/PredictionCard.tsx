import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale } from "../../helper";
import { Colors, fonts } from "../constant";
import { Images } from "../assets/images";
import { useRef, useState } from "react";
import Tooltip from "react-native-walkthrough-tooltip";
import ShareCard from "./ShareCard";
import Icons from "./Icons";
import { ICONS } from "../constant/icons.constants";
import { SCREENS } from "../constant/navigation.constants";
import { useNavigation } from "@react-navigation/native";

interface IPredictionCard {
  index: number;
  isFavorited: () => void;
  onFavoritePress: () => void;
}

const PredictionCard = ({ index, imgSrc }: IPredictionCard) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [liked, setLiked] = useState(false); // State to track if liked
  const [disliked, setDisliked] = useState(false); // State to track if disliked
  const [likeCount, setLikeCount] = useState(45); // Count for likes
  const [dislikeCount, setDislikeCount] = useState(70); // Count for dislikes
  const shareCardRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  const navigation = useNavigation();

  const handleToggleSave = () => {
    setIsSaved((p) => !p);
  };

  const onSharePress = () => {
    if (shareCardRef.current) {
      shareCardRef.current.present();
    }
  };

  // Function to handle like
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
    <View
      style={[
        {
          marginVertical: 5,
          borderRadius: scale(26),
          overflow: "hidden",
          borderWidth: 1,
          borderColor: Colors.lightGrey,
          backgroundColor: "#f0f3f5",
        },
        index === 2 && { borderColor: Colors.textRed },
        index === 3 && { borderColor: Colors.bgGreen },
      ]}
    >
      <View
        style={{
          padding: scale(16),
          borderBottomWidth: 1,
          borderRadius: scale(20),
          borderBottomColor: "white",
          backgroundColor: "white",
          overflow: "hidden",
          shadowColor: "rgba(0, 0, 0, 0.15)",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 10,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <Image
            source={Images.avatar6}
            style={{
              height: scale(40),
              width: scale(40),
              borderRadius: 8,
              marginRight: 8,
            }}
          />
          <View style={{ flexGrow: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: fonts.f800,
                  fontSize: scale(15),
                  lineHeight: scale(19),
                  color: Colors.textBlack,
                  fontWeight: "800",
                }}
              >
                {"Nikunj Maniya"}{" "}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.f400,
                  fontWeight: "400",

                  fontSize: scale(12),
                  lineHeight: scale(15),
                }}
              >
                {"40.3%"}
              </Text>
            </View>
            <Text>{"2 hours ago"}</Text>
          </View>

          <TouchableWithoutFeedback
            onPress={handleToggleSave}
            style={{ padding: 10 }}
          >
            {isSaved ? (
              <Icons type={ICONS.BOOKMARK} fill="#024BAC" stroke="#024BAC" />
            ) : (
              <Icons type={ICONS.BOOKMARK} />
            )}
          </TouchableWithoutFeedback>
          {/* <Image
            source={Images.save}
            style={{
              height: scale(20),
              width: scale(20),
              alignSelf: "baseline",
            }}
          /> */}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(15),
              lineHeight: scale(21),
              color: Colors.textBlack,
              fontWeight: "400",
            }}
          >
            {"I think "}
          </Text>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              borderRadius: 4,
            }}
            backgroundColor={"transparent"}
            isVisible={toolTipVisible}
            placement="top"
            onClose={() => setToolTipVisible(false)}
            content={
              <Text style={styles.tootltipText}>Tesla Private Limited</Text>
            }
          >
            <Pressable
              onPress={() => setToolTipVisible(true)}
              style={{
                backgroundColor: Colors.primaryBLueLight,
                paddingHorizontal: scale(6),
                paddingVertical: scale(4),
                borderRadius: scale(6),
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.f700,
                  fontSize: scale(15),
                  lineHeight: scale(19),
                  color: Colors.textBlack,
                  fontWeight: "700",
                }}
              >
                {"TSLA"}
              </Text>
            </Pressable>
          </Tooltip>
          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(15),
              fontWeight: "400",

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
            }}
          >
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(15),
                lineHeight: scale(19),
                color: Colors.textBlack,
                fontWeight: "700",
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
              fontWeight: "400",
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
            }}
          >
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(15),
                lineHeight: scale(19),
                color: Colors.textBlack,
                fontWeight: "700",
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
            fontWeight: "400",
          }}
        >
          {
            "Becasue, lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel fermentum mi venenatis vitae nibh."
          }
        </Text>

        {imgSrc && (
          <Image
            source={{ uri: imgSrc }}
            style={{ width: "100%", height: 190, marginBottom: 12 }}
          />
        )}

        <View style={{ flexDirection: "row", marginTop: 10 }}>
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
          </View>
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
              style={{ height: scale(16), width: scale(16), marginRight: 4 }}
            />
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(13),
                lineHeight: scale(19),
                color: Colors.textGrey,
                fontWeight: "400",
              }}
            >
              {"Comment"}
            </Text>
          </Pressable>
          <TouchableOpacity onPress={onSharePress}>
            <View
              style={{
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "flex-end",
                marginStart: scale(40),
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
          backgroundColor: "#f0f3f5",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(12),
              color: Colors.textGrey,
              lineHeight: scale(19),
              fontWeight: "400",
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
              fontWeight: "700",
            }}
          >
            {"228.52 USD"}
          </Text>
          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(12),
              color: Colors.textGrey,
              fontWeight: "400",
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
              fontWeight: "400",
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
              fontWeight: "700",
            }}
          >
            {"221.20 USD"}
          </Text>
          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(12),
              color: Colors.textGrey,
              fontWeight: "400",
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
              fontWeight: "400",
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
                fontWeight: "700",
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
                fontWeight: "700",
              }}
            >
              {"No movement yet"}
            </Text>
          </View>
          <Text>{"Result in 5d"}</Text>
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
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                fontWeight: "700",
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
                fontWeight: "700",
              }}
            >
              {"LIVE TRACKING"}
            </Text>
          </View>
          <Text>{"Result in 5d"}</Text>
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
          {/* <Text>{"Result in 5d"}</Text> */}
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
                fontWeight: "700",
              }}
            >
              {"30% Accurate"}
            </Text>
          </View>
          {/* <Text>{"Result in 5d"}</Text> */}
        </View>
      )}
      <ShareCard ref={shareCardRef} />
    </View>
  );
};

export default PredictionCard;

const styles = StyleSheet.create({
  tooltip: {
    width: "auto",
  },

  tootltipText: {
    color: "white",
    fontFamily: fonts.f500,
    fontSize: scale(12),
    fontWeight: "500",
  },
});
