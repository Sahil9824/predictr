import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import DashBoard from "../screen/home/DashBoard";
import { SCREENS } from "../constant/navigation.constants";
import SearchStack from "./Search.stack";
import { HowToPredictScreen } from "../component/HowItWorks";
import Post from "../screen/home/Post";
import GeneralList from "../screen/GeneralList";
import OtherUserProfile from "../screen/Profile/OtherUserProfile";

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      animationDuration: 300,
    }}
  >
    <Stack.Screen
      name={SCREENS.HOME}
      component={DashBoard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.SEARCH}
      component={SearchStack}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={SCREENS.HOW_IT_WORKS}
      component={HowToPredictScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={SCREENS.POST}
      component={Post}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.GENERAL_SCREEN}
      component={GeneralList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.OTHER_USER_PROFILE}
      component={OtherUserProfile}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HomeStack;
