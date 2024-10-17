import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Button from "../../component/Button";
import { SCREENS } from "../../constant/navigation.constants";
import { errorMsg, fonts, regex } from "../../constant";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import Input from "../../component/Input";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = ({ navigation }) => {
  const [cnfValidText, setCnfValidText] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [cnfPasswordErr, setcnfPasswordErr] = useState("");

  const [disabled, setDisabled] = useState(true);

  const passwordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    if (
      passwordValidation() &&
      cnfPasswordValidation() &&
      newPasswordValidation()
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [passwordRef.current?.value, confirmPasswordRef.current?.value]);

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

  const newPasswordValidation = () => {
    if (!newPasswordRef.current?.value) {
      setNewPasswordErr("");
      return false;
    } else if (!regex.password.test(newPasswordRef.current?.value)) {
      setNewPasswordErr(errorMsg.password);
      return false;
    }
    setNewPasswordErr("");
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
    newPasswordValidation();
    cnfPasswordValidation();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(SCREENS.MENU)}
          >
            <Icons type={ICONS.BACKARR} />
          </TouchableWithoutFeedback>
          <Text style={styles.menuText}>Change Password</Text>
        </View>

        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.containerBox}>
            <Icons type={ICONS.CHANGE_PASS} />
            <View style={{ marginTop: 50, width: "100%" }}>
              <Input
                label="Current password"
                password={true}
                error={passwordErr}
                ref={passwordRef}
                onSubmitEditing={() => passwordRef?.current?.focus()}
                blurOnSubmit={false}
                onBlur={passwordOnBlur}
              />
              <Input
                label="New password"
                password={true}
                error={newPasswordErr}
                ref={newPasswordRef}
                onSubmitEditing={() => newPasswordRef?.current?.focus()}
                blurOnSubmit={false}
                onBlur={passwordOnBlur}
              />
              <Input
                label="Re-enter new password"
                password={true}
                error={cnfPasswordErr}
                ref={confirmPasswordRef}
                onBlur={passwordOnBlur}
                rightText={cnfValidText}
              />
            </View>
            <Button
              onPress={() => {
                navigation.navigate(SCREENS.MENU);
              }}
              style={{ marginTop: "auto" }}
              text="Save Changes"
              inActive={disabled}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  containerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#00000020",
  },
  menuText: {
    fontFamily: fonts.f600,
    fontWeight: "600",
    fontSize: 16,
    color: "#101010",
    marginLeft: 16,
  },
});

export default ChangePassword;
