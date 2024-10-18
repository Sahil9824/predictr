import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SCREENS } from "../constant/navigation.constants";

import OtherUserProfile from "../screen/Profile/OtherUserProfile";
import LeaderboardScreen from "../screen/Leaderboard/LeaderboardScreen";

const Stack = createNativeStackNavigator();

const LeaderboardStack = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      animationDuration: 300,
    }}
  >
    <Stack.Screen
      name={SCREENS.LEADERBOARD}
      component={LeaderboardScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={SCREENS.OTHER_USER_PROFILE}
      component={OtherUserProfile}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default LeaderboardStack;
