import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../component/Tabicon";
import { APP_NAVIGATION } from "../constant/navigation.constants";
import OnboardingStack from "./Onboarding.stack";
import HomeStack from "./Home.stack";
import { fonts } from "../constant";
import { Dimensions, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();
const numOfTabs = 5;
const { width } = Dimensions.get("window");
export default function App() {
  const tabWidth = width / numOfTabs - 20;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} route={route} />
        ),
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 15,
          paddingTop: 7,
          height: 70,
          backgroundColor: "#fefefe",
          justifyContent: "space-between",
        },
        tabBarItemStyle: {
          width: tabWidth, // Set width dynamically based on screen size
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontFamily: fonts.f600,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name={APP_NAVIGATION.HOME_SCREEN} component={HomeStack} />
      <Tab.Screen name={APP_NAVIGATION.LEADERBOARD} component={HomeStack} />
      <Tab.Screen name={APP_NAVIGATION.PREDICTION} component={HomeStack} />
      <Tab.Screen name={APP_NAVIGATION.NOTIFICATION} component={HomeStack} />
      <Tab.Screen name={APP_NAVIGATION.PROFILE} component={HomeStack} />
    </Tab.Navigator>
  );
}
