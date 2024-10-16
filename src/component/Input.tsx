import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors, fonts } from "../constant";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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
  const {
    label,
    style,
    value,
    placeholder,
    error,
    rightText,
    password = false,
    onBlur,
    extraText,
  } = props;

  const [val, setVal] = useState(value || "");
  const [showText, setShowText] = useState(password ? false : true);
  const [check, setCheck] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  // const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (check && onBlur) {
      onBlur();
    }
    if (val != "") {
      setCheck(true);
    }
  }, [val]);

  useImperativeHandle(
    ref,
    () => {
      return {
        value: val || "",
        clear: () => setVal(""),
        focus: () => textInputRef.current?.focus(),
      };
    },
    [val]
  );

  return (
    <View style={{ ...styles.container, ...style }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          check && error && { borderColor: Colors.errorRed },
          check && rightText && { borderColor: Colors.validGreen },
        ]}
      >
        <TextInput
          ref={textInputRef}
          value={val}
          placeholder={placeholder}
          style={styles.input}
          onChangeText={(text) => setVal(text)}
          secureTextEntry={!showText}
          // onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
          {...props}
        />
        {password && (
          <Pressable
            onPress={() => setShowText((prev) => !prev)}
            style={styles.iconPress}
          >
            <Image
              source={!showText ? Images.eyeClosed : Images.eyeOpen}
              style={styles.icon}
            />
          </Pressable>
        )}
      </View>
      {extraText && <Text style={styles.extraText}>{extraText}</Text>}
      {check && error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        rightText && <Text style={styles.right}>{rightText}</Text>
      )}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontFamily: fonts.f600,
    fontSize: 14,
    color: Colors.labelBlack,
    marginBottom: 4,
    fontWeight: "600",
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
    paddingVertical: Platform.OS === "ios" ? 15 : 10,
  },
  error: {
    marginTop: 5,
    color: Colors.errorRed,
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: 12,
  },
  right: {
    color: Colors.validGreen,
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: 12,
  },
  iconPress: {
    height: 40,
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  extraText: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: 12,
    marginVertical: 4,
  },
  icon: {
    height: 16,
    width: 16,
  },
});
