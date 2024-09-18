import { StyleSheet, Text, View, Image, Pressable, ScrollView, FlatList, KeyboardAvoidingView } from "react-native";
import { Colors } from "../../constant";
import { useCallback, useRef, useState } from "react";
import { Images } from "../../assets/images";
import Input, { Iref } from "../../component/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../component/ Button";

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

const SelectAvatar = () => {
  const [validNameText, setValidNameText] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [image, setImage] = useState(Images.avatarPlaceholder);

  const emailRef = useRef<Iref>(null);

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

  return (
    <KeyboardAwareScrollView style={styles.container} enableOnAndroid >
      <Text style={styles.title}>{"Predictr"}<Text style={styles.dot}>{"."}</Text></Text>
      <Text style={styles.avatarText}>{"Select your avatar"}</Text>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.avatarSubtitle}>{"Your Avatar"}</Text>
      <View style={styles.imageSelection}>
        <Image source={Images.camera} style={styles.camera} resizeMode="contain" />
        <FlatList
          data={Avatars}
          renderItem={renderItem}
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: 4 }}
          style={{ marginLeft: 4 }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <Input
        label={"Pick an username"}
        error={emailErr}
        ref={emailRef}
        extraText={"The username you create will be visible to other users."}
        onBlur={validation}
        rightText={validNameText}
      />

      {/* <Button text="Save" /> */}
    </KeyboardAwareScrollView>
  )
}

export default SelectAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: 22,
    color: Colors.primaryBlue,
    textAlign: "center"
  },
  dot: {
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: 22,
    color: Colors.yellow,
  },
  avatarText: {
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: 32,
    color: Colors.textBlack,
    textAlign: "center",
    marginVertical: 15,
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  avatarSubtitle: {
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20
  },
  imageSelection: {
    flexDirection: "row",
    marginBottom: 30,
  },
  camera: {
    height: 54,
    width: 56
  },
  avatar: {
    height: 54,
    width: 56,
    marginHorizontal: 4,
  }
})