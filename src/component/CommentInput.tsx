import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import Icons from "./Icons";
import { Images } from "../assets/images";
import { ICONS } from "../constant/icons.constants";

const CommentInput = ({}) => {
  return (
    <View style={styles.container}>
      {/* Left Icon */}
      <Image source={Images.avatar1} style={styles.leftIcon} />

      {/* Text Input */}
      <TextInput
        placeholder="Enter comment..."
        style={styles.input}
        placeholderTextColor="#999"
        multiline
      />

      {/* Right Icon */}
      <View style={styles.rightIcon}>
        <Icons type={ICONS.CMNT_ENTER} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#00000020",
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginTop: "auto",
  },

  leftIcon: {
    width: 32, // Adjust according to your image size
    height: 32, // Adjust according to your image size
    marginRight: 10,
    borderRadius: 4,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  rightIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
});

export default CommentInput;
