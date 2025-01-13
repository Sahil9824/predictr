import { useFocusEffect } from "@react-navigation/native";
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
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../component/Button";
import AuthHeader from "../../component/AuthHeader";
import Input, { Iref } from "../../component/Input";
import { Colors, errorMsg, fonts, regex } from "../../constant";
import { scale } from "../../../helper";
import { SCREENS } from "../../constant/navigation.constants";
import userStore from "../../user.store";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";

// interface Props {
//   navigation: StackNavigationProp<RootStackParamList, "CreateAccount">;
// }

const CreateAccount = ({ navigation }: any) => {
  const [cnfValidText, setCnfValidText] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [cnfPasswordErr, setcnfPasswordErr] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef<Iref>(null);
  const passwordRef = useRef<Iref>(null);
  const confirmPasswordRef = useRef<Iref>(null);

  const { setIsAuthenticated } = userStore();

  const emailValidation = () => {
    if (!emailRef.current?.value) {
      setEmailErr("");
      return false;
    } else if (!regex.email.test(emailRef.current?.value)) {
      setEmailErr(errorMsg.email);
      return false;
    }
    setEmailErr("");
    return true;
  };

  const passwordValidation = () => {
    if (!passwordRef.current?.value) {
      setPasswordErr("");
      return false;
    } else if (!regex.password.test(passwordRef.current?.value)) {
      setPasswordErr(errorMsg.password);
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
    if (confirmPasswordRef.current?.value === passwordRef.current?.value) {
      setcnfPasswordErr("");
      setCnfValidText(errorMsg.passwordMatch);
      return true;
    }
    setcnfPasswordErr(errorMsg.cnfPassword);
    setCnfValidText("");
    return false;
  };

  const passwordOnBlur = () => {
    passwordValidation();
    cnfPasswordValidation();
  };

  const submit = () => {
    if (
      !emailValidation() ||
      !passwordValidation() ||
      !cnfPasswordValidation()
    ) {
      return;
    }
    setIsAuthenticated(true);
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

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor(Colors.white);
    }, [])
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icons type={ICONS.BACKARR} />
        </TouchableWithoutFeedback>
        <Pressable onPress={() => navigation.navigate(SCREENS.LOGIN)}>
          <Text style={styles.menuText}>Login</Text>
        </Pressable>
      </View>

      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
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
              onBlur={passwordOnBlur}
              password
            />
            <Input
              label={"Confirm Password"}
              error={cnfPasswordErr}
              ref={confirmPasswordRef}
              onBlur={passwordOnBlur}
              rightText={cnfValidText}
              password
            />
          </View>
          <Button
            text={"Create Account"}
            style={styles.button}
            onPress={submit}
            inActive={disabled}
          />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: scale(20),
    flexGrow: 1,
  },
  title: {
    fontFamily: fonts.f800,
    fontSize: scale(32),
    color: Colors.textBlack,
    //fontWeight: "800",
    letterSpacing: scale(32) * -0.02,
  },
  inputContainer: {
    marginVertical: scale(22),
  },
  button: {
    marginTop: "auto",
    marginBottom: scale(40),
  },
  header: {
    flexDirection: "row",
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  menuText: {
    fontFamily: fonts.f600,
    fontSize: 15,
    //fontWeight: "600",
    color: Colors.primaryBlue,
  },
});
