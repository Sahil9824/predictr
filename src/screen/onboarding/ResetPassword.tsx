import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../../component/Button";
import AuthHeader from "../../component/AuthHeader";
import Input, { Iref } from "../../component/Input";
import { Colors, errorMsg, fonts, regex } from "../../constant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { scale } from "../../../helper";
import { SCREENS } from "../../constant/navigation.constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICONS } from "../../constant/icons.constants";
import Icons from "../../component/Icons";

// interface Props {
//   navigation: StackNavigationProp<RootStackParamList, "CreateAccount">;
// }

const ResetPassword = ({ navigation }: any) => {
  const [emailErr, setEmailErr] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef<Iref>(null);

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

  const submit = () => {
    if (!emailValidation()) {
      return;
    }
    navigation.navigate(SCREENS.SET_NEW_PASSWORD);
  };

  useEffect(() => {
    if (emailValidation()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailRef.current?.value]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icons type={ICONS.BACKARR} />
        </TouchableWithoutFeedback>
      </View>
      <Pressable style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.white,
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.title}>{"Reset password"}</Text>
          <Text style={styles.subTitle}>
            {
              "Enter your registered email to receive password reset instructions."
            }
          </Text>
          <View style={styles.inputContainer}>
            <Input
              label={"Email"}
              error={emailErr}
              ref={emailRef}
              autoFocus={true}
              onBlur={emailValidation}
            />
          </View>
          <Button
            text={"Submit"}
            style={styles.button}
            onPress={submit}
            inActive={disabled}
          />
        </KeyboardAwareScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.f800,
    fontSize: scale(32),
    //fontWeight: "800",
    color: Colors.textBlack,
    letterSpacing: scale(32) * -0.02,
  },
  subTitle: {
    marginTop: scale(8),
    fontFamily: fonts.f400,
    //fontWeight: "400",
    fontSize: scale(15),
    color: Colors.textBlack,
  },
  inputContainer: {
    marginVertical: scale(20),
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
});
