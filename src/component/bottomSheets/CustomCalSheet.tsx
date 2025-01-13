import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import CustomDatePicker from "../CustomDatePicker";
import { BackHandler, Platform, StyleSheet } from "react-native";
import { scale } from "../../../helper";
import moment from "moment";

const CustomCalSheet = ({ datePickerRef, setDate }) => {
  const { dismiss } = useBottomSheetModal();
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    const handleBackButton = () => {
      return dismiss(); // dismiss() returns true/false, it means there is any instance of Bottom Sheet visible on current screen.
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleCustomDateChange = (selectedDate) => {
    const newDate = new Date(selectedDate);

    const dateObj = new Date(newDate);

    // Convert the date to the desired format (e.g., Oct 08, 2024)
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    setDateRange(newDate);
    setDate(formattedDate);
    datePickerRef.current?.close();
  };

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <BottomSheetModal
      enableHandlePanningGesture={true}
      enableContentPanningGesture={false}
      ref={datePickerRef}
      index={0}
      enablePanDownToClose
      snapPoints={[700]}
      handleIndicatorStyle={{
        width: 65,
        height: 5,
        backgroundColor: "#B3B3B3",
      }}
      backdropComponent={renderBackdrop}
      onDismiss={() => datePickerRef.current.dismiss()}
      style={styles.datePickerBottomSheet}
    >
      <CustomDatePicker
        initialDate={dateRange}
        onDateChange={(date) => handleCustomDateChange(date)}
        closeBottomSheet={() => datePickerRef.current?.dismiss()}
        fromDate={moment().format("YYYY-MM-DD")}
      />
    </BottomSheetModal>
  );
};

export default CustomCalSheet;

const styles = StyleSheet.create({
  datePickerBottomSheet: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
  },
});
