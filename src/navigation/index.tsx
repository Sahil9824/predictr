import React, { useContext } from "react";
import { StatusBar } from "react-native";

import PreloginStack from "./Prelogin.stack";
import AppNavigation from "./AppNavigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import userStore from "../user.store";
import { useRoute } from "@react-navigation/native";
import { SCREENS } from "../constant/navigation.constants";
import { SafeAreaView } from "react-native-safe-area-context";

//TODO: When integration use this
const Navigation = () => {
  const { isAuthenticated } = userStore();

  return true ? (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} />
        <AppNavigation />
      </SafeAreaView>
    </BottomSheetModalProvider>
  ) : (
    <PreloginStack />
  );
};

// const Navigation = () => {
//   return (
//     <>
//       {/* <StatusBar barStyle="light-content" backgroundColor={COLORS.STATUS_BAR} /> */}
//       <AppNavigation />

//       <PreloginStack />
//     </>
//   );
// };

export default Navigation;
