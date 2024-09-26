import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useRef, useState } from "react";
import { FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Images } from "../../assets/images";
import Button from "../../component/ Button";
import ImagePicker from "../../component/ImagePicker";
import Input, { Iref } from "../../component/Input";
import { Colors, fonts } from "../../constant";
import { RootStackParamList } from "../../navigation/MainNavigation";

const Avatars = [
  { image: Images.avatar1 },
  { image: Images.avatar2 },
  { image: Images.avatar3 },
  { image: Images.avatar4 },
  { image: Images.avatar1 },
  { image: Images.avatar2 },
  { image: Images.avatar3 },
  { image: Images.avatar4 },
];

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "SelectAvatar">

}

const SelectAvatar: React.FC<Props> = ({ navigation }) => {
  const [validNameText, setValidNameText] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [image, setImage] = useState(Images.avatarPlaceholder);
  const [showModal, setShowModal] = useState(false);

  const emailRef = useRef<Iref>(null);

  const setPickedImage = (image: string | {}) => {
    setImage(image)
  }

  const validation = () => {
    if (emailRef.current?.value === "") {
      setEmailErr("Already exists")
      setValidNameText("")
      return false;
    }
    setEmailErr("");
    setValidNameText("Looks good to you")
    return true;
  }

  const renderItem = useCallback(({ item }: { item: { image: any } }) => {
    return (
      <Pressable onPress={() => setImage(item?.image)}>
        <Image source={item?.image} style={styles.avatar} />
      </Pressable>
    )
  }, [])

  const onSubmit = () => {
    if (!image || !validation()) {
      return;
    }

    navigation.navigate("FeedSetup", { username: emailRef.current?.value, profileImage: image });
  }

  return (
    <KeyboardAwareScrollView style={styles.container} enableOnAndroid >
      <View style={styles.padding}>
        <Text style={styles.title}>{"Predictr"}<Text style={styles.dot}>{"."}</Text></Text>
        <Text style={styles.avatarText}>{"Select your avatar"}</Text>
        <Image source={image} style={styles.image} resizeMode="contain" />
        <Text style={styles.avatarSubtitle}>{"Your Avatar"}</Text>
      </View>
      <View style={styles.imageSelection}>
        <Pressable onPress={() => { setShowModal(true) }}>
          <Image source={Images.camera} style={styles.camera} resizeMode="stretch" />
        </Pressable>
        <FlatList
          data={Avatars}
          renderItem={renderItem}
          horizontal={true}
          contentContainerStyle={styles.flatlistContent}
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={styles.padding}>
        <Input
          label={"Pick an username"}
          error={emailErr}
          ref={emailRef}
          extraText={"The username you create will be visible to other users."}
          onBlur={validation}
          rightText={validNameText}
        />
        <Button text="Save" onPress={onSubmit} style={styles.button} />
      </View>
      <ImagePicker visible={showModal} setPickedImage={setPickedImage} hideModal={() => { setShowModal(false) }} />
    </KeyboardAwareScrollView>
  )
}

export default SelectAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    // paddingHorizontal: 15,
  },
  title: {
    fontFamily: fonts.f800,//900
    fontWeight: Platform.select({ ios: "800" }),
    fontSize: 22,
    color: Colors.primaryBlue,
    textAlign: "center"
  },
  dot: {
    fontFamily: fonts.f800,
    fontWeight: Platform.select({ ios: "800" }),
    fontSize: 22,
    color: Colors.yellow,
  },
  avatarText: {
    fontFamily: fonts.f800,
    fontWeight: Platform.select({ ios: "400" }),
    fontSize: 32,
    color: Colors.textBlack,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  avatarSubtitle: {
    fontFamily: fonts.f400,
    fontWeight: Platform.select({ ios: "400" }),
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30
  },
  imageSelection: {
    flexDirection: "row",
    marginBottom: 30,
    marginLeft: 15
  },
  camera: {
    height: 54,
    width: 56
  },
  avatar: {
    height: 54,
    width: 56,
    marginHorizontal: 4,
  },
  button: {
    marginTop: 80,
    alignSelf: "baseline"
  },
  padding: { paddingHorizontal: 15 },
  flatlistContent: { paddingHorizontal: 4 },
  flatlist: { marginLeft: 4 },

})