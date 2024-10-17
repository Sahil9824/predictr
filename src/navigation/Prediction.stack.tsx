import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashBoard from "../screen/home/DashBoard";
import { SCREENS } from "../constant/navigation.constants";
import Prediction from "../screen/Prediction/Prediction";

const Stack = createNativeStackNavigator();

const PredictionStack = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      animationDuration: 300,
    }}
  >
    <Stack.Screen
      name={SCREENS.PREDICTION}
      component={Prediction}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default PredictionStack;
