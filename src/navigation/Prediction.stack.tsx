import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashBoard from "../screen/home/DashBoard";
import { APP_NAVIGATION, SCREENS } from "../constant/navigation.constants";
import Prediction from "../screen/Prediction/Prediction";
import { Animated, Platform } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const PredictionStack = ({ navigation, route }) => {
  //TODO: Animation not working here!

  // const tabBarOpacity = React.useRef(new Animated.Value(1)).current;
  // const tabBarTranslateY = React.useRef(new Animated.Value(0)).current;

  // const tabBarHeight = React.useRef(
  //   new Animated.Value(Platform.OS === "ios" ? 80 : 65)
  // ).current;
  // const tabBarPaddingBottom = React.useRef(
  //   new Animated.Value(Platform.OS === "ios" ? 30 : 10)
  // ).current;

  // React.useEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route);

  //   if (
  //     routeName === SCREENS.SEARCH ||
  //     routeName === SCREENS.POST ||
  //     routeName === SCREENS.SELECT_AVATAR ||
  //     routeName === SCREENS.PREDICTION
  //   ) {
  //     // Hide tab bar with animation
  //     Animated.parallel([
  //       Animated.timing(tabBarOpacity, {
  //         toValue: 0,
  //         duration: 300,
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(tabBarTranslateY, {
  //         toValue: 100, // Slide it out of view
  //         duration: 300,
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(tabBarHeight, {
  //         toValue: 0, // Reset height to 0 when hidden
  //         duration: 300,
  //         useNativeDriver: false, // Height needs to be animated without native driver
  //       }),
  //       Animated.timing(tabBarPaddingBottom, {
  //         toValue: 0, // Reset padding to 0 when hidden
  //         duration: 300,
  //         useNativeDriver: false, // Padding needs to be animated without native driver
  //       }),
  //     ]).start();
  //   } else {
  //     // Show tab bar with animation
  //     Animated.parallel([
  //       Animated.timing(tabBarOpacity, {
  //         toValue: 1,
  //         duration: 300,
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(tabBarTranslateY, {
  //         toValue: 0, // Bring it back into view
  //         duration: 300,
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(tabBarHeight, {
  //         toValue: Platform.OS === "ios" ? 80 : 65, // Reset to original height
  //         duration: 300,
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(tabBarPaddingBottom, {
  //         toValue: Platform.OS === "ios" ? 30 : 10, // Reset to original padding
  //         duration: 300,
  //         useNativeDriver: false,
  //       }),
  //     ]).start();
  //   }

  //   navigation.setOptions({
  //     tabBarStyle: {
  //       opacity: tabBarOpacity, // Controlled opacity
  //       transform: [{ translateY: tabBarTranslateY }], // Controlled slide
  //       height: tabBarHeight, // Dynamic height
  //       paddingBottom: tabBarPaddingBottom, // Dynamic padding
  //       paddingTop: 7,
  //       backgroundColor: "#fefefe",
  //       justifyContent: "space-between",
  //     },
  //   });
  // }, [
  //   navigation,
  //   route,
  //   tabBarOpacity,
  //   tabBarTranslateY,
  //   tabBarHeight,
  //   tabBarPaddingBottom,
  // ]);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        animationDuration: 300,
      }}
    >
      <Stack.Screen
        name={SCREENS.PREDICTION}
        component={Prediction}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PredictionStack;
