import { StyleSheet, Text, TextProps } from "react-native"
import { fonts } from "../constant";


const Text700 = (props: TextProps) => {
  const { style, children } = props;

  return (
    <Text style={[styles.text, style]} {...props}>{children}</Text>
  )
}

export default Text700;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter_18pt-Bold",//fonts.FontFamily,
    // fontWeight: "800",
  }
})