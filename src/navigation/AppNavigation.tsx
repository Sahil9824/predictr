import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../component/Tabicon";
import { APP_NAVIGATION, SCREENS } from "../constant/navigation.constants";
import OnboardingStack from "./Onboarding.stack";
import HomeStack from "./Home.stack";
import { fonts } from "../constant";
import LeaderboardScreen from "../screen/Leaderboard/LeaderboardScreen";
import { openSettings } from "react-native-permissions";
import OtherUserProfile from "../screen/Profile/OtherUserProfile";
import {
  Dimensions,
  Easing,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectAvatar from "../screen/onboarding/SelectAvatar";
import ProfileStack from "./profile.stack";
import Icons from "../component/Icons";
import { ICONS } from "../constant/icons.constants";
import PredictionStack from "./Prediction.stack";
import NotificationScreen from "../screen/Notification";
import LeaderboardStack from "./Leaderboard.stack";
import NotificationStack from "./Notification.stack";

const Tab = createBottomTabNavigator();
const numOfTabs = 5;
const { width, height } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const tabWidth = width / numOfTabs - 20;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TouchableWithoutFeedback onPress={() => navigation.navigate(route)}>
            <TabIcon focused={focused} route={route} />
          </TouchableWithoutFeedback>
        ),
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 7,
          height: Platform.OS === "ios" ? 80 : 65,
          backgroundColor: "#fefefe",
          justifyContent: "space-between",
        },

        tabBarItemStyle: {
          width: tabWidth,
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontFamily: fonts.f600,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen name={APP_NAVIGATION.HOME_SCREEN} component={HomeStack} />
      <Tab.Screen
        name={APP_NAVIGATION.LEADERBOARD}
        component={LeaderboardStack}
      />

      <Tab.Screen
        name={APP_NAVIGATION.PREDICTION}
        options={{
          tabBarStyle: { display: "none" },
        }}
        component={PredictionStack}
      />
      <Tab.Screen
        name={APP_NAVIGATION.NOTIFICATION}
        component={NotificationStack}
      />
      <Tab.Screen name={APP_NAVIGATION.PROFILE} component={ProfileStack} />
    </Tab.Navigator>
  );
}
