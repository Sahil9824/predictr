import { Image, Text, TouchableOpacity, View } from "react-native";
import { scale } from "../../helper";
import { Colors, fonts } from "../constant";
import { Images } from "../assets/images";

const WinnerCard = ({ openBottomSheet }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: Colors.primaryBlue,
          paddingVertical: scale(30),
          alignItems: "center",
          borderRadius: scale(24),
        }}
      >
        <Text
          style={{
            fontFamily: fonts.f700,
            color: Colors.yellow,
            fontSize: scale(16),
            lineHeight: scale(20),
            marginBottom: scale(10),
            fontWeight: "700",
          }}
        >
          {"Predict to win monthly prizes"}
        </Text>
        <Text
          style={{
            fontFamily: fonts.f800,
            fontSize: scale(22),
            lineHeight: scale(27),
            textAlign: "center",
            color: Colors.white,
            fontWeight: "800",
          }}
        >
          {"Win $500, $300 and $200\n for top three predictors"}
        </Text>

        <View
          style={{
            marginTop: scale(20),
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: scale(30),
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginTop: scale(30),
            }}
          >
            <Image
              source={Images.silverTrophy}
              style={{ height: scale(24), width: scale(27) }}
              resizeMode="contain"
            />
            <Image
              source={Images.avatar6}
              style={{ height: scale(32), width: scale(32), borderRadius: 8 }}
            />
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(11),
                lineHeight: scale(14),
                textAlign: "center",
                color: Colors.white,
                marginVertical: scale(4),
                fontWeight: "700",
              }}
            >
              {"Braden Edwards"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(10),
                lineHeight: scale(13),
                textAlign: "center",
                color: Colors.white,
                fontWeight: "400",
              }}
            >
              {"56.8% Accurate"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(10),
                lineHeight: scale(13),
                textAlign: "center",
                color: Colors.white,
                fontWeight: "400",
              }}
            >
              {"3 Predictions"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(12),
                lineHeight: scale(15),
                color: Colors.textGreen,
                marginTop: scale(6),
                fontWeight: "700",
              }}
            >
              {"$300"}
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              marginHorizontal: scale(30),
              alignSelf: "auto",
            }}
          >
            <Image
              source={Images.goldTrophy}
              style={{ height: scale(40), width: scale(30) }}
              resizeMode="contain"
            />
            <Image
              source={Images.avatar15}
              style={{
                height: scale(52),
                width: scale(52),
                borderRadius: scale(8),
              }}
            />
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(11),
                lineHeight: scale(14),
                textAlign: "center",
                color: Colors.white,
                marginVertical: scale(4),
                fontWeight: "700",
              }}
            >
              {"Jesus Boston"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(10),
                lineHeight: scale(13),
                textAlign: "center",
                color: Colors.white,
                fontWeight: "400",
              }}
            >
              {"60.2% Accurate"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(10),
                lineHeight: scale(13),
                textAlign: "center",
                color: Colors.white,
                fontWeight: "400",
              }}
            >
              {"3 Predictions"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(12),
                lineHeight: scale(15),
                color: Colors.textGreen,
                marginTop: scale(6),
                fontWeight: "700",
              }}
            >
              {"$500"}
            </Text>
          </View>

          <View
            style={{ alignItems: "center", alignSelf: "center", marginTop: 30 }}
          >
            <Image
              source={Images.bronzeTrophy}
              style={{ height: scale(24), width: scale(27) }}
              resizeMode="contain"
            />
            <Image
              source={Images.avatar13}
              style={{
                height: scale(32),
                width: scale(32),
                borderRadius: scale(8),
              }}
            />
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(11),
                lineHeight: scale(14),
                textAlign: "center",
                color: Colors.white,
                marginVertical: scale(4),
                fontWeight: "700",
              }}
            >
              {"Patrik Manning"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(10),
                lineHeight: scale(13),
                textAlign: "center",
                color: Colors.white,
                fontWeight: "400",
              }}
            >
              {"45.5% Accurate"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f400,
                fontSize: scale(10),
                lineHeight: scale(13),
                textAlign: "center",
                fontWeight: "400",

                color: Colors.white,
              }}
            >
              {"3 Predictions"}
            </Text>
            <Text
              style={{
                fontFamily: fonts.f700,
                fontSize: scale(12),
                lineHeight: scale(15),
                color: Colors.textGreen,
                marginTop: scale(6),
                fontWeight: "700",
              }}
            >
              {"$200"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openBottomSheet}
          style={{
            width: scale(255),
            borderRadius: scale(8),
            backgroundColor: Colors.white,
            justifyContent: "center",
            padding: scale(12),
          }}
        >
          <Text
            style={{
              fontFamily: fonts.f800,
              color: Colors.textBlack,
              textAlign: "center",
              fontSize: scale(16),
              fontWeight: "800",
            }}
          >
            {"Winners of August 2024"}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: Colors.white,
            paddingVertical: scale(15),
            fontFamily: fonts.f600,
            fontWeight: "600",
          }}
        >
          {"Contest Details"}
        </Text>
        <Image
          source={Images.dots}
          style={{ height: scale(6), width: scale(16) }}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

export default WinnerCard;
