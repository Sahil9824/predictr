import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Onboarding from "../screen/onboarding/Onboarding";
import CreateAccount from "../screen/onboarding/CreateAccount";
import Login from "../screen/onboarding/Login";
import ResetPassword from "../screen/onboarding/ResetPassword";
import SetNewPassword from "../screen/onboarding/SetNewPassword";
import SelectAvatar from "../screen/onboarding/SelectAvatar";
import FeedSetup from "../screen/onboarding/FeedSetup";
import DashBoard from "../screen/home/DashBoard";
import { SCREENS } from "../constant/navigation.constants";

const Stack = createNativeStackNavigator();

const PreloginStack = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      animationDuration: 300,
    }}
  >
    <Stack.Screen
      name={SCREENS.ONBOARDING}
      component={Onboarding}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={SCREENS.CREATE_ACCOUNT} component={CreateAccount} />
    <Stack.Screen name={SCREENS.LOGIN} component={Login} />
    <Stack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} />
    <Stack.Screen name={SCREENS.SET_NEW_PASSWORD} component={SetNewPassword} />
  </Stack.Navigator>
);

export default PreloginStack;
