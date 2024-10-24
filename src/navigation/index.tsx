import React, { useContext } from "react";
import { StatusBar } from "react-native";

import PreloginStack from "./Prelogin.stack";
import AppNavigation from "./AppNavigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import userStore from "../user.store";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingStack from "./Onboarding.stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//TODO: When integration use this
const Navigation = () => {
  const { isAuthenticated, isOnboarded } = userStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        {true ? (
          true ? (
            <AppNavigation />
          ) : (
            <OnboardingStack />
          )
        ) : (
          <PreloginStack />
        )}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Navigation;
