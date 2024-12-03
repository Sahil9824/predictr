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
  const [sliderValue, setSliderValue] = useState([20, 80]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [showCustomDatePicker, setShowCustomDatePicker] = useState({
    from: false,
    to: false,
  });
  const [hashtag, setHashtag] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [selectedStock, setSelectedStock] = useState("");

  const datePickerRef = useRef<BottomSheetModal>(null);

  const navigation = useNavigation();

  const onValuesChange = (values) => {
    setRange(values);
  };
  const searchBottomRef = useRef(null);

  useEffect(() => {
    const handleBackButton = () => {
      return dismiss(); // dismiss() returns true/false, it means there is any instance of Bottom Sheet visible on current screen.
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

  const renderThumb = (value) => (
    <View style={styles.thumbContainer}>
      <Text style={styles.thumbValue}>{value}</Text>
      <View style={styles.thumb} />
    </View>
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
    props.onFilterReset && props.onFilterReset();
    props.isReset;
  };

  const closeBottomSheet = () => {
    datePickerRef.current?.dismiss();
  };

  const isSaveButtonEnabled =
    dateRange.from || dateRange.to || selectedAccuracy || manualAccuracy.trim();
  const isResetVisible =
    dateRange.from || dateRange.to || selectedAccuracy || manualAccuracy.trim();

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
            <SearchStock
              searchBottomRef={searchBottomRef}
              setSelectedStock={setSelectedStock}
            />
            <Text style={{ ...styles.sectionTitle, marginBottom: 26 }}>
              Accuracy (%)
            </Text>
            <RangeSlider
              style={{ width: "100%" }}
              range={[0, 100]} // set the current slider's value
              step={0.1}
              minimumRange={3} // Minimum range between the two thumbs (defaults as "step")
              minimumValue={10} // Minimum value (defaults as 0)
              maximumValue={100} // Maximum value (defaults as minimumValue + minimumRange)
              crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
              outboundColor="#E7E7E7" // The track color outside the current range value
              inboundColor="#025ED7" // The track color inside the current range value
              thumbTintColor="#025ED7" // The color of the slider's thumb
              thumbStyle={undefined} // Override the thumb's style
              trackStyle={undefined} // Override the tracks' style
              minTrackStyle={undefined} // Override the tracks' style for the minimum range
              midTrackStyle={undefined} // Override the tracks' style for the middle range
              maxTrackStyle={undefined} // Override the tracks' style for the maximum range
              enabled={true} // If false, the slider won't respond to touches anymore
              slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
              onValueChange={undefined} // Called each time the value changed. Return false to prevent the value from being updated. The type is (range: [number, number]) => boolean | void
              onSlidingStart={undefined} // Called when the slider is pressed. The type is (range: [number, number]) => void
              onSlidingComplete={undefined} // Called when the press is released. The type is (range: [number, number]) => void
              CustomThumb={({ value, thumb }) => (
                <>
                  <View
                    style={{
                      backgroundColor: "#025ED7",
                      height: 16,
                      width: 16,
                      borderRadius: 8,
                      borderWidth: 1.5,
                      borderColor: "white",
                      shadowColor: "#000", // Shadow color
                      shadowOffset: { width: 0, height: 3 }, // Horizontal and vertical shadow offset
                      shadowOpacity: 0.15, // Opacity of the shadow
                      shadowRadius: 4, //
                      elevation: 3, // Elevation gives a shadow on Android
                    }}
                  >
                    <Text style={{ fontSize: 100, color: "black" }}>
                      asdjsajdjas {value}
                    </Text>
                  </View>
                </>
              )} // Provide your own component to render the thumb. The type is a component: ({ value: number, thumb: 'min' | 'max' }) => JSX.Element
              CustomMark={({ value, active }) => (
                <Text style={{ color: "black", fontSize: 10 }}>
                  {active && value}
                </Text>
              )} // Provide your own component to render the marks. The type is a component: ({ value: number; active: boolean }) => JSX.Element ; value indicates the value represented by the mark, while active indicates wether a thumb is currently standing on the mark
              {...props} // Add any View Props that will be applied to the container (style, ref, etc)
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

            {/* <Text style={styles.sectionTitle}>Hashtags</Text>
            <View style={styles.hashtagInputContainer}>
              <Icons
                type={ICONS.HEAD_SEARCH}
                iconContainerStyle={styles.hashtagIcon}
              />
              <TextInput
                style={styles.hashtagInput}
                placeholder="#tags"
                value={hashtag}
                onChangeText={setHashtag}
              />
            </View> */}

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

      {/* DatePicker bottom sheet */}
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
    //fontWeight: "400",
  },
  accuracyTextSelected: {
    fontFamily: fonts.f700,
    fontSize: 15,
    color: Colors.textBlack,
    //fontWeight: "700",
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
    //fontWeight: "400",
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
    top: -25, // Adjust to place the value above the thumb
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
    //fontWeight: "700",
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
    //fontWeight: "400",
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
    //fontWeight: "600",
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
    // color: Colors.primaryBlue,
  },
  searchBox: {
    flex: 1,
    // height: 40,
    paddingLeft: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#101010",
    fontFamily: fonts.f400,
  },
});
