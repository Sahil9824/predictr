import React from "react";
import { Alert, Image, Linking, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { PERMISSIONS, request, check, PermissionStatus, openSettings } from "react-native-permissions";
import { Images } from "../assets/images";

interface Props {
  visible: boolean;
  setPickedImage: (image: string | {}) => void
  hideModal: () => void
}

const ImagePicker: React.FC<Props> = ({ visible, setPickedImage, hideModal }) => {

  const capturePhoto = async () => {
    const permission = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    const resCheck = await check(permission);

    switch (resCheck) {
      case "denied":
        const req: PermissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
        if (req === "granted" || req === "limited") {
          let res = await ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          });
          setPickedImage({ uri: res.path });
          hideModal()
        } else {
          Alert.alert(
            "Open setting",
            "Please allow camera permission from settings",
            [
              {
                text: "Open Settings",
                onPress: () => { Linking.openSettings() }
              }
            ]
          )
        }
        break;

      case "granted":
        let res = await ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        setPickedImage({ uri: res.path })
        hideModal();
        break;

      case "limited":
        let resl = await ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        setPickedImage({ uri: resl.path })
        hideModal()
        break;
      default:
        Alert.alert(
          "Open setting",
          "Please allow camera permission from settings",
          [
            {
              text: "Open Settings",
              onPress: () => { Linking.openSettings() }
            }
          ]
        )
    }
  }

  const pickImage = async () => {
    const permission = Platform.OS === "ios" ? PERMISSIONS.IOS.MEDIA_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    const resCheck = await check(permission);

    switch (resCheck) {

      case "denied":
        const req: PermissionStatus = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        if (req === "granted" || req === "limited") {
          let res = await ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          })
          setPickedImage({ uri: res.path })
          hideModal()
        } else {
          Alert.alert(
            "Open setting",
            "Please allow gallery permission from settings",
            [
              {
                text: "Open Settings",
                onPress: () => { Linking.openSettings() }
              }
            ]
          )
        }
        break;

      case "granted":
        let res = await ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
        setPickedImage({ uri: res.path })
        hideModal();
        break;

      case "limited":
        let resl = await ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
        setPickedImage({ uri: resl.path })
        hideModal();
        break;

      default:
        Alert.alert(
          "Open setting",
          "Please allow camera permission from settings",
          [
            {
              text: "Open Settings",
              onPress: () => { Linking.openSettings() }
            }
          ]
        )
        break;
    }
  }

  return (
    <Modal visible={visible} transparent>
      <Pressable onPress={hideModal} style={styles.modal}>
        <View style={styles.container}>
          <Pressable onPress={capturePhoto} style={({ pressed }) => [pressed && { opacity: 0.75 }, styles.option1]}>
            <Text style={styles.text}>{"Take photo"}</Text>
            <Image source={Images.cameraTransparent} style={styles.image} resizeMode="contain" />
          </Pressable>
          <Pressable onPress={pickImage} style={({ pressed }) => [pressed && { opacity: 0.75 }, styles.option2]}>
            <Text style={styles.text}>{"Choose photo"}</Text>
            <Image source={Images.image} style={styles.image} resizeMode="contain" />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  )
}

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    height: 90,
    width: 280,
    borderRadius: 12,
    position: "absolute",
    top: 390,
    left: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  option1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  option2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8
  },
  text: {
    fontFamily: "SF-Pro-Text-Regular",
    fontSize: 18
  },
  image: {
    width: 25,
    height: 30
  },
  modal: {
    flex: 1
  }
})