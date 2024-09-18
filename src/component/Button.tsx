import { Pressable, PressableProps, StyleSheet, Text, TextStyle, ViewStyle } from "react-native"
import { Colors } from "../constant";

interface Props {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  inActive?: boolean;
}

const Button: React.FC<Props> = ({ text, style, textStyle, onPress, inActive }) => {

  const onButtonPress = () => {
    if (!inActive) {
      onPress()
    }
  }

  return (
    <Pressable style={({ pressed }) => [styles.container, style, inActive && { backgroundColor: Colors.disableGrey }, pressed && { opacity: 0.75 }]} onPress={onButtonPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  )
}

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
    color: Colors.white,
  }
})