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
import { RootStackParamList } from "../../navigation/MainNavigation";
import { scale } from "../../../helper";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateAccount">;
}

const CreateAccount = ({ navigation }: Props) => {
  const [cnfValidText, setCnfValidText] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [cnfPasswordErr, setcnfPasswordErr] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef<Iref>(null);
  const passwordRef = useRef<Iref>(null);
  const confirmPasswordRef = useRef<Iref>(null);

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
    navigation.navigate("SelectAvatar");
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
            navigation.navigate("Login");
          }}
        />
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor(Colors.white);
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
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
    </>
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
  },
  inputContainer: {
    marginVertical: scale(22),
  },
  button: {
    marginTop: "auto",
    marginBottom: scale(40),
  },
});
