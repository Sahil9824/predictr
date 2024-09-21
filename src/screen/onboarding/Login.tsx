import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import AuthHeader from "../../component/AuthHeader";
import { Colors, errorMsg, fonts, regex } from "../../constant";
import Input, { Iref } from "../../component/Input";
import Button from "../../component/ Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/MainNavigation";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateAccount">
}

const Login = ({ navigation }: Props) => {

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
    setEmailErr("")
    return true;
  }

  const passwordValidation = () => {
    if (!passwordRef.current?.value) {
      setPasswordErr(errorMsg.passwordEmpty);
      return false;
    } else if (!regex.password.test(passwordRef.current?.value)) {
      setPasswordErr(errorMsg.password)
      return false;
    }
    setPasswordErr("");
    return true;
  }

  useEffect(() => {
    if (emailValidation() && passwordValidation()) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [passwordRef.current?.value, emailRef.current?.value])

  const submit = () => {
    if (!emailValidation() || !passwordValidation()) {
      return;
    }
    console.log("called");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <AuthHeader navigation={navigation} rightText={"Create Account"} onRightPress={() => navigation.navigate("CreateAccount")} />
    })
  }, [])

  useEffect(() => { }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <Text style={styles.title}>{"Login"}</Text>
      <View style={styles.inputContainer} >
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
        <Text style={styles.resetPassword} onPress={() => navigation.navigate("ResetPassword")}>{"Reset Password"}</Text>
      </View>
      <Button text={"Login"} style={styles.button} onPress={submit} inActive={disabled} />
    </View >
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.FontFamily,
    fontSize: 32,
    fontWeight: "800",
    color: Colors.textBlack
  },
  inputContainer: {
    marginVertical: 30,
  },
  button: {
    bottom: 30,
    position: "absolute",
    left: 20
  },
  resetPassword: {
    fontFamily: fonts.FontFamily,
    fontWeight: "600",
    fontSize: 14,
    color: Colors.primaryBlue,
    textAlign: "right"
  }
})