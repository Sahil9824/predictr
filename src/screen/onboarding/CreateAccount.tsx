import { StackNavigationProp } from "@react-navigation/stack";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../../component/ Button";
import AuthHeader from "../../component/AuthHeader";
import Input, { Iref } from "../../component/Input";
import { Colors, Device } from "../../constant";
import { RootStackParamList } from "../../navigation/MainNavigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateAccount">;
}

const CreateAccount = ({ navigation }: Props) => {
  const [cnfValidText, setCnfValidText] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [cnfPasswordErr, setcnfPasswordErr] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isKeyboardPresent, setIsKeyboardPresent] = useState(false);

  const emailRef = useRef<Iref>(null);
  const passwordRef = useRef<Iref>(null);
  const confirmPasswordRef = useRef<Iref>(null);

  const emailValidation = () => {
    if (!emailRef.current?.value) {
      setEmailErr("");

      return false;
    } else if (
      !/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/.test(
        emailRef.current?.value
      )
    ) {
      setEmailErr("Please enter a valid Email");
      return false;
    }
    setEmailErr("");
    return true;
  };

  const passwordValidation = () => {
    if (!passwordRef.current?.value) {
      setPasswordErr("");
      return false;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,99}$/.test(
        passwordRef.current?.value
      )
    ) {
      setPasswordErr(
        "Password must be at least 8 characters long and include at least one special character."
      );
      return false;
    }
    setPasswordErr("");
    return true;
  };

  const cnfPasswordValidation = () => {
    if (!confirmPasswordRef.current?.value) {
      setcnfPasswordErr("");
      setCnfValidText("");

      return;
    }
    if (confirmPasswordRef.current?.value != passwordRef.current?.value) {
      setcnfPasswordErr("Password doesn't match");
      setCnfValidText("");
      return false;
    }
    setcnfPasswordErr("");
    setCnfValidText("Password matched");
    return true;
  };

  const submit = () => {
    if (
      !emailValidation() ||
      !passwordValidation() ||
      !cnfPasswordValidation()
    ) {
      return;
    }
    // navigation.navigate("SelectAvatar")
  };

  useEffect(() => {
    if (emailValidation() && passwordValidation() && cnfPasswordValidation()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    emailRef.current?.value,
    passwordRef.current?.value,
    confirmPasswordRef.current?.value,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AuthHeader
          navigation={navigation}
          rightText={"Login"}
          onRightPress={() => {
            // navigation.navigate("Login")
          }}
        />
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor(Colors.white);
      // StatusBar.setTranslucent(true);
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : undefined}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={[styles.container]}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>{"Create Account"}</Text>
            <View style={styles.inputContainer}>
              <Input
                label={"Email"}
                error={emailErr}
                ref={emailRef}
                autoFocus={true}
                onSubmitEditing={() => passwordRef?.current?.focus()}
                blurOnSubmit={false}
                onBlur={emailValidation}
              />
              <Input
                label={"Password"}
                error={passwordErr}
                ref={passwordRef}
                onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
                blurOnSubmit={false}
                onBlur={passwordValidation}
                password
              />
              <Input
                label={"Confirm Password"}
                error={cnfPasswordErr}
                ref={confirmPasswordRef}
                onBlur={cnfPasswordValidation}
                rightText={cnfValidText}
                password
              />
            </View>
            <Button
              text={"Next"}
              style={styles.button}
              onPress={submit}
              inActive={disabled}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: "800",
    color: Colors.textBlack,
  },
  inputContainer: {
    marginVertical: 32,
  },
  button: {
    marginTop: "auto",
    marginBottom: 55,
  },
});
