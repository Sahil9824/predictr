import React, { useState, forwardRef, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { Colors, fonts } from "../constant";
import { scale } from "../../helper";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import Icons from "../component/Icons";
import { ICONS } from "../constant/icons.constants";
import CustomDatePicker from './CustomDatePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import { useNavigation } from "@react-navigation/native";
import { APP_NAVIGATION, SCREENS } from "../constant/navigation.constants";


const FilterCard = forwardRef((props, ref) => {
    const [selectedAccuracy, setSelectedAccuracy] = useState(null);
    const [manualAccuracy, setManualAccuracy] = useState("");
    const [dateRange, setDateRange] = useState({ from: null, to: null });
    const [showCustomDatePicker, setShowCustomDatePicker] = useState({ from: false, to: false });
    const [hashtag, setHashtag] = useState("");
    const [isReset, setIsReset] = useState(false);
    const datePickerRef = useRef<BottomSheetModal>(null);

    const navigation = useNavigation();

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    );

    const formatDate = (date) => {
        if (!date || !(date instanceof Date)) return "";
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
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
        setManualAccuracy('');
    };

    const handleSave = () => {
        if (dateRange.from && dateRange.to && (selectedAccuracy || manualAccuracy.trim())) {
          const filteredOptions = {
            accuracy: selectedAccuracy || manualAccuracy,
            from: dateRange.from.toISOString(),
            to: dateRange.to.toISOString(),
            tags: hashtag || '',
          };
          setIsReset(false);
          closeBottomSheet(); 
          ref.current?.close();
          navigation.navigate(SCREENS.HOME, { filteredOptions, isReset });
        }
      };
      
      
    const clearStates = () => {
        setIsReset(true);
        setSelectedAccuracy(null);
        setManualAccuracy("");
        setDateRange({ from: null, to: null });
        setHashtag("");
        props.onFilterReset && props.onFilterReset();
        props.isReset
    };

    const closeBottomSheet = () => {
        datePickerRef.current?.dismiss()
    };

    const isSaveButtonEnabled = dateRange.from && dateRange.to && (selectedAccuracy || manualAccuracy.trim());
    const isResetVisible = dateRange.from || dateRange.to || selectedAccuracy || manualAccuracy.trim();

    return (
        <>
        <BottomSheetModal
            backdropComponent={renderBackdrop}
            ref={ref}
            onDismiss={() => clearStates}
            handleIndicatorStyle={{
                width: 65,
                height: 5,
                backgroundColor: "#B3B3B3",
            }}
            style={styles.bottomSheet}
            snapPoints={Platform.OS === 'android' ? ["77%", "90%"] : ["67%", "90%"]}
            enableContentPanningGesture={false}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                extraHeight={Platform.OS === 'ios' ? 120 : 90} 
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
                    <Text style={styles.sectionTitle}>Accuracy (%)</Text>
                    <TextInput
                        style={styles.accuracyInput}
                        placeholder="Enter Manual Accuracy"
                        value={manualAccuracy}
                        onChangeText={handleManualAccuracyChange}
                        keyboardType="numeric"
                    />

                    <View style={styles.accuracyOptions}>
                        {["30-50%", "50-70%", "70% & up"].map((range) => (
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

                    <Text style={styles.sectionTitle}>Date Range</Text>
                    <View style={styles.dateRangeContainer}>
                        <TouchableOpacity onPress={() => openDatePicker('from')} style={styles.dateInputContainer}>
                            <Text style={styles.dateInput}>
                                {formatDate(dateRange.from) || "From"}
                            </Text>
                            <Icons type={ICONS.CALENDAR} iconContainerStyle={styles.calendarIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => openDatePicker('to')} style={styles.dateInputContainer}>
                            <Text style={styles.dateInput}>
                                {formatDate(dateRange.to) || "To"}
                            </Text>
                            <Icons type={ICONS.CALENDAR} iconContainerStyle={styles.calendarIcon} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>Hashtags</Text>
                    <View style={styles.hashtagInputContainer}>
                        <Icons type={ICONS.SEARCH} iconContainerStyle={styles.hashtagIcon} />
                        <TextInput
                            style={styles.hashtagInput}
                            placeholder="#tags"
                            value={hashtag}
                            onChangeText={setHashtag}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleSave}
                            style={[
                                styles.applyButton,
                                { backgroundColor: isSaveButtonEnabled ? Colors.primaryBlue : '#717272' },
                            ]}
                            disabled={!isSaveButtonEnabled}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </BottomSheetModal>

        {/* DatePicker bottom sheet */}
            <BottomSheetModal
                ref={datePickerRef}
                index={0}
                snapPoints={Platform.OS === 'android' ? ["63%"] : ["58%"]}
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
                    />
                )}
                {showCustomDatePicker.to && (
                    <CustomDatePicker
                        initialDate={dateRange.to}
                        onDateChange={(date) => handleCustomDateChange(date, "to")}
                        closeBottomSheet={() => datePickerRef.current?.dismiss()}
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
        paddingBottom: scale(10),
    },
    filterText: {
        fontFamily: fonts.f700,
        fontSize: scale(17),
        color: Colors.textBlack,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: scale(15),
        color: Colors.textBlack,
        marginVertical: scale(4),
        fontWeight: '600'
    },
    accuracyInput: {
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: 7,
        paddingStart: scale(10),
        height: scale(49)
    },
    accuracyOptions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: scale(6),
    },
    accuracyButton: {
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        paddingVertical: scale(12),
        paddingHorizontal: scale(25),
        marginHorizontal: scale(2),
        borderRadius: 8,
    },
    accuracyButtonSelected: {
        backgroundColor: '#e9f1fc',
        borderColor: Colors.primaryBlue,

    },
    accuracyText: {
        fontFamily: fonts.f400,
        fontSize: scale(14),
        color: Colors.textBlack,
    },
    accuracyTextSelected: {
        color: Colors.textBlack,
        fontWeight: 'bold'
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
        marginBottom: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(15),
    },
    dateInput: {
        flex: 1,
        fontFamily: fonts.f400,
        fontSize: scale(14),
        color: Colors.textGrey,
    },
    calendarIcon: {
        width: scale(20),
        height: scale(20),
        tintColor: Colors.textGrey,
    },
    buttonContainer: {
        paddingBottom: scale(20),
        paddingTop: scale(5),
        width: '100%',
        marginBottom: scale(10)
    },
    applyButton: {
        backgroundColor: Colors.primaryBlue,
        paddingVertical: scale(10),
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        fontFamily: fonts.f700,
        fontSize: scale(16),
        color: Colors.white,
    },
    bottomSheet: {
        paddingHorizontal: scale(16),
        paddingTop: scale(16),
        paddingBottom: scale(24),
        borderRadius: 24,
        overflow: "hidden",
    },
    hashtagInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: 10,
        paddingHorizontal: scale(10),
        paddingVertical: scale(2),
        marginBottom: scale(10),
    },
    hashtagInput: {
        flex: 1,
        fontFamily: fonts.f400,
        fontSize: scale(14),
        color: Colors.textGrey,
        marginLeft: scale(10),
        height: scale(44)
    },
    hashtagIcon: {
        width: scale(20),
        height: scale(20),
        tintColor: Colors.textGrey,
    },
    datePickerBottomSheet: {
        paddingHorizontal: scale(16),
        paddingTop: scale(16),
        paddingBottom: scale(24),
        borderRadius: 24,
        overflow: "hidden",
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: scale(10),
    },
    resetButtonText: {
        fontFamily: fonts.f600,
        fontSize: scale(16),
        color: Colors.primaryBlue,
    },
});
