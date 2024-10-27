import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "../../helper";
import { Colors, fonts } from "../constant";
import { Images } from "../assets/images";
import { SCREENS } from "../constant/navigation.constants";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";
import { ICONS } from "../constant/icons.constants";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useRef } from "react";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const WinnerCard = ({
  setIsSelected,
  openBottomSheet,
  setWinnerHeight,
  style,
}) => {
  return (
    <>
      <ImageBackground
        source={Images.WinnerBg}
        style={{
          borderRadius: scale(24),
          overflow: "hidden",
          ...style,
        }}
      >
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setWinnerHeight(height);
          }}
          style={{
            paddingBottom: 20,
            paddingTop: 32,
            alignItems: "center",
            position: "relative",
          }}
        >
          <Text
            style={{
              fontFamily: fonts.f700,
              color: Colors.yellow,
              fontSize: scale(16),
              lineHeight: scale(20),
              marginBottom: scale(10),
              //fontWeight: "700",
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
              //fontWeight: "800",
            }}
          >
            {"Win $500, $300 and $200\n for top three predictors"}
          </Text>

          <View
            style={{
              marginTop: scale(20),
              flexDirection: "row",
              // justifyContent: "space-around",
              marginBottom: scale(30),
              gap: 0,
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginTop: scale(30),
                justifyContent: "center",
              }}
            >
              <Icons type={ICONS.SILVER} />

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
                  //fontWeight: "700",
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
                  //fontWeight: "400",
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
                  //fontWeight: "400",
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
                  //fontWeight: "700",
                }}
              >
                {"$300"}
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                marginHorizontal: "6%",
                alignSelf: "auto",
              }}
            >
              <View style={{ marginBottom: -15, zIndex: 1 }}>
                <Icons type={ICONS.GOLD} width={50} height={50} />
              </View>

              <View
                style={{
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: "#FFFFFF40",
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: "#5e8cca",
                  shadowColor: "#FFFFFF",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.25,
                  shadowRadius: 2,
                }}
              >
                <Image
                  source={Images.avatar15}
                  style={{
                    height: scale(52),
                    width: scale(52),
                    borderRadius: 12,
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
                    //fontWeight: "700",
                  }}
                >
                  {"$500"}
                </Text>
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginTop: 30,
              }}
            >
              <Icons type={ICONS.BRONZE} width={28} height={28} />

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
                  //fontWeight: "700",
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
                  //fontWeight: "400",
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
                  //fontWeight: "700",
                }}
              >
                {"$200"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsSelected(2);
            }}
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
                //fontWeight: "800",
              }}
            >
              {"Winners of August 2024"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openBottomSheet}>
            <Text
              style={{
                color: "#ffffff99",
                marginVertical: 18,
                fontFamily: fonts.f600,
                //fontWeight: "600",
              }}
            >
              {"Contest Details"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default WinnerCard;
