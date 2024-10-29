import React, { useContext, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";

import PreloginStack from "./Prelogin.stack";
import AppNavigation from "./AppNavigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import userStore from "../user.store";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingStack from "./Onboarding.stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Splash from "../screen/Splash";
import { Colors } from "../constant";

//TODO: When integration use this
const Navigation = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const { isAuthenticated, isOnboarded } = userStore();
  const isDarkMode = useColorScheme() === "dark";

  return !animationFinished ? (
    <Splash setAnimationFinished={setAnimationFinished} />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        {isAuthenticated ? (
          isOnboarded ? (
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
