//@ts-nocheck

import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import Onboarding from "../screen/onboarding/Onboarding";

import SelectAvatar from "../screen/onboarding/SelectAvatar";
import FeedSetup from "../screen/onboarding/FeedSetup";
import DashBoard from "../screen/home/DashBoard";
import { SCREENS } from "../constant/navigation.constants";

const Stack = createNativeStackNavigator();

const OnboardingStack = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      animationDuration: 300,
    }}
  >
    <Stack.Screen
      name={SCREENS.SELECT_AVATAR}
      component={SelectAvatar}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.FEED_SETUP}
      component={FeedSetup}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.HOME}
      component={DashBoard}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingStack;
