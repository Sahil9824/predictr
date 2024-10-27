import LottieView from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";
import { fonts } from "../constant";
import { scale } from "../../helper";

const Splash = ({ setAnimationFinished }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#024BAC",
        paddingHorizontal: 92,
        paddingBottom: 37,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 133,
        }}
      >
        <LottieView
          source={require("../assets/Predictor_Splash.json")}
          style={{ width: scale(191), height: scale(71) }}
          autoPlay
          loop={false}
          onAnimationFinish={() => setAnimationFinished(true)}
        />
      </View>
      <Text
        style={{
          fontFamily: fonts.f400,
          fontSize: 16,
          //fontWeight: "400",
          color: "#679EE7",
        }}
      >
        By StockAlgos.com
      </Text>
    </View>
  );
};

export default Splash;
