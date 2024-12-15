import React, { useState, forwardRef, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import { Colors, fonts } from "../constant";
import { scale } from "../../helper";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Icons from "../component/Icons";
import { ICONS } from "../constant/icons.constants";
import CustomDatePicker from "./CustomDatePicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { APP_NAVIGATION, SCREENS } from "../constant/navigation.constants";
import Button from "./Button";
import SearchStock from "./bottomSheets/SearchStock";
import { RangeSlider } from "@react-native-assets/slider";
import { Pressable } from "react-native";

const FilterCard = forwardRef((props, ref) => {
  const { dismiss } = useBottomSheetModal();
  const [selectedAccuracy, setSelectedAccuracy] = useState(null);
  const [manualAccuracy, setManualAccuracy] = useState("");
  const [sliderValue, setSliderValue] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [showCustomDatePicker, setShowCustomDatePicker] = useState({
    from: false,
    to: false,
  });
  const [hashtag, setHashtag] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [selectedStock, setSelectedStock] = useState([]);

  const datePickerRef = useRef<BottomSheetModal>(null);

  const searchBottomRef = useRef(null);

  useEffect(() => {
    const handleBackButton = () => {
      return dismiss();
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const openStockPicker = (type) => {
    searchBottomRef.current?.present();
  };

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      style={{ zIndex: 100 }}
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );

  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleCustomDateChange = (selectedDate, type) => {
    const newDate = new Date(selectedDate);
    if (!isNaN(newDate)) {
      setDateRange((prev) => ({
        ...prev,
        [type]: newDate,
      }));
    }
    datePickerRef.current?.close();
  };

  const openDatePicker = (type) => {
    setShowCustomDatePicker({ ...showCustomDatePicker, [type]: true });
    datePickerRef.current?.present();
  };

  const handleSelectedPress = (item) => {
    setSelectedStock((prevSelectedStocks) => {
      const exists = prevSelectedStocks.find(
        (stock) => stock.symbol === item.symbol
      );
      if (exists) {
        return prevSelectedStocks.filter(
          (stock) => stock.symbol !== item.symbol
        );
      } else {
        return [
          ...prevSelectedStocks,
          { symbol: item.symbol, name: item.name },
        ];
      }
    });
  };

  const handleSave = () => {
    if (
      dateRange.from ||
      dateRange.to ||
      selectedAccuracy ||
      manualAccuracy.trim()
    ) {
      const filteredOptions = {
        accuracy: selectedAccuracy || manualAccuracy,
        from: dateRange?.from?.toISOString() || "",
        to: dateRange?.to?.toISOString() || "",
        tags: hashtag || "",
      };

      props?.setFilteredOptions && props.setFilteredOptions(filteredOptions);
      setIsReset(false);
      closeBottomSheet();
      ref.current?.close();
      // navigation.navigate(SCREENS.HOME, { filteredOptions, isReset });
    }
  };

  const clearStates = () => {
    setIsReset(true);
    setSelectedAccuracy(null);
    setManualAccuracy("");
    setDateRange({ from: null, to: null });
    setHashtag("");
    setSelectedStock([]);
    setSliderValue([]);
    props.onFilterReset && props.onFilterReset();
    props.isReset;
  };

  const closeBottomSheet = () => {
    datePickerRef.current?.dismiss();
  };

  const isSaveButtonEnabled =
    dateRange.from ||
    dateRange.to ||
    selectedStock.length > 0 ||
    sliderValue.length > 0;
  const isResetVisible =
    dateRange.from ||
    dateRange.to ||
    selectedStock.length > 0 ||
    sliderValue.length > 0;

  return (
    <>
      <BottomSheetModal
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        ref={ref}
        onDismiss={() => clearStates}
        handleIndicatorStyle={{
          width: 65,
          height: 5,
          backgroundColor: "#B3B3B3",
        }}
        style={styles.bottomSheet}
        snapPoints={["90%"]}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          extraScrollHeight={Platform.OS === "android" ? 190 : 0}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerRow}>
            <Text style={styles.filterText}>Filter Predictions</Text>
            {isResetVisible && (
              <TouchableOpacity onPress={clearStates}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Stock</Text>
            <Pressable onPress={openStockPicker} style={styles.searchContainer}>
              <View style={styles.searchBoxContainer}>
                <Icons type={ICONS.HEAD_SEARCH} />
                <Text style={styles.stext}>Search</Text>
              </View>
            </Pressable>
            {selectedStock?.length > 0 && (
              <View style={styles.selectedBox}>
                {selectedStock.map((item) => (
                  <Pressable
                    onPress={() => handleSelectedPress(item)}
                    key={item?.symbol}
                    style={styles.selectedItem}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.f700,
                        fontSize: scale(12),
                        color: Colors.textBlack,
                      }}
                    >
                      {item?.symbol}
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() => handleSelectedPress(item)}
                    >
                      <Icons type={ICONS.CANCEL} />
                    </TouchableWithoutFeedback>
                  </Pressable>
                ))}
              </View>
            )}

            <SearchStock
              searchBottomRef={searchBottomRef}
              setSelectedStock={setSelectedStock}
              selectedStock={selectedStock}
              isMultiselect
            />
            <Text style={{ ...styles.sectionTitle, marginBottom: 26 }}>
              Accuracy (%)
            </Text>
            <RangeSlider
              style={{
                width: "90%",
                alignSelf: "center",
              }}
              range={[0, 100]}
              step={1}
              minimumRange={1}
              minimumValue={0}
              maximumValue={100}
              crossingAllowed={false}
              outboundColor="#E7E7E7"
              inboundColor="#025ED7"
              thumbTintColor="#025ED7"
              enabled={true}
              slideOnTap={true}
              onValueChange={undefined}
              onSlidingStart={undefined}
              onSlidingComplete={(e) => setSliderValue(e)}
              CustomThumb={({ value, thumb }) => (
                <View
                  style={{
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.f500,
                      fontSize: scale(13),
                      color: "#717272",
                      position: "absolute",
                      top: -30,
                    }}
                  >
                    {value}%
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#025ED7",
                      height: 16,
                      width: 16,
                      borderRadius: 8,
                      borderWidth: 1.5,
                      borderColor: "white",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.15,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  ></View>
                </View>
              )}
              {...props}
            />

            <Text style={styles.sectionTitle}>Date Range</Text>
            <View style={styles.dateRangeContainer}>
              <TouchableOpacity
                onPress={() => openDatePicker("from")}
                style={styles.dateInputContainer}
              >
                {formatDate(dateRange.from) ? (
                  <Text style={{ ...styles.dateInput, color: "black" }}>
                    {formatDate(dateRange.from)}
                  </Text>
                ) : (
                  <Text style={styles.dateInput}>From</Text>
                )}
                <Icons
                  type={ICONS.CALENDAR}
                  iconContainerStyle={styles.calendarIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openDatePicker("to")}
                style={styles.dateInputContainer}
              >
                {formatDate(dateRange.to) ? (
                  <Text style={{ ...styles.dateInput, color: "black" }}>
                    {formatDate(dateRange.to)}
                  </Text>
                ) : (
                  <Text style={styles.dateInput}>To</Text>
                )}
                <Icons
                  type={ICONS.CALENDAR}
                  iconContainerStyle={styles.calendarIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                inActive={!isSaveButtonEnabled}
                onPress={handleSave}
                text="Save"
                inActiveColor="#717272"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </BottomSheetModal>

      <BottomSheetModal
        enableHandlePanningGesture={true}
        // enableDynamicSizing
        enableContentPanningGesture={false}
        ref={datePickerRef}
        index={0}
        enablePanDownToClose
        snapPoints={[550]}
        handleIndicatorStyle={{
          width: 65,
          height: 5,
          backgroundColor: "#B3B3B3",
        }}
        backdropComponent={renderBackdrop}
        onDismiss={() => setShowCustomDatePicker({ from: false, to: false })}
        style={styles.datePickerBottomSheet}
      >
        {showCustomDatePicker.from && (
          <CustomDatePicker
            initialDate={dateRange.from}
            onDateChange={(date) => handleCustomDateChange(date, "from")}
            closeBottomSheet={() => datePickerRef.current?.dismiss()}
            toDate={!dateRange.from && dateRange?.to}
          />
        )}
        {showCustomDatePicker.to && (
          <CustomDatePicker
            initialDate={dateRange.to}
            onDateChange={(date) => handleCustomDateChange(date, "to")}
            closeBottomSheet={() => datePickerRef.current?.dismiss()}
            fromDate={!dateRange?.to && dateRange?.from}
          />
        )}
      </BottomSheetModal>
    </>
  );
});

export default FilterCard;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
  },

  selectedBox: {
    flexDirection: "row",
    width: "100%",
    marginTop: 5,
    gap: 4,
  },

  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#CCDFF7",
    borderRadius: 16,
    gap: 4,
  },

  header: {
    paddingBottom: 10,
  },
  filterText: {
    fontFamily: fonts.f700,
    fontSize: scale(17),
    color: Colors.textBlack,
    //fontWeight: "700",
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: fonts.f600,
    fontSize: scale(15),
    color: Colors.textBlack,
    marginTop: 24,
    marginBottom: 5,
  },
  accuracyInput: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 7,
    paddingStart: 10,
    height: 49,
  },
  accuracyOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    width: "100%",
    gap: 5,
  },

  markerStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#ff6347",
  },
  selectedStyle: {
    backgroundColor: "#ff6347",
  },
  unselectedStyle: {
    backgroundColor: "#cccccc",
  },
  rangeText: {
    fontSize: 16,
    marginTop: 20,
  },

  accuracyButton: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    paddingVertical: 12,
    flex: 1,
    borderRadius: 8,
  },
  accuracyButtonSelected: {
    backgroundColor: "#e9f1fc",
    borderColor: Colors.primaryBlue,
    borderWidth: 2,
  },
  accuracyText: {
    fontFamily: fonts.f400,
    fontSize: 15,
    color: Colors.textBlack,
  },
  accuracyTextSelected: {
    fontFamily: fonts.f700,
    fontSize: 15,
    color: Colors.textBlack,
  },
  dateRangeContainer: {
    marginVertical: scale(3),
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  dateInput: {
    flex: 1,
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: Colors.textGrey,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.textGrey,
  },
  buttonContainer: {
    marginTop: "auto",
    paddingBottom: 20,
    paddingTop: 5,
    width: "100%",
    marginBottom: 40,
  },

  thumbContainer: {
    alignItems: "center",
  },
  thumbValue: {
    position: "absolute",
    top: -25,
    fontSize: 14,
    color: "#333",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff6347",
  },
  applyButton: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: fonts.f700,
    fontSize: scale(16),
    color: Colors.white,
  },
  bottomSheet: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
  },
  hashtagInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: scale(2),
    marginBottom: 10,
  },
  hashtagInput: {
    flex: 1,
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: Colors.textGrey,
    marginLeft: 10,
    height: 44,
  },
  hashtagIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.textGrey,
  },
  datePickerBottomSheet: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  resetButtonText: {
    fontFamily: fonts.f600,
    fontSize: scale(16),
    color: Colors.primaryBlue,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchBoxContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 0.8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 0,
    paddingHorizontal: 16,
  },
  stext: {
    marginLeft: 10,
    fontFamily: fonts.f400,
    fontSize: scale(14),
    color: "#717272",
  },
  searchBox: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#101010",
    fontFamily: fonts.f400,
  },
});
