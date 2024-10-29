import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Colors, fonts } from "../constant";

interface Props {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  inActive?: boolean;
  inActiveColor?: string;
}

const Button: React.FC<Props> = ({
  text,
  style,
  textStyle,
  onPress,
  inActive,
  inActiveColor,
}) => {
  const onButtonPress = () => {
    if (!inActive) {
      onPress();
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        inActive && {
          backgroundColor: !inActiveColor ? Colors.disableGrey : inActiveColor,
        },
        pressed && { opacity: 0.75 },
      ]}
      onPress={onButtonPress}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.primaryBlue,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
  text: {
    fontFamily: fonts.f600,
    color: Colors.white,
    fontSize: 16,
  },
});
