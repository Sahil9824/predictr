import React, { forwardRef, useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors, fonts } from "../../constant";
import { scale } from "../../../helper";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Icons from "../../component/Icons";
import { ICONS } from "../../constant/icons.constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ContestDetails = forwardRef((props, ref) => {
  const closeBottomSheet = () => {
    ref.current?.close();
  };

  const handleScoringPress = () => {
    //
  };

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        ref={ref}
        handleIndicatorStyle={{
          width: 65,
          height: 5,
          backgroundColor: "#B3B3B3",
        }}
        style={styles.bottomSheet}
        snapPoints={["98%"]}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.header}>
            <Text style={styles.contestText}>Contest Details</Text>
            <TouchableWithoutFeedback
              // style={{ backgroundColor: "red" }}
              onPress={closeBottomSheet}
            >
              <Icons type={ICONS.CLOSE} />
            </TouchableWithoutFeedback>
          </View>

          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll
            enableOnAndroid
            scrollEnabled
            keyboardShouldPersistTaps="handled"
            // style={styles.cardContainer}
            contentContainerStyle={styles.cardContainer}
          >
            <View style={styles.bottomPart}>
              <Text style={styles.headText}>Rules:</Text>
              <View style={styles.bottomWrap}>
                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>1.</Text>
                  <Text style={styles.subText}>
                    Each month we will be running a contest to see who the best
                    stock predictors are.
                  </Text>
                </View>
                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>2.</Text>
                  <Text style={styles.subText}>
                    The top three predictors for this month will win $500, $300
                    and $200 respectively.
                  </Text>
                </View>
                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>3.</Text>
                  <Text style={styles.subText}>
                    You need to make at least 3 predictions on 3 different
                    stocks to be eligible.
                  </Text>
                </View>

                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>4.</Text>
                  <Text style={styles.subText}>
                    Each prediction must expire in the current month. I think x
                    stock will change by 
                    <Text style={{ fontFamily: fonts.f700 }}>
                      {" "}
                      month of contest.
                    </Text>{" "}
                    This means that you can make guesses for future months
                    starting today.
                  </Text>
                </View>

                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>5.</Text>
                  <Text style={styles.subText}>
                    Stocks that you make your predictions on cannot be acquired
                    or bankrupt.
                  </Text>
                </View>
                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>6.</Text>
                  <Text style={styles.subText}>
                    Prizes will be distributed in CAD dollars.
                  </Text>
                </View>
              </View>

              <Text style={{ ...styles.headText, marginTop: 12 }}>
                Winner announcements:
              </Text>
              <View style={styles.bottomWrap}>
                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>1.</Text>
                  <Text style={styles.subText}>
                    The result will be announced at the end of every month.
                  </Text>
                </View>
                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>2.</Text>
                  <Text style={styles.subText}>
                    Winners will be announced on our social media channels.
                  </Text>
                </View>
                <View style={styles.headTextSub}>
                  <Text style={styles.noText}>3.</Text>
                  <Text style={styles.subText}>
                    The winner(s) must have a paypal account or bank account
                    that can receive e-transfer/wire to accept payment.
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleScoringPress}
              style={styles.bottomBtnBox}
            >
              <Text style={styles.btnText}>View Scoring System</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default ContestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scale(10),
  },

  headerOptionsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  cardContainer: {
    paddingBottom: 50,
  },
  bottomSheetContainer: {
    flex: 1,
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  subText: {
    fontFamily: fonts.f400,
    fontSize: 15,
    color: "#505050",
    paddingLeft: 8,
    width: "98%",
    fontWeight: "400",
  },

  contestText: {
    fontFamily: fonts.f700,
    fontSize: 17,
    textAlign: "left",
    color: "#151B26",
    fontWeight: "700",
  },

  bottomSheet: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
  },
  bottomPart: {
    width: "100%",
    paddingVertical: 16,
  },

  bottomWrap: {
    display: "flex",
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
  },

  headText: {
    fontFamily: fonts.f700,
    fontSize: 16,
    color: "#151B26",
    fontWeight: "700",
  },
  headTextSub: {
    flexDirection: "row",
    width: "100%",
  },

  noText: {
    fontFamily: fonts.f400,
    fontSize: 15,
    color: "#505050",
    fontWeight: "400",
  },
  bottomBtnBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    fontFamily: fonts.f700,
    fontSize: 16,
    textAlign: "center",
    color: "#024BAC",
    fontWeight: "700",
  },
});
