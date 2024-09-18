import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import AuthHeader from "../../component/AuthHeader";
import { Colors } from "../../constant";
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
      setEmailErr("Please enter your email");
      return false;
    } else if (!/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/.test(emailRef.current?.value)) {
      setEmailErr("Please enter valid email");
      return false;
    }
    setEmailErr("")
    return true;
  }

  const passwordValidation = () => {
    if (!passwordRef.current?.value) {
      setPasswordErr("Please enter your password");
      return false;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{12,99}$/.test(passwordRef.current?.value)) {
      setPasswordErr("The password must be strong and 12 characters long")
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
    fontFamily: "Inter",
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
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
    color: Colors.primaryBlue,
    textAlign: "right"
  }
})