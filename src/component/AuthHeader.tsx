import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Images } from "../assets/images";
import { Colors, Device } from "../constant";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/MainNavigation";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  rightText?: string;
  onRightPress?: () => void
}

const AuthHeader = ({ navigation, rightText, onRightPress }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={Images.back} style={{ height: 20, width: 20 }} resizeMode="contain" />
      </Pressable>
      {rightText && <Pressable onPress={onRightPress}>
        <Text style={styles.text}>
          {rightText}
        </Text>
      </Pressable>}
    </View>
  )
}

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: Device.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primaryBlue,
  }
})