import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from "react-native";
import PredictionCard from "../../component/PredictionCard";
import { fonts } from "../../constant";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { scale } from "../../../helper";
import CommentInput from "../../component/CommentInput";
import { useHeaderHeight } from "@react-navigation/elements";
import Comment from "./Comment";
import { Images } from "../../assets/images";
import { SCREENS } from "../../constant/navigation.constants";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";

const Post = ({ navigation }) => {
  const [isComment, setIsComment] = useState(true);
  const headerHeight = useHeaderHeight();
  const [replyClicked, setReplyClicked] = useState(false);

  const { imgSrc, date, selectedStock, movement, reason, previousScreen } =
    useRoute().params || {};

  console.log(imgSrc, "WHAHAHAH");

  useEffect(() => {
    if (!selectedStock) return;

    setIsComment(false);
  }, [selectedStock]);

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
        keyboardVerticalOffset={headerHeight + 60}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
          return false;
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableWithoutFeedback
              onPress={
                previousScreen
                  ? () => navigation.navigate(previousScreen)
                  : () => navigation.goBack()
              }
            >
              <Icons type={ICONS.BACKARR} />
            </TouchableWithoutFeedback>
            <Text style={styles.menuText}>Post</Text>
          </View>
          <ScrollView
            style={{ paddingBottom: 100 }}
            contentContainerStyle={styles.scrollStyle}
          >
            <View style={styles.postBox}>
              <PredictionCard index={0} imgSrc={imgSrc} />
              <View style={{ paddingHorizontal: 8 }}>
                <View style={styles.mainBox}>
                  {/* <View style={styles.textBox}> */}
                  {isComment && (
                    <Pressable
                      style={styles.textBox}
                      onPress={() =>
                        navigation.navigate(SCREENS.GENERAL_SCREEN, {
                          title: "Agreed",
                          backscreen: SCREENS.POST,
                        })
                      }
                    >
                      <>
                        <Icons type={ICONS.MULTI_AVA} />
                        <Text style={styles.text1}>0</Text>
                        <Text style={styles.text2}>Agreed</Text>
                      </>
                    </Pressable>
                  )}
                  {/* </View> */}
                  {isComment && (
                    <Pressable
                      style={styles.textBox}
                      onPress={() =>
                        navigation.navigate(SCREENS.GENERAL_SCREEN, {
                          title: "Disagreed",
                          backscreen: SCREENS.POST,
                        })
                      }
                    >
                      <>
                        <Icons type={ICONS.MULTI_AVA} />
                        <Text style={styles.text1}>0</Text>
                        <Text style={styles.text2}>Disagreed</Text>
                      </>
                    </Pressable>
                  )}
                </View>

                {isComment && (
                  <View style={{ paddingTop: 12, paddingRight: 8 }}>
                    <Comment
                      name="Trevor Nik"
                      ago="2 Hours ago"
                      content={`lorem ams das dasdn laks dasjd akd as dasj dka asdasd `}
                      avatar={Images.avatar1}
                      setReplyClicked={setReplyClicked}
                    />
                    <Comment
                      name="S Shar"
                      ago="5 Hours ago"
                      content={`lorem ams das dasdn laks dasjd akd as dasj dka adsda asdas dasd asda`}
                      avatar={Images.avatar2}
                      setReplyClicked={setReplyClicked}
                    />
                    <Comment
                      name="Dev Trev"
                      ago="10 hours ago"
                      content={`lorem ams das dasdn laks dasjd akd as dasj dka asdasda sdasd asd asdasdsfasfasasdasd d asda dasda sdasd ad`}
                      avatar={Images.avatar3}
                      setReplyClicked={setReplyClicked}
                    />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <CommentInput isReply={replyClicked} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#00000020",
  },

  avoidingView: {
    flex: 1,
  },

  scrollStyle: {
    flexGrow: 1,
  },

  mainBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
    gap: 54,
  },

  textBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  text1: {
    fontFamily: fonts.f700,
    fontWeight: "700",
    fontSize: scale(14),
    color: "#000",
  },

  text2: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: scale(14),
    color: "#717272",
  },

  menuText: {
    fontFamily: fonts.f600,
    fontWeight: "600",
    fontSize: 16,
    color: "#101010",
    marginLeft: 16,
  },

  postBox: {
    paddingHorizontal: 8,
    paddingTop: 14,
  },
});

export default Post;
