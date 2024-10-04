import React from "react";
import { Alert, Image, Linking, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { PERMISSIONS, request, check, PermissionStatus } from "react-native-permissions";
import { Images } from "../assets/images";
import DeviceInfo from 'react-native-device-info';


interface Props {
  visible: boolean;
  setPickedImage: (image: string | {}) => void
  hideModal: () => void
}

const ImagePicker: React.FC<Props> = ({ visible, setPickedImage, hideModal }) => {

  const androidVersion = parseInt(DeviceInfo.getSystemVersion());

  const capturePhoto = async () => {
    const permission = Platform.OS === 'ios'
      ? PERMISSIONS.IOS.CAMERA
      : androidVersion >= 13
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

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
    const permission = Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : androidVersion >= 13
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
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
    // backgroundColor: "gray",
    // height: 90,
    backgroundColor: "#f5f3f2",
    width: 280,
    borderRadius: 12,
    position: "absolute",
    top: 390,
    left: 30,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    elevation: 10, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 }, // iOS shadow offset
    shadowOpacity: 0.2,
    shadowRadius: 16, // iOS shadow blur radius
  },
  option1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 16,
    paddingVertical: 10.2,
  },
  option2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10.2,
    // marginTop: 8
  },
  text: {
    fontFamily: "SF-Pro-Text-Regular",
    // fontSize: 18,
    fontSize: 17,
    color: "black",
    lineHeight: 22,
  },
  image: {
    width: 25,
    height: 30
  },
  modal: {
    flex: 1
  }
})