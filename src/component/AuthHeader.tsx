import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Images } from "../assets/images";
import { Colors, Device } from "../constant";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/MainNavigation";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  rightText?: string;
  onRightPress?: () => void;
}

const AuthHeader = ({ navigation, rightText, onRightPress }: Props) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={Images.back}
            style={{ height: 20, width: 20 }}
            resizeMode="contain"
          />
        </Pressable>
        {rightText && (
          <Pressable onPress={onRightPress}>
            <Text style={styles.text}>{rightText}</Text>
          </Pressable>
        )}
      </>
    </SafeAreaView>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === "ios" ? 50 : 0,
    // height: 50,
    width: Device.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.white,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primaryBlue,
  },
});
