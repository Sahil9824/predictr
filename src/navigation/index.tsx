import React, { useContext } from "react";
import { StatusBar } from "react-native";

import PreloginStack from "./Prelogin.stack";
import AppNavigation from "./AppNavigation";
<<<<<<< Updated upstream
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
=======
import userStore from "../user.store";
>>>>>>> Stashed changes

//TODO: When integration use this
const Navigation = () => {
  const { isAuthenticated } = userStore();

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
