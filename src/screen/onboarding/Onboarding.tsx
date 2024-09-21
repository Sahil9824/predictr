import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Device, fonts } from "../../constant";
import { Images } from "../../assets/images";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/MainNavigation";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";

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
    // navigation.navigate("Login");
  };
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.primaryBlue);
    }, [])
  );
  return (
    <>
      <StatusBar backgroundColor={Colors.primaryBlue} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          <Text style={styles.headerText}>{"Predictr"}</Text>
          <Text style={styles.dot}>{"."}</Text>
        </Text>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{"Predict"}</Text>
          <Text style={styles.titleText}>{"The Stock Market"}</Text>
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
      </SafeAreaView>
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
    fontFamily: fonts.FontFamily,
    fontWeight: "800",
    color: Colors.white,
  },
  dot: {
    fontSize: 22,
    color: Colors.yellow,
    fontFamily: fonts.FontFamily,
    fontWeight: "800",
  },
  titleContainer: {
    marginTop: 60,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 34,
    fontFamily: fonts.FontFamily,
    fontWeight: "800",
    color: Colors.white,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: fonts.FontFamily,
    fontWeight: "400",
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
    marginTop: "auto",
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
    fontFamily: fonts.FontFamily,
    fontWeight: "600",
    color: Colors.white,
    fontSize: 16,
    marginTop: 24,
  },
});
