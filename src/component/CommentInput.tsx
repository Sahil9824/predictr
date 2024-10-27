import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View, TextInput, Image, StyleSheet, Platform } from "react-native";
import Icons from "./Icons";
import { Images } from "../assets/images";
import { ICONS } from "../constant/icons.constants";
import { fonts } from "../constant";

const CommentInput = forwardRef(({}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const [height, setHeight] = useState(0);

  const getImgStyles =
    height < 50
      ? { ...styles.imgBox }
      : {
          ...styles.imgBox,
          alignItems: "flex-start",
          height: height,
          justifyContent: "flex-start",
          paddingTop: Platform.OS === "ios" ? 0 : 10,
        };

  const getSendStyles =
    height < 50
      ? { ...styles.rightIcon }
      : {
          ...styles.rightIcon,
          height: height,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingBottom: Platform.OS === "ios" ? 0 : 10,
        };

  return (
    <View style={[styles.container, isFocused && { marginBottom: 0 }]}>
      {/* Left Icon */}
      <View style={getImgStyles}>
        <Image source={Images.avatar1} style={styles.leftIcon} />
      </View>

      {/* Text Input */}
      <TextInput
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeight(height);
          console.log("Component height:", height); // Logs the component's height
        }}
        ref={ref}
        placeholder="Enter comment..."
        style={styles.input}
        placeholderTextColor="#999"
        multiline
        autoFocus={false}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />

      {/* Right Icon */}
      <View style={getSendStyles}>
        <Icons type={ICONS.CMNT_ENTER} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#00000020",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    marginBottom: Platform.OS === "ios" ? 10 : 0,
    // borderBottomWidth: 1,
    // borderBottomColor: "#00000020",
  },

  imgBox: {
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 15,
    fontFamily: fonts.f400,
    //fontWeight: "400",
    color: "#000",
    paddingTop: Platform.OS === "ios" ? 0 : 10,
  },

  rightIcon: {
    width: 20,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommentInput;
