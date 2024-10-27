import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashBoard from "../screen/home/DashBoard";
import { APP_NAVIGATION, SCREENS } from "../constant/navigation.constants";
import Prediction from "../screen/Prediction/Prediction";
import { Animated, Platform } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Post from "../screen/home/Post";

const Stack = createNativeStackNavigator();

const PredictionStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "ios",
        animationDuration: 200,
      }}
    >
      <Stack.Screen
        name={SCREENS.PREDICTION}
        component={Prediction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.POST}
        component={Post}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PredictionStack;
