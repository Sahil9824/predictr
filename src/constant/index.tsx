import { Dimensions, Platform } from "react-native"

export const Colors = {
  primaryBlue: "#024BAC",
  white: "#FFFFFF",
  yellow: "#FFC803",
  lightBlue: "#9ABFEF",
  textBlack: "#151B26",
  lightGrey: "#E7E7E7",
  errorRed: "#DC0000",
  disableGrey: "#B8B8B8",
  validGreen: "#1B9D1B",
}

export const fonts = {
  FontFamily: Platform.OS === "ios" ? "system" : "Inter",
}

export const regex = {
  email: /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,99}$/,
}

export const Device = {
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height
}

export const errorMsg = {
  password: "Password must be 8+ characters, alphanumeric with 1 sepcial character.",
  email: "Please enter a valid email",
  cnfPassword: "Password doesn't match",
  passwordMatch: "Password matched",
  passwordEmpty: "Please enter your password",
  emailEmpty: "Please enter your email"
}