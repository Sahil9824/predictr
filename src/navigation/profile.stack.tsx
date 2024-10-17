import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import DashBoard from "../screen/home/DashBoard";
import { SCREENS } from "../constant/navigation.constants";
import SearchStack from "./Search.stack";
import { HowToPredictScreen } from "../component/HowItWorks";
import UserProfile from "../screen/Profile/UserProfile";
import MenuScreen from "../screen/Profile/Menu";
import FAQScreen from "../screen/Profile/Faq";
import SelectAvatar from "../screen/onboarding/SelectAvatar";
import GeneralList from "../screen/GeneralList";
import NotificationSettings from "../screen/Profile/NotificationSettings";
import GiveFeedback from "../screen/Profile/Feedback";
import ChangePassword from "../screen/Profile/ChangePassword";
import Privacy from "../screen/Profile/Privacy";
import TermsAndConditions from "../screen/Profile/Terms";
import OtherUserProfile from "../screen/Profile/OtherUserProfile";
import Post from "../screen/home/Post";

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      animationDuration: 300,
    }}
  >
    <Stack.Screen
      name={SCREENS.PROFILE}
      component={UserProfile}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={SCREENS.POST}
      component={Post}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={SCREENS.OTHER_USER_PROFILE}
      component={OtherUserProfile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.GENERAL_SCREEN}
      component={GeneralList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.SELECT_AVATAR}
      component={SelectAvatar}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.MENU}
      component={MenuScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.FAQS}
      component={FAQScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.NOTIFICATION_SETTINGS}
      component={NotificationSettings}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.FEEDBACK}
      component={GiveFeedback}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.CHANGE_PASSWORD}
      component={ChangePassword}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.PRIVACY}
      component={Privacy}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.TERMS}
      component={TermsAndConditions}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default ProfileStack;
