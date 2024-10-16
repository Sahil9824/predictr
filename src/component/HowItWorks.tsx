// Import necessary libraries
import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../../helper";
import { Images } from "../assets/images";
import { Colors, fonts } from "../constant";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Icons from "./Icons";
import { ICONS } from "../constant/icons.constants";

const HowToPredictScreen = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["95%"];

  const handleBackPress = () => {
    navigation.pop();
  };

  // Open the bottom sheet
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={Images.back}
              style={{ width: scale(20), height: scale(20) }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>How to predict</Text>
        </View>

        <Text style={styles.subTitle}>Make predictions and see results</Text>

        {/* Pick a Stock */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Pick a stock</Text>
          <TouchableOpacity style={styles.inputContainer}>
            <Image source={Images.think} style={styles.emojiIcon} />
            <Text style={styles.inputText}>I think</Text>
            <Text style={styles.placeHolder}>Select Stock</Text>
            <Image
              style={{ marginEnd: scale(5) }}
              source={Images.Chevron_down}
            />
          </TouchableOpacity>
        </View>

        {/* Set Movement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. Select how much you think it will move and the direction.
          </Text>
          <TouchableOpacity style={styles.inputContainer}>
            <Image source={Images.Chart} style={styles.icon} />
            <Text style={styles.inputText}>Will go</Text>
            <Text style={styles.placeHolder}>Set Movement</Text>
            <Image
              style={{ marginEnd: scale(5) }}
              source={Images.Chevron_down}
            />
          </TouchableOpacity>
        </View>

        {/* Select End Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Select end date</Text>
          <TouchableOpacity style={styles.inputContainer}>
            <Image source={Images.Calendar} style={styles.icon} />
            <Text style={styles.inputText}>By</Text>
            <Text style={styles.placeHolder}>Pick a Date </Text>
            <Image
              style={{ marginEnd: scale(5) }}
              source={Images.Chevron_down}
            />
          </TouchableOpacity>
        </View>

        {/* Scoring System Link */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle2}>4. See Results</Text>
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
              marginStart: scale(14),
              borderBottomWidth: 1,
              borderBottomColor: "#024BAC",
            }}
            onPress={handleOpenBottomSheet}
          >
            <Text style={styles.linkText}>View scoring system</Text>
          </TouchableOpacity>
        </View>
        {/* Predict Button */}
        <TouchableOpacity style={styles.predictButton}>
          <Text style={styles.predictButtonText}>Predict</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        handleIndicatorStyle={{
          width: 65,
          height: 5,
          backgroundColor: "#B3B3B3",
        }}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
      >
        <ScoringSystemScreen bottomSheetRef={bottomSheetRef} />
      </BottomSheet>
    </View>
  );
};

// Scoring System Bottom Sheet
const ScoringSystemScreen = ({ bottomSheetRef }) => {
  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, [bottomSheetRef]);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Scoring system</Text>
        <TouchableOpacity onPress={handleCloseBottomSheet}>
          <Icons type={ICONS.CLOSE} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.modalText}>
          The accuracy of your guess will be in percentage.
        </Text>
        <Text style={styles.modalText}>
          "What percentage of your guess is correct?"
        </Text>
        <View>
          <Text
            style={{
              fontWeight: "700",
              color: Colors.textBlack,
              marginBottom: scale(10),
              fontSize: scale(14),
            }}
          >
            Formula:
          </Text>
          <Text
            style={styles.modalText}
          >{`If your guess (%) < actual movement (%) then,`}</Text>
        </View>

        <View style={styles.formulaBox}>
          <Image
            style={{ width: "100%", height: 78 }}
            source={Images.Formula1}
            resizeMode="stretch"
          />
        </View>

        <Text style={styles.modalText}>
          If your guess is equal or more than actual movement:
        </Text>
        <View style={styles.formulaBox}>
          <Image
            style={{ width: "100%", height: 78 }}
            source={Images.Formula2}
            resizeMode="stretch"
          />
        </View>

        <Text style={styles.text1}>
          If the stock movement is in opposite direction than your guess then
          that accuracy is 0%.
        </Text>
        <Text style={styles.text1}>
          Let's say, your guess was 5% up and if actual movement is
        </Text>

        {/* Accuracy Table */}
        <View style={styles.accuracyTable}>
          <View style={styles.tableRow}>
            <Text
              style={{
                ...styles.tableCell1,
                color: "#717272",
                fontFamily: fonts.f400,
              }}
            >
              Actual Movement
            </Text>
            <Text
              style={{
                ...styles.tableCell2,
                color: "#717272",
                fontFamily: fonts.f400,
              }}
            >
              Calculation
            </Text>
            <Text
              style={{
                ...styles.tableCell3,
                color: "#717272",
                fontFamily: fonts.f400,
              }}
            >
              Accuracy
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell1}>3% down</Text>
            <Text style={styles.tableCell2}>Opposite trend</Text>
            <Text style={styles.tableCell3}>0%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell1}>4% up</Text>
            <Text style={styles.tableCell2}>(4/5) * 100</Text>
            <Text style={styles.tableCell3}>80%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell1}>5% up</Text>
            <Text style={styles.tableCell2}>(4/5) * 100</Text>
            <Text style={styles.tableCell3}>100%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell1}>6% up</Text>
            <Text style={styles.tableCell2}>(4/5) * 100</Text>
            <Text style={styles.tableCell3}>83.3%</Text>
          </View>
        </View>

        {/* Understood Button */}
        <TouchableOpacity
          style={styles.understoodButton}
          onPress={handleCloseBottomSheet}
        >
          <Text style={styles.understoodButtonText}>Understood 👍</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Add the styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: verticalScale(16),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "#000",
    paddingVertical: scale(10),
    paddingStart: scale(10),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginStart: scale(15),
    color: Colors.textBlack,
  },
  subTitle: {
    fontSize: moderateScale(16),
    marginVertical: verticalScale(16),
    fontWeight: "700",
    color: Colors.textBlack,
    marginHorizontal: scale(12),
  },
  text1: {
    fontFamily: fonts.f400,
    fontSize: 14,
    color: "#717272",
    marginBottom: 10,
  },
  section: {
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    marginBottom: verticalScale(8),
  },
  sectionTitle2: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(5),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: moderateScale(14),
    borderRadius: scale(16),
  },
  emojiIcon: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(8),
  },
  icon: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(8),
  },
  inputText: {
    fontSize: moderateScale(15),
    color: Colors.labelBlack,
    fontWeight: "600",
    paddingStart: scale(7),
  },
  placeHolder: {
    fontSize: moderateScale(15),
    color: "#A9A9A9",
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
  },
  linkText: {
    color: "#024BAC",
    fontSize: scale(14),

    fontWeight: "700",
    paddingBottom: verticalScale(2),
  },
  predictButton: {
    backgroundColor: "#024BAC",
    padding: moderateScale(12),
    borderRadius: 8,
    marginTop: "auto",
    marginBottom: 20,
    marginHorizontal: scale(10),
  },
  predictButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  modalTitle: {
    fontSize: moderateScale(17),
    fontWeight: "bold",
    color: Colors.labelBlack,
  },
  modalText: {
    fontSize: scale(14),
    marginBottom: scale(7),
    color: Colors.labelBlack,
  },
  formulaBox: {
    backgroundColor: "#FFF",
    marginVertical: verticalScale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  formulaText: {
    fontSize: moderateScale(14),
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
  accuracyTable: {
    borderWidth: 1,
    backgroundColor: "#E9F1FC",
    paddingHorizontal: scale(6),
    borderColor: "transparent",
    borderRadius: scale(5),
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  tableCell1: {
    fontSize: moderateScale(14),
    fontWeight: "500",
    color: "#333",
    width: 130,
    marginRight: 10,
  },
  tableCell2: {
    width: 120,
    marginRight: "auto",
    flexDirection: "row",
    textAlign: "left",
  },
  tableCell3: {
    width: "auto",
    alignSelf: "flex-start",
  },
  understoodButton: {
    backgroundColor: "#024BAC",
    padding: moderateScale(14),
    borderRadius: scale(12),
    marginTop: verticalScale(24),
    alignSelf: "center",
    width: "100%",
  },
  understoodButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
});

export { HowToPredictScreen, ScoringSystemScreen };
