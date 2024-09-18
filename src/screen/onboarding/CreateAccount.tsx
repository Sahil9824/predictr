import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Keyboard, StatusBar, StyleSheet, Text, View } from "react-native";
import Button from "../../component/ Button";
import AuthHeader from "../../component/AuthHeader";
import Input, { Iref } from "../../component/Input";
import { Colors } from "../../constant";
import { RootStackParamList } from "../../navigation/MainNavigation";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateAccount">
}

const CreateAccount = ({ navigation }: Props) => {
  const [cnfValidText, setCnfValidText] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [cnfPasswordErr, setcnfPasswordErr] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [keyboard, setKeyboard] = useState(false)

  const emailRef = useRef<Iref>(null);
  const passwordRef = useRef<Iref>(null);
  const confirmPasswordRef = useRef<Iref>(null);

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

  const cnfPasswordValidation = () => {
    if (confirmPasswordRef.current?.value != passwordRef.current?.value) {
      setcnfPasswordErr("Password doesn't match");
      setCnfValidText("")
      return false;
    }
    setcnfPasswordErr("");
    setCnfValidText("Password matched")
    return true;
  }

  const submit = () => {
    if (!emailValidation() || !passwordValidation() || !cnfPasswordValidation()) {
      return;
    }
    navigation.navigate("SelectAvatar")
  }

  useEffect(() => {
    function onKeyboardDidShow() {
      setKeyboard(true)
    }

    function onKeyboardDidHide() {
      setKeyboard(false);
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (emailValidation() && passwordValidation() && cnfPasswordValidation()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailRef.current?.value, passwordRef.current?.value, confirmPasswordRef.current?.value])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <AuthHeader navigation={navigation} rightText={"Login"} onRightPress={() => navigation.navigate("Login")} />
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
      <Text style={styles.title}>{"Create Account"}</Text>
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
      <Button text={"Next"} style={{ ...styles.button, bottom: keyboard ? 0 : 30 }} onPress={submit} inActive={disabled} />
    </View >
  )
}

export default CreateAccount;

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
    left: 20,
  }
})