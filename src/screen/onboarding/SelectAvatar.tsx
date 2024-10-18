import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Images } from "../../assets/images";
import Button from "../../component/Button";
import ImagePicker from "../../component/ImagePicker";
import Input, { Iref } from "../../component/Input";
import { Colors, fonts } from "../../constant";
// import { RootStackParamList } from "../../navigation/MainNavigation";
import ImageCropPicker from "react-native-image-crop-picker";
import {
  PERMISSIONS,
  check,
  request,
  PermissionStatus,
} from "react-native-permissions";
import DeviceInfo from "react-native-device-info";
import { scale } from "../../../helper";
import { SCREENS } from "../../constant/navigation.constants";
import { useRoute } from "@react-navigation/native";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { SafeAreaView } from "react-native-safe-area-context";
import userStore from "../../user.store";

const Avatars = [
  { image: Images.avatar1, name: "Bear" },
  { image: Images.avatar2, name: "Cat White" },
  { image: Images.avatar3, name: "Cat Yellow" },
  { image: Images.avatar4, name: "Chicken" },
  { image: Images.avatar5, name: "Cow" },
  { image: Images.avatar6, name: "Elephant" },
  { image: Images.avatar7, name: "Fat Bear" },
  { image: Images.avatar8, name: "Fox" },
  { image: Images.avatar9, name: "Dragon" },
  { image: Images.avatar10, name: "Giraffe" },
  { image: Images.avatar11, name: "Lion" },
  { image: Images.avatar12, name: "Monkey" },
  { image: Images.avatar13, name: "Owl" },
  { image: Images.avatar14, name: "Panda" },
  { image: Images.avatar15, name: "Pig" },
  { image: Images.avatar16, name: "Sheep" },
  { image: Images.avatar17, name: "Tiger" },
  { image: Images.avatar18, name: "Eagle" },
];

// interface Props {
//   navigation: StackNavigationProp<RootStackParamList, "SelectAvatar">;
// }

const SelectAvatar: React.FC<any> = ({ navigation }) => {
  const [validNameText, setValidNameText] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [image, setImage] = useState<{
    image: string | { uri: string };
    name?: string;
  }>({ image: Images.avatarPlaceholder });
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const route = useRoute();

  const { isEdit = false } = route.params || {};

  const emailRef = useRef<Iref>(null);

  const androidVersion = parseInt(DeviceInfo.getSystemVersion());

  const capturePhoto = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : androidVersion >= 13
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

    const resCheck = await check(permission);

    switch (resCheck) {
      case "denied":
        const req: PermissionStatus = await request(permission);
        if (req === "granted" || req === "limited") {
          let res = await ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          });
          setPickedImage({ uri: res.path });
        } else {
          Alert.alert(
            "Open setting",
            "Please allow camera permission from settings",
            [
              {
                text: "Open Settings",
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ]
          );
        }
        break;

      case "granted":
        let res = await ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        setPickedImage({ uri: res.path });
        break;

      case "limited":
        let resl = await ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        setPickedImage({ uri: resl.path });
        // hideModal()
        break;
      default:
        Alert.alert(
          "Open setting",
          "Please allow camera permission from settings",
          [
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]
        );
    }
  };

  const setPickedImage = (image: string | {}) => {
    setImage({ image: image });
  };

  const validation = () => {
    if (emailRef.current?.value === "") {
      setEmailErr("Already exists");
      setValidNameText("");
      return false;
    }
    setEmailErr("");
    setValidNameText("Looks good to you");
    return true;
  };

  const renderItem = useCallback(
    ({ item }: { item: { image: any } }) => {
      return (
        <Pressable onPress={() => setImage(item)}>
          <Image
            source={item?.image}
            style={[
              styles.avatar,
              image.image === item.image && styles.selected,
            ]}
          />
        </Pressable>
      );
    },
    [image]
  );

  const onSubmit = () => {
    if (disabled) {
      Alert.alert("Please select both image and usename", "", [
        { text: "Ok", style: "cancel" },
      ]);
      return;
    }

    navigation.navigate(SCREENS.FEED_SETUP, {
      username: emailRef.current?.value,
      profileImage: image.image,
    });
  };

  useEffect(() => {
    if (!image || !validation() || image.image === Images.avatarPlaceholder) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [image, emailRef.current?.value]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.padding}>
            {!isEdit ? (
              <Text style={styles.title}>
                {"Predictr"}
                <Text style={styles.dot}>{"."}</Text>
              </Text>
            ) : (
              <TouchableWithoutFeedback
                style={{ padding: 10, backgroundColor: "red" }}
                onPress={() => navigation.navigate(SCREENS.PROFILE)}
              >
                <Icons type={ICONS.BACKARR} />
              </TouchableWithoutFeedback>
            )}
            {!isEdit ? (
              <Text style={styles.avatarText}>{"Select your avatar"}</Text>
            ) : (
              <>
                <Text
                  style={{
                    ...styles.avatarText,
                    textAlign: "left",
                    marginTop: scale(12),
                  }}
                >
                  {"Edit your profile"}
                </Text>
                <Text style={styles.subHeadText}>
                  Customize your profile by updating your avatar and name.
                </Text>
              </>
            )}
            <Image source={image?.image} style={styles.image} />
            {image?.image?.uri ? (
              <Text onPress={capturePhoto} style={styles.edit}>
                {"Edit"}
              </Text>
            ) : (
              <Text style={styles.avatarSubtitle}>
                {image?.name ?? "Your Avatar"}
              </Text>
            )}
          </View>
          <View style={styles.imageSelection}>
            <Pressable
              onPress={() => {
                setShowModal(true);
              }}
              style={{
                height: 56,
                width: 56,
                borderRadius: 12,
                backgroundColor: Colors.lightGrey,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={Images.cameraGrey} style={styles.camera} />
            </Pressable>
            <View style={styles.border} />
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
          <View style={[styles.padding, { flexGrow: 1 }]}>
            <Input
              label={"Pick an username"}
              error={emailErr}
              ref={emailRef}
              extraText={
                "The username you create will be visible to other users."
              }
              onBlur={validation}
              rightText={validNameText}
            />
            <Button
              text="Save"
              onPress={onSubmit}
              style={styles.button}
              inActive={disabled}
            />
          </View>
        </KeyboardAwareScrollView>
        <ImagePicker
          visible={showModal}
          setPickedImage={setPickedImage}
          hideModal={() => {
            setShowModal(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectAvatar;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingVertical: scale(20),
    // paddingHorizontal: 16,
  },
  title: {
    fontFamily: fonts.f800, //900
    fontWeight: "800",
    fontSize: scale(22),
    color: Colors.primaryBlue,
    textAlign: "center",
  },
  dot: {
    fontFamily: fonts.f800,
    fontWeight: "800",
    fontSize: scale(22),
    color: Colors.yellow,
    borderRadius: scale(24),
    overflow: "hidden",
  },
  avatarText: {
    fontFamily: fonts.f800,
    fontWeight: "800",
    fontSize: scale(32),
    color: Colors.textBlack,
    textAlign: "center",
    marginTop: scale(30),
    marginBottom: scale(10),
  },

  subHeadText: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: 15,
    color: "#151B26",
  },

  image: {
    height: scale(150),
    width: scale(150),
    alignSelf: "center",
    marginTop: scale(20),
    marginBottom: scale(10),
    borderRadius: scale(24),
  },
  avatarSubtitle: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: scale(16),
    textAlign: "center",
    marginBottom: scale(30),
  },
  imageSelection: {
    flexDirection: "row",
    marginBottom: scale(30),
    marginLeft: scale(15),
  },
  camera: {
    height: scale(24),
    width: scale(26),
  },
  avatar: {
    height: scale(54),
    width: scale(56),
    borderRadius: scale(12),
    marginHorizontal: 4,
  },
  button: {
    marginTop: "auto",
    marginBottom: scale(20),
    // alignSelf: "baseline"
  },
  padding: {
    paddingHorizontal: scale(15),
  },
  flatlistContent: {
    paddingHorizontal: 4,
  },
  border: {
    backgroundColor: Colors.lightGrey,
    height: scale(36),
    width: 1,
    marginLeft: 8,
    alignSelf: "center",
  },
  flatlist: {},
  edit: {
    fontFamily: fonts.f600,
    fontWeight: "600",
    fontSize: scale(16),
    color: Colors.primaryBlue,
    textAlign: "center",
    marginBottom: scale(30),
  },
  selected: {
    borderWidth: 1,
    borderColor: Colors.textBlack,
    borderRadius: scale(12),
  },
});
