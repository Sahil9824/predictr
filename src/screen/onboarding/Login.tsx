import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import Button from "../../component/ Button";
import AuthHeader from "../../component/AuthHeader";
import Input, { Iref } from "../../component/Input";
import { Colors, errorMsg, fonts, regex } from "../../constant";
import { RootStackParamList } from "../../navigation/MainNavigation";
// import { success } from "../../utils/toast";
import { useToast } from "react-native-toast-notifications";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateAccount">;
}

const Login = ({ navigation }: Props) => {
  const toast = useToast();

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef<Iref>(null);
  const passwordRef = useRef<Iref>(null);

  const emailValidation = () => {
    if (!emailRef.current?.value) {
      setEmailErr(errorMsg.emailEmpty);
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
      setPasswordErr(errorMsg.passwordEmpty);
      return false;
    } else if (!regex.password.test(passwordRef.current?.value)) {
      setPasswordErr(errorMsg.password);
      return false;
    }
    setPasswordErr("");
    return true;
  };

  useEffect(() => {
    if (emailValidation() && passwordValidation()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [passwordRef.current?.value, emailRef.current?.value]);

  const submit = () => {
    if (!emailValidation() || !passwordValidation()) {
      return;
    }
    // TODO:toast setup
    // toast.show("fsdfsfsd", {
    //   placement: 'top',
    //   icon: <Image source={Images.avatar1} style={{ width: 10, height: 10 }} />
    // });
    console.log("called");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AuthHeader
          navigation={navigation}
          rightText={"Create Account"}
          onRightPress={() => navigation.navigate("CreateAccount")}
        />
      ),
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <Text style={styles.title}>{"Login"}</Text>
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
          onBlur={passwordValidation}
          password
        />
        <Text
          style={styles.resetPassword}
          onPress={() => navigation.navigate("ResetPassword")}
        >
          {"Reset Password"}
        </Text>
      </View>
      <Button
        text={"Login"}
        style={styles.button}
        onPress={submit}
        inActive={disabled}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.f800,
    fontSize: 32,
    fontWeight: Platform.select({ ios: "400" }),
    color: Colors.textBlack,
  },
  inputContainer: {
    marginVertical: 30,
  },
  button: {
    bottom: 30,
    position: "absolute",
    left: 20,
  },
  resetPassword: {
    fontFamily: fonts.f600,
    fontWeight: Platform.select({ ios: "600" }),
    fontSize: 14,
    color: Colors.primaryBlue,
    textAlign: "right",
  },
});
