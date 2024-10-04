import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../../component/Button";
import AuthHeader from "../../component/AuthHeader";
import Input, { Iref } from "../../component/Input";
import { Colors, errorMsg, fonts, regex } from "../../constant";
import { RootStackParamList } from "../../navigation/MainNavigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { Images } from "../../assets/images";
import { scale } from "../../../helper";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateAccount">;
}

const SetNewPassword = ({ navigation }: Props) => {
  const toast = useToast();

  const [cnfValidText, setCnfValidText] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [cnfPasswordErr, setcnfPasswordErr] = useState("");
  const [disabled, setDisabled] = useState(false);

  const passwordRef = useRef<Iref>(null);
  const confirmPasswordRef = useRef<Iref>(null);

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

  const cnfPasswordValidation = () => {
    if (confirmPasswordRef.current?.value != passwordRef.current?.value) {
      setcnfPasswordErr("Password do not match");
      setCnfValidText("");
      return false;
    }
    setcnfPasswordErr("");
    setCnfValidText(errorMsg.passwordMatch);
    return true;
  };

  useEffect(() => {
    if (passwordValidation() && cnfPasswordValidation()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [passwordRef.current?.value, confirmPasswordRef.current?.value]);

  const submit = () => {
    if (!passwordValidation() || !cnfPasswordValidation()) {
      return;
    }
    // TODO:toast setup
    toast.show("Password updated");
    // toast.show("Password updated");
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <AuthHeader navigation={navigation} />,
    });
  }, []);

  return (
    <Pressable style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{"Set new password"}</Text>
        <Text style={styles.subTitle}>
          {
            "To secure your account, choose a strong password of 8 characters at least."
          }
        </Text>
        <View style={styles.inputContainer}>
          <Input
            label={"New Password"}
            error={passwordErr}
            ref={passwordRef}
            autoFocus={true}
            onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
            blurOnSubmit={false}
            onBlur={passwordValidation}
            password
          />
          <Input
            label={"Re-enter New Password"}
            error={cnfPasswordErr}
            ref={confirmPasswordRef}
            onBlur={cnfPasswordValidation}
            rightText={cnfValidText}
            password
          />
        </View>
        <Button
          text={"Reset Password"}
          style={styles.button}
          onPress={submit}
          inActive={disabled}
        />
      </KeyboardAwareScrollView>
    </Pressable>
  );
};

export default SetNewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scale(20),
  },
  title: {
    fontFamily: fonts.f800,
    fontSize: scale(32),
    // fontWeight: "800",
    color: Colors.textBlack,
  },
  subTitle: {
    marginTop: 8,
    fontFamily: fonts.f400,
    // fontWeight: "400",
    fontSize: scale(16),
    color: Colors.textBlack,
  },
  inputContainer: {
    marginVertical: scale(20),
  },
  button: {
    // bottom: 30,
    // position: "absolute",
    // left: 20
    marginTop: "auto",
    marginBottom: scale(20),
  },
});
