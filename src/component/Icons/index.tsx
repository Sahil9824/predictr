import React, { memo, FC, useEffect, useRef } from "react";
import { TouchableOpacity, Animated, Easing } from "react-native";
import { ICON_NAME_VS_CMP } from "./constants";

interface IconProps {
  type: any;
  onClick?: any;
  isselected?: boolean;
  isdeleteicon?: boolean;
  dontShowTouch?: boolean;
  isCursorPointer?: boolean;
  isDisabled?: boolean;
  iconContainerStyle?: any;
  isAnimated?: boolean;
}

const Icon: FC<IconProps> = ({
  type,
  onClick,
  isselected,
  isdeleteicon,
  dontShowTouch,
  isCursorPointer,
  iconContainerStyle,
  isDisabled,
  isAnimated,
  ...rest
}) => {
  const RenderIcon = ICON_NAME_VS_CMP[type];
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAnimated) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1250,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotation.stopAnimation();
    }
  }, [isAnimated, rotation]);

  if (!RenderIcon) {
    return null;
  }

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={dontShowTouch ? 1 : 0.8}
      disabled={isDisabled}
      style={[{ pointerEvents: "auto" }, iconContainerStyle]}
    >
      <Animated.View
        style={isAnimated ? { transform: [{ rotate: spin }] } : {}}
      >
        <RenderIcon
          isselected={isselected}
          isdeleteicon={isdeleteicon}
          {...rest}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(Icon);
