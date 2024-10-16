import React, { useContext } from "react";
import { StatusBar } from "react-native";

import PreloginStack from "./Prelogin.stack";
import AppNavigation from "./AppNavigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import userStore from "../user.store";

//TODO: When integration use this
const Navigation = () => {
  const { isAuthenticated } = userStore();

  return true ? (
    <>
      <BottomSheetModalProvider>
        <AppNavigation />
      </BottomSheetModalProvider>
    </>
  ) : (
    <>
      <PreloginStack />
    </>
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
