import React, { useMemo } from "react";

import Icons from "./Icons";
import { ICONS } from "../constant/icons.constants";
import { APP_NAVIGATION } from "../constant/navigation.constants";
import { TAB_ICON_COLORS } from "../constant";

const TabIcon = ({ focused, route }) => {
  const { name } = route;
  const tabIconColor = useMemo(
    () => (focused ? TAB_ICON_COLORS.ACTIVE : TAB_ICON_COLORS.DEFAULT),
    [focused]
  );

  switch (name) {
    case APP_NAVIGATION.HOME_SCREEN:
      return <Icons type={ICONS.HOME} fill={tabIconColor} />;
    case APP_NAVIGATION.LEADERBOARD:
      return (
        <Icons type={ICONS.LEADERBOARD} fill={tabIconColor} strokeWidth={2} />
      );
    case APP_NAVIGATION.PREDICTION:
      return (
        <Icons type={ICONS.PREDICTION} fill={tabIconColor} strokeWidth={2} />
      );
    case APP_NAVIGATION.PROFILE:
      return <Icons type={ICONS.PROFILE} fill={tabIconColor} strokeWidth={2} />;
    case APP_NAVIGATION.NOTIFICATION:
      return (
        <Icons
          type={ICONS.NOTIFICATION}
          stroke={tabIconColor}
          fill={tabIconColor}
          strokeWidth={2}
        />
      );
    default:
      return null;
  }
};

export default TabIcon;