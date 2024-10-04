// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Onboarding from "../screen/onboarding/Onboarding";
// import CreateAccount from "../screen/onboarding/CreateAccount";
// import Login from "../screen/onboarding/Login";
// import ResetPassword from "../screen/onboarding/ResetPassword";
// import SetNewPassword from "../screen/onboarding/SetNewPassword";
// import SelectAvatar from "../screen/onboarding/SelectAvatar";
// import FeedSetup from "../screen/onboarding/FeedSetup";
// import { ImageProps } from "react-native";
// import DashBoard from "../screen/home/DashBoard";

// export type RootStackParamList = {
//   Onboarding: undefined;
//   CreateAccount: undefined;
//   Login: undefined;
//   ResetPassword: undefined;
//   SetNewPassword: undefined;
//   SelectAvatar: undefined;
//   FeedSetup: { username?: string; profileImage: ImageProps };
//   Dashboard: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const MainNavigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           animation: "slide_from_right",
//           animationDuration: 300,
//         }}
//       >
//         <Stack.Screen
//           name="Onboarding"
//           component={Onboarding}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="CreateAccount" component={CreateAccount} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="ResetPassword" component={ResetPassword} />
//         <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
//         <Stack.Screen
//           name="SelectAvatar"
//           component={SelectAvatar}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="FeedSetup"
//           component={FeedSetup}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Dashboard"
//           component={DashBoard}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default MainNavigation;
