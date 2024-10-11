import React, { useContext } from "react";
import { StatusBar } from "react-native";

import PreloginStack from "./Prelogin.stack";
import AppNavigation from "./AppNavigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

//TODO: When integration use this
const Navigation = () => {
  const isAuthenticated = true;

  return isAuthenticated ? (
    <>
      <StatusBar barStyle="light-content" />
      <BottomSheetModalProvider>
        <AppNavigation />
      </BottomSheetModalProvider>
    </>
  ) : (
    <>
      <StatusBar barStyle="light-content" />
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
