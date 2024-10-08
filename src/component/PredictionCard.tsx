import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "../../helper";
import { Colors, fonts } from "../constant";
import { Images } from "../assets/images";
import { useRef, useState } from "react";
import Tooltip from "react-native-walkthrough-tooltip";

interface IPredictionCard {
  index: number;
}

const PredictionCard = ({ index }: IPredictionCard) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  return (
    <View
      style={[
        {
          marginVertical: scale(10),
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
          shadowColor: "rgba(0, 0, 0, 0.15)", // Increased shadow color intensity
          shadowOffset: {
            width: 0, // Shadow width (0px)
            height: 5, // Increased shadow height for a more pronounced shadow
          },
          shadowOpacity: 0.15, // Increased shadow opacity
          shadowRadius: 10, // Increased shadow radius for a softer shadow
          elevation: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
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
                }}
              >
                {"Nikunj Maniya"}{" "}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.f400,
                  fontSize: scale(12),
                  lineHeight: scale(15),
                }}
              >
                {"40.3%"}
              </Text>
            </View>
            <Text>{"2 hours ago"}</Text>
          </View>
          <Image
            source={Images.save}
            style={{
              height: scale(20),
              width: scale(20),
              alignSelf: "baseline",
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(15),
              lineHeight: scale(21),
              color: Colors.textBlack,
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
          }}
        >
          {
            "Becasue, lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel fermentum mi venenatis vitae nibh."
          }
        </Text>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: scale(10),
              }}
            >
              <Image
                source={Images.like}
                style={{ height: scale(16), width: scale(16), marginRight: 4 }}
              />
              <Text
                style={{
                  fontFamily: fonts.f400,
                  fontSize: scale(13),
                  lineHeight: scale(19),
                  color: Colors.textGrey,
                }}
              >
                {"Agree"}
              </Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: scale(10),
              }}
            >
              <Image
                source={Images.dislike}
                style={{ height: scale(16), width: scale(16), marginRight: 4 }}
              />
              <Text
                style={{
                  fontFamily: fonts.f400,
                  fontSize: scale(13),
                  lineHeight: scale(19),
                  color: Colors.textGrey,
                }}
              >
                {"Disagree"}
              </Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: scale(10),
              }}
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
                }}
              >
                {"Comment"}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <Image
              source={Images.share}
              style={{ height: scale(16), width: scale(16) }}
            />
          </View>
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
            }}
          >
            {"228.52 USD"}
          </Text>
          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(12),
              color: Colors.textGrey,
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
            }}
          >
            {"221.20 USD"}
          </Text>
          <Text
            style={{
              fontFamily: fonts.f400,
              fontSize: scale(12),
              color: Colors.textGrey,
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
              }}
            >
              {"30% Accurate"}
            </Text>
          </View>
          {/* <Text>{"Result in 5d"}</Text> */}
        </View>
      )}
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
  },
});
