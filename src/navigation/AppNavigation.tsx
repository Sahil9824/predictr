import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import TabIcon from "../component/Tabicon";
import { APP_NAVIGATION } from "../constant/navigation.constants";
import OnboardingStack from "./Onboarding.stack";
import HomeStack from "./Home.stack";
import { fonts } from "../constant";
<<<<<<< Updated upstream
import LeaderboardScreen from "../screen/Leaderboard/LeaderboardScreen";
import { Dimensions } from "react-native";
import { openSettings } from "react-native-permissions";
import OtherUserProfile from "../screen/Profile/OtherUserProfile";
=======
import { Dimensions, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectAvatar from "../screen/onboarding/SelectAvatar";
>>>>>>> Stashed changes

const Tab = createBottomTabNavigator();
const numOfTabs = 5;
const { width } = Dimensions.get("window");
<<<<<<< Updated upstream
=======
const Stack = createNativeStackNavigator();
>>>>>>> Stashed changes

export default function App() {
  const tabWidth = width / numOfTabs - 20;

  return (
<<<<<<< Updated upstream
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props} 
          />
        ),
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} route={route} />,
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
          width: tabWidth, 
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontFamily: fonts.f600,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name={APP_NAVIGATION.HOME_SCREEN} component={HomeStack} />
      <Tab.Screen name={APP_NAVIGATION.LEADERBOARD} component={LeaderboardScreen} />
      <Tab.Screen name={APP_NAVIGATION.PREDICTION} component={HomeStack} />
      <Tab.Screen name={APP_NAVIGATION.NOTIFICATION} component={HomeStack} />
      <Tab.Screen name={APP_NAVIGATION.PROFILE} component={OtherUserProfile} />
    </Tab.Navigator>
=======
    <>
      <Stack.Screen name={SCREENS.SELECT_AVATAR} component={SelectAvatar} />
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
    </>
>>>>>>> Stashed changes
  );
}
