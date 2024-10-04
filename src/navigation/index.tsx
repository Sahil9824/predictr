import React, { useContext } from "react";
import { StatusBar } from "react-native";

import PreloginStack from "./Prelogin.stack";
import AppNavigation from "./AppNavigation";

//TODO: When integration use this
const Navigation = () => {
  const isAuthenticated = true;

  return isAuthenticated ? (
    <>
      <StatusBar barStyle="light-content" />
      <AppNavigation />
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
