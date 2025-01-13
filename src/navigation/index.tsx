import React, { useContext, useEffect, useState } from "react";
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
import { loadAsync } from "expo-font";

//TODO: When integration use this
const Navigation = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const { isAuthenticated, isOnboarded } = userStore();
  const isDarkMode = useColorScheme() === "dark";

  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadFonts() {
  //     setFontsLoaded(true);

  //     await loadAsync({
  //       Inter_Black: require("../assets/fonts/Inter 18pt Black.ttf"),
  //       Inter_Bold: require("../assets/fonts/Inter 18pt Bold.ttf"),
  //       Inter_Bold_Italic: require("../assets/fonts/Inter Bold Italic.ttf"),
  //       Inter_Extra_Bold: require("../assets/fonts/Inter 18pt ExtraBold.ttf"),
  //       Inter_Medium: require("../assets/fonts/Inter 18pt Medium.ttf"),
  //       Inter_Regular: require("../assets/fonts/Inter 18pt Regular.ttf"),
  //       Inter_SemiBold: require("../assets/fonts/Inter 18pt SemiBold.ttf"),
  //       SF_Black: require("../assets/fonts/SF Pro Text Black.otf"),
  //       SF_Bold_Italic: require("../assets/fonts/SF Pro Text Bold Italic.ttf"),
  //       SF_Bold: require("../assets/fonts/SF Pro Text Bold.ttf"),
  //       SF_Heavy: require("../assets/fonts/SF Pro Text Heavy.ttf"),
  //       SF_Medium: require("../assets/fonts/SF Pro Text Medium.ttf"),
  //       SF_Regular: require("../assets/fonts/SF Pro Text Regular.ttf"),
  //       SF_Semibold: require("../assets/fonts/SF Pro Text Semibold.ttf"),
  //     });
  //     setFontsLoaded(false);
  //   }

  //   loadFonts();
  // }, []);

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
