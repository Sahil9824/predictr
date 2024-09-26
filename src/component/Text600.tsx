import { StyleSheet, Text, TextProps } from "react-native"
import { fonts } from "../constant";


const Text600 = (props: TextProps) => {
  const { style, children } = props;

  return (
    <Text style={[styles.text, style]} {...props}>{children}</Text>
  )
}

export default Text600;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter_18pt-SemiBold",//fonts.FontFamily,
    // fontWeight: "800",
  }
})