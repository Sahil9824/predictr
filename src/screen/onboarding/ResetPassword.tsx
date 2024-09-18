import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthHeader from "../../component/AuthHeader";
import { Colors } from "../../constant";
import Input, { Iref } from "../../component/Input";
import Button from "../../component/ Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/MainNavigation";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateAccount">
}

const ResetPassword = ({ navigation }: Props) => {

  const [emailErr, setEmailErr] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef<Iref>(null);

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

  const submit = () => {
    if (!emailValidation()) {
      return;
    }
    navigation.navigate("SetNewPassword");
  }

  useEffect(() => {
    if (emailValidation()) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [emailRef.current?.value])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <AuthHeader navigation={navigation} />
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Reset password"}</Text>
      <Text style={styles.subTitle}>{"Enter your registered email to receive password reset instructions."}</Text>
      <View style={styles.inputContainer} >
        <Input
          label={"Email"}
          error={emailErr}
          ref={emailRef}
          autoFocus={true}
          onBlur={emailValidation}
        />
      </View>
      <Button text={"Submit"} style={styles.button} onPress={submit} inActive={disabled} />
    </View >
  )
}

export default ResetPassword;

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
  subTitle: {
    marginTop: 10,
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 15,
    color: Colors.textBlack
  },
  inputContainer: {
    marginVertical: 20,
  },
  button: {
    bottom: 30,
    position: "absolute",
    left: 20
  }
})