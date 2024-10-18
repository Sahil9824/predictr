import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Images } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { scale } from "../../../helper";
import { TouchableOpacity } from "react-native";
import { Colors, fonts } from "../../constant";
import Icons from "../Icons";
import { ICONS } from "../../constant/icons.constants";
import Button from "../Button";

const MovementSheet = ({ movementBottomRef, setMovement }) => {
  const [selectedOption, setSelectedOption] = useState("Up");
  const [selectedAccuracy, setSelectedAccuracy] = useState("5%");
  const [manualAccuracy, setManualAccuracy] = useState("");

  const handleManualAccuracyChange = (text) => {
    setManualAccuracy(text);

    if (text) {
      setSelectedAccuracy(null);
    }
  };

  const handleAccuracyOptionPress = (range) => {
    setSelectedAccuracy(range);

    setManualAccuracy("");
  };

  const handlePress = () => {
    setMovement({
      percentage: selectedAccuracy || `${manualAccuracy}%`,
      movement: selectedOption,
    });
    movementBottomRef.current.dismiss();
  };

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <BottomSheetModal
      enableHandlePanningGesture={true}
      enableContentPanningGesture={false}
      ref={movementBottomRef}
      index={0}
      enablePanDownToClose
      snapPoints={[450]}
      handleIndicatorStyle={{
        width: 65,
        height: 5,
        backgroundColor: "#B3B3B3",
      }}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.searchContainer}>
        <View style={styles.header}>
          <Text style={styles.headText}>Stock Movement</Text>
          <TouchableOpacity onPress={() => movementBottomRef.current.dismiss()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Trend</Text>

        <View style={styles.radioButtonContainer}>
          {/* Up Button */}
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedOption === "Up" ? styles.selected : {},
            ]}
            onPress={() => setSelectedOption("Up")}
          >
            <View style={styles.circleContainer}>
              <View
                style={[
                  styles.outerCircle,
                  selectedOption === "Up" ? styles.selectedOuterCircle : {},
                ]}
              >
                {selectedOption === "Up" && <View style={styles.innerCircle} />}
              </View>
              <Text
                style={
                  selectedOption === "Up" ? styles.selectedText : styles.text
                }
              >
                Up
              </Text>
            </View>
          </TouchableOpacity>

          {/* Down Button */}
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedOption === "Down" ? styles.selected : {},
            ]}
            onPress={() => setSelectedOption("Down")}
          >
            <View style={styles.circleContainer}>
              <View
                style={[
                  styles.outerCircle,
                  selectedOption === "Down" ? styles.selectedOuterCircle : {},
                ]}
              >
                {selectedOption === "Down" && (
                  <View style={styles.innerCircle} />
                )}
              </View>
              <Text
                style={
                  selectedOption === "Down" ? styles.selectedText : styles.text
                }
              >
                Down
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Percentage (%)</Text>
        <TextInput
          style={styles.accuracyInput}
          placeholder="Enter percentage"
          value={manualAccuracy}
          onChangeText={handleManualAccuracyChange}
          keyboardType="numeric"
          inputMode="numeric"
        />

        <View style={styles.accuracyOptions}>
          {["3%", "5%", "7%", "10%"].map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.accuracyButton,
                selectedAccuracy === range && styles.accuracyButtonSelected,
              ]}
              onPress={() => handleAccuracyOptionPress(range)}
            >
              <Text
                style={[
                  styles.accuracyText,
                  selectedAccuracy === range && styles.accuracyTextSelected,
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          style={{ marginTop: 32, marginBottom: 30 }}
          text="Save"
          inActive={!selectedOption || (!selectedAccuracy && !manualAccuracy)}
          onPress={handlePress}
        />
      </View>
    </BottomSheetModal>
  );
};

export default MovementSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headText: {
    fontFamily: fonts.f700,
    fontWeight: "700",
    fontSize: scale(17),
    color: "#000",
  },

  cancelButton: {
    color: "#717272",
    paddingLeft: 10,
    fontSize: 16,
  },

  searchContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  label: {
    fontSize: scale(14),
    fontFamily: fonts.f600,
    fontWeight: "600",
    color: "#101010",
    width: "100%",
    marginTop: 24,
  },

  radioButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 5,
  },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "49%",
  },

  selected: {
    borderWidth: 2,
    borderColor: "#024BAC",
    backgroundColor: "#E9F0FF",
  },

  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#505050",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  selectedOuterCircle: {
    borderColor: "#024BAC",
  },

  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#024BAC",
  },

  text: {
    fontFamily: fonts.f400,
    fontWeight: "400",
    fontSize: scale(14),
    color: "#151B26",
  },
  selectedText: {
    fontFamily: fonts.f600,
    fontWeight: "600",
    fontSize: scale(14),
    color: "#151B26",
  },

  sectionTitle: {
    fontSize: scale(14),
    color: Colors.textBlack,
    marginVertical: scale(4),
    fontWeight: "600",
    width: "100%",
    textAlign: "left",
    marginTop: 24,
  },

  accuracyInput: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 7,
    paddingStart: 10,
    height: 49,
    width: "100%",
  },

  accuracyOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
    width: "100%",
  },

  accuracyButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    paddingVertical: 11,
    borderRadius: 8,
    width: "24%",
  },

  accuracyButtonSelected: {
    backgroundColor: "#e9f1fc",
    borderColor: Colors.primaryBlue,
  },
  accuracyText: {
    fontFamily: fonts.f500,
    fontSize: scale(15),
    color: Colors.textBlack,
    fontWeight: "500",
  },
  accuracyTextSelected: {
    color: Colors.textBlack,
    fontWeight: "bold",
  },
});
