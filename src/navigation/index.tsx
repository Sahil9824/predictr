import React, { useContext } from "react";
import { StatusBar } from "react-native";

import PreloginStack from "./Prelogin.stack";
import AppNavigation from "./AppNavigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import userStore from "../user.store";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

//TODO: When integration use this
const Navigation = () => {
  const { isAuthenticated } = userStore();

  return true ? (
    <BottomSheetModalProvider>
      <AppNavigation />
    </BottomSheetModalProvider>
  ) : (
    <PreloginStack />
  );
};

export default Navigation;
