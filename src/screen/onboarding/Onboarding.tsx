import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback } from "react";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "../../assets/images";
import Text800 from "../../component/Text800";
import { Colors, Device, fonts } from "../../constant";
import { RootStackParamList } from "../../navigation/MainNavigation";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateAccount">;
}

const Onboarding = ({ navigation }: Props) => {
  useFocusEffect(() => {
    changeNavigationBarColor(Colors.primaryBlue, true);

    return () => {
      changeNavigationBarColor("black", true);
    };
  });

  const goToCreateAcc = () => {
    navigation.navigate("CreateAccount");
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.primaryBlue);
      StatusBar.setBarStyle("light-content")
    }, [])
  );
  return (
    <>
      <StatusBar backgroundColor={Colors.primaryBlue} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          <Text800 style={styles.headerText}>{"Predictr"}</Text800>
          <Text800 style={styles.dot}>{"."}</Text800>
        </Text>

        <View style={styles.titleContainer}>
          <Text800 style={styles.titleText}>{"Predict"}</Text800>
          <Text800 style={styles.titleText}>{"The Stock Market"}</Text800>
        </View>

        <View>
          <Text style={styles.subTitle}>
            {"A community for all the day-traders to"}
          </Text>
          <Text style={styles.subTitle}>
            {"predict stocks and measure accuracy over"}
          </Text>
          <Text style={styles.subTitle}>{"the time."}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={Images.trophies}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.subTitle}>
          {"Prizes for top three predictors "}
        </Text>
        <Text style={styles.subTitle}>{"every month."}</Text>

        <View style={styles.signInContainer}>
          <Pressable
            onPress={() => { }}
            style={({ pressed }) => pressed && { opacity: 0.75 }}
          >
            <Image
              source={Images.signinWithGoogle}
              style={styles.googleSignIn}
              resizeMode="stretch"
            />
          </Pressable>
          <Pressable
            onPress={goToCreateAcc}
            style={({ pressed }) => pressed && { opacity: 0.75 }}
          >
            <Image
              source={Images.signinWithEmail}
              style={styles.emailSignIn}
              resizeMode="contain"
            />
          </Pressable>
          <TouchableOpacity onPress={goToLogin} activeOpacity={0.75}>
            <Text style={styles.loginText}>{"Login"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignSelf: "center",
  },
  headerText: {
    fontSize: 22,
    fontFamily: fonts.f800,
    fontWeight: Platform.select({ ios: "800" }),
    color: Colors.white,
  },
  dot: {
    fontSize: 22,
    color: Colors.yellow,
    fontFamily: fonts.f800,
    fontWeight: Platform.select({ ios: "800" }),
  },
  titleContainer: {
    marginTop: 60,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 34,
    fontFamily: fonts.f800,
    lineHeight: 40,
    fontWeight: Platform.select({ ios: "800" }),
    color: Colors.white,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: fonts.f400,
    fontWeight: Platform.select({ ios: "400" }),
    fontSize: 16,
    textAlign: "center",
    color: Colors.lightBlue,
  },
  imageContainer: {
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 100,
  },
  signInContainer: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  signIn: {
    height: 50,
    width: "100%",
  },
  googleSignIn: {
    height: 55,
    width: Device.width - 30,
    marginBottom: 12,
  },
  emailSignIn: {
    height: 65,
    width: Device.width - 30,
  },
  loginText: {
    textAlign: "center",
    fontFamily: fonts.f600,
    fontWeight: Platform.select({ ios: "600" }),
    color: Colors.white,
    fontSize: 16,
    marginTop: 24,
  },
});
