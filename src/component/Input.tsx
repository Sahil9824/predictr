import { Image, Pressable, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { Colors } from "../constant";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Images } from "../assets/images";

interface InputProps extends TextInputProps {
  label?: string;
  style?: ViewStyle;
  value?: string;
  placeholder?: string;
  error?: string;
  password?: boolean;
  extraText?: string;
  rightText?: string;
}

export interface Iref {
  value: string;
  clear: () => void;
  focus: () => void;
}

const Input = forwardRef<Iref, InputProps>((props, ref) => {
  const { label, style, value, placeholder, error, rightText, password = false, onBlur, extraText } = props;

  const [val, setVal] = useState(value || "");
  const [showText, setShowText] = useState(true);
  const [check, setCheck] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (check && onBlur) {
      onBlur();
    }
    if (val != "") {
      setCheck(true)
    }
  }, [val])

  useImperativeHandle(ref, () => {
    return {
      value: val || "",
      clear: () => setVal(""),
      focus: () => textInputRef.current?.focus()
    }
  }, [val])

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, check && error && { borderColor: Colors.errorRed }, check && rightText && { borderColor: Colors.validGreen }]}>
        <TextInput
          ref={textInputRef}
          value={val}
          placeholder={placeholder}
          style={styles.input}
          onChangeText={(text) => setVal(text)}
          secureTextEntry={!showText}
          {...props} />
        {password && <Pressable onPress={() => setShowText(prev => !prev)}>
          <Image source={showText ? Images.eyeClosed : Images.eyeClosed} style={{ height: 16, width: 16 }} />
        </Pressable>}
      </View>
      {extraText && <Text style={{ fontFamily: "Inter", fontWeight: "400", fontSize: 12 }}>{extraText}</Text>}
      {check && error ? <Text style={styles.error}>{error}</Text> : <Text style={styles.right}>{rightText}</Text>}
    </View>
  )
})

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: 14,
    color: Colors.textBlack,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.lightGrey,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  error: {
    color: Colors.errorRed,
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
  },
  right: {
    color: Colors.validGreen,
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
  }
})
