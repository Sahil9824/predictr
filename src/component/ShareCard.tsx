import React, { forwardRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { scale } from "../../helper";
import { Colors, fonts } from "../constant";
import { Images } from "../assets/images";

const ShareCard = forwardRef((props, ref) => {
  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <>
      <BottomSheetModal
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        ref={ref}
        handleIndicatorStyle={{
          width: 65,
          height: 5,
          backgroundColor: "#B3B3B3",
        }}
        style={styles.bottomSheet}
        snapPoints={Platform.OS === "android" ? ["38%", "90%"] : ["28%", "90%"]}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={true}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Share Post</Text>

          <View style={styles.shareOptionsRow}>
            <TouchableOpacity>
              <View style={styles.optionContainer}>
                <Image source={Images.ShareVia} style={styles.icon} />
              </View>
              <Text style={styles.optionText}>Share Via...</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.optionContainer}>
                <Image source={Images.CopyLink} style={styles.icon} />
              </View>
              <Text style={styles.optionText}>Copy Link</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 0.2,
              marginHorizontal: scale(2),
              borderBottomColor: "#000",
            }}
          ></View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Image
                source={Images.Instagram} // Instagram icon
                style={styles.socialIcon}
              />
              <Text style={styles.socialIconText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Image
                source={Images.Whatsapp} // WhatsApp icon
                style={styles.socialIcon}
              />
              <Text style={styles.socialIconText}>Whatsapp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Image
                source={Images.Facebook} // Facebook icon
                style={styles.socialIcon}
              />
              <Text style={styles.socialIconText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Image
                source={Images.Messenger} // Messenger icon
                style={styles.socialIcon}
              />
              <Text style={styles.socialIconText}>Messenger</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
});

export default ShareCard;

const styles = StyleSheet.create({
  bottomSheet: {
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    paddingBottom: scale(24),
    borderRadius: 24,
    overflow: "hidden",
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.f700,
    fontSize: scale(18),
    color: Colors.textBlack,
    marginBottom: scale(20),
    fontWeight: "700",
  },
  shareOptionsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: scale(20),
    alignItems: "center",
  },
  optionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(20),
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  optionText: {
    fontFamily: fonts.f500,
    fontSize: scale(12),
    color: "#717272",
    marginTop: scale(8),
    marginHorizontal: scale(7),
    fontWeight: "500",
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: scale(20),
    alignItems: "center",
  },
  socialIconContainer: {
    alignItems: "center",
  },
  socialIcon: {
    width: scale(35),
    height: scale(35),
  },
  socialIconText: {
    paddingTop: scale(5),
  },
});
