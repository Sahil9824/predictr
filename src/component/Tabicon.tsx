import React, { useMemo } from "react";

import Icons from "./Icons";
import { ICONS } from "../constant/icons.constants";
import { APP_NAVIGATION, SCREENS } from "../constant/navigation.constants";
import { TAB_ICON_COLORS } from "../constant";
import { Image } from "react-native";
import { Images } from "../assets/images";

const TabIcon = ({ focused, route }) => {
  const { name } = route;
  const tabIconColor = useMemo(
    () => (focused ? TAB_ICON_COLORS.ACTIVE : TAB_ICON_COLORS.DEFAULT),
    [focused]
  );

  switch (name) {
    case APP_NAVIGATION.HOME_SCREEN:
      return (
        <Image
          source={focused ? Images.HomeIcon : Images.HomeIconInac}
          style={{ height: 24, width: 24 }}
        />
      );
    case APP_NAVIGATION.LEADERBOARD:
      return (
        <Image
          source={focused ? Images.Lead : Images.LeadInac}
          style={{ height: 24, width: 24 }}
        />
      );
    case APP_NAVIGATION.PREDICTION:
      return (
        <Image
          source={focused ? Images.Predict : Images.PredictInac}
          style={{ height: 24, width: 24 }}
        />
      );
    case APP_NAVIGATION.PROFILE:
      return (
        <Image
          source={focused ? Images.Profile : Images.ProfileInac}
          style={{ height: 24, width: 24 }}
        />
      );
    case APP_NAVIGATION.NOTIFICATION:
      return (
        <Image
          source={focused ? Images.Notification : Images.NotificationInac}
          style={{ height: 24, width: 24 }}
        />
      );
    default:
      return null;
  }
};

export default TabIcon;
