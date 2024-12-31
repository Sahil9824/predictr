// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   TouchableWithoutFeedback,
//   Pressable,
//   Platform,
// } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
// import moment from "moment";
// import { Colors, fonts } from "../constant";
// import { ICONS } from "../constant/icons.constants";
// import Icons from "./Icons";
// import { scale } from "../../helper";
// import Button from "./Button";

// const CustomDatePicker = ({
//   initialDate,
//   onDateChange,
//   closeBottomSheet,
//   fromDate,
//   toDate,
// }) => {
//   const [currentDate, setCurrentDate] = useState(
//     moment(initialDate || new Date())
//   );
//   const [currentMonth, setCurrentMonth] = useState(
//     moment(initialDate || new Date()).format("YYYY-MM-DD")
//   );
//   const [selectedYear, setSelectedYear] = useState(
//     moment(initialDate || new Date()).year()
//   );
//   const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
//   const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
//   const [dayWidth, setDayWidth] = useState(null);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const isDateSelectable = (date) => {
//     if (fromDate && moment(date).isBefore(moment(fromDate))) {
//       return false;
//     }
//     if (toDate && moment(date).isAfter(moment(toDate))) {
//       return false;
//     }
//     return true;
//   };

//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const changeMonth = (increment) => {
//     const newDate = currentDate.clone().add(increment, "months");
//     setCurrentDate(newDate);
//     setSelectedYear(newDate.year());
//   };

//   const renderDays = () => {
//     const year = currentDate.year();
//     const month = currentDate.month();
//     const firstDayOfMonth = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     let days = [];
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(
//         <View style={{ ...styles.day, width: dayWidth }} key={`empty-${i}`} />
//       );
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(year, month, day);
//       const isSelected =
//         selectedDate?.getDate() === day &&
//         selectedDate?.getMonth() === month &&
//         selectedDate?.getFullYear() === year;

//       const selectable = isDateSelectable(date);

//       days.push(
//         <TouchableOpacity
//           style={[
//             styles.day,
//             { width: dayWidth },
//             isSelected ? styles.selectedDay : null,
//             !selectable ? styles.disabledDay : null,
//           ]}
//           key={day}
//           onPress={() => selectable && setSelectedDate(date)}
//           disabled={!selectable} // Disable the button if date is not selectable
//         >
//           <Text
//             style={[
//               styles.dayText,
//               isSelected ? styles.selectedDayText : null,
//               !selectable ? styles.disabledDayText : null,
//             ]}
//           >
//             {day}
//           </Text>
//         </TouchableOpacity>
//       );
//     }

//     return days;
//   };

//   // const renderDays = () => {
//   //   const year = currentDate.year();
//   //   const month = currentDate.month();
//   //   const firstDayOfMonth = new Date(year, month, 1).getDay();
//   //   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   //   let days = [];
//   //   let week = [];

//   //   // Empty placeholders for days before the first of the month
//   //   for (let i = 0; i < firstDayOfMonth; i++) {
//   //     week.push(
//   //       <View style={{ ...styles.day, width: dayWidth }} key={`empty-${i}`} />
//   //     );
//   //   }

//   //   // Days in the month
//   //   for (let day = 1; day <= daysInMonth; day++) {
//   //     const date = new Date(year, month, day);
//   //     const isSelected =
//   //       selectedDate?.getDate() === day &&
//   //       selectedDate?.getMonth() === month &&
//   //       selectedDate?.getFullYear() === year;

//   //     const selectable = isDateSelectable(date);

//   //     week.push(
//   //       <TouchableOpacity
//   //         style={[
//   //           styles.day,
//   //           { width: dayWidth },
//   //           isSelected ? styles.selectedDay : null,
//   //           !selectable ? styles.disabledDay : null,
//   //         ]}
//   //         key={day}
//   //         onPress={() => selectable && setSelectedDate(date)}
//   //         disabled={!selectable}
//   //       >
//   //         <Text
//   //           style={[
//   //             styles.dayText,
//   //             isSelected ? styles.selectedDayText : null,
//   //             !selectable ? styles.disabledDayText : null,
//   //           ]}
//   //         >
//   //           {day}
//   //         </Text>
//   //       </TouchableOpacity>
//   //     );

//   //     // Every 7 days, push the current week array to the main array and reset
//   //     if (week.length === 7 || day === daysInMonth) {
//   //       days.push(
//   //         <View style={styles.weekRow} key={`week-${day}`}>
//   //           {week}
//   //         </View>
//   //       );
//   //       week = [];
//   //     }
//   //   }

//   //   return days;
//   // };

//   const handleSave = () => {
//     const yearToUse = selectedYear || currentDate.year();
//     const monthToUse = currentDate.month();
//     const dayToUse = selectedDate ? selectedDate.getDate() : 1;

//     const updatedDate = new Date(yearToUse, monthToUse, dayToUse);

//     if (onDateChange) {
//       onDateChange(updatedDate);
//     }

//     closeBottomSheet();
//   };

//   const renderYearPicker = () => {
//     const years = Array.from(
//       { length: 50 },
//       (_, i) => moment().year() - 25 + i
//     );

//     return (
//       <Modal
//         visible={isYearPickerVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setIsYearPickerVisible(false)}
//         statusBarTranslucent
//       >
//         <TouchableWithoutFeedback onPress={() => setIsYearPickerVisible(false)}>
//           <View style={styles.modalBackground}>
//             <TouchableWithoutFeedback>
//               <View style={styles.yearPickerContainer}>
//                 <FlatList
//                   data={years}
//                   keyExtractor={(item) => item.toString()}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       style={[
//                         styles.yearItem,
//                         item === selectedYear ? styles.selectedYearItem : null,
//                       ]}
//                       onPress={() => {
//                         setSelectedYear(item);
//                         setIsYearPickerVisible(false);
//                         setSelectedDate(new Date(item, currentDate.month(), 1));
//                       }}
//                     >
//                       <Text style={styles.yearText}>{item}</Text>
//                     </TouchableOpacity>
//                   )}
//                   initialScrollIndex={years.indexOf(selectedYear)}
//                   getItemLayout={(data, index) => ({
//                     length: 40,
//                     offset: 40 * index,
//                     index,
//                   })}
//                   onScrollToIndexFailed={(info) => {
//                     console.warn(`Failed to scroll to index: ${info.index}`);
//                   }}
//                 />
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 10,
//         }}
//       >
//         <Text style={styles.title}>Pick a Date</Text>
//         <TouchableOpacity onPress={closeBottomSheet}>
//           <Icons type={ICONS.CLOSE} onClick={closeBottomSheet} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.header}>
//         {/* Month and Year Text */}
//         <TouchableOpacity
//           style={{ flexDirection: "row", alignItems: "center" }}
//           onPress={() => setIsYearPickerVisible(true)}
//         >
//           <Text style={styles.monthText}>
//             {months[currentDate.month()]} {selectedYear}
//           </Text>
//           <Icons type={ICONS.CAL_CHANGE} />
//         </TouchableOpacity>

//         {/* Month Navigation Arrows */}
//         <View style={styles.arrowContainer}>
//           <TouchableWithoutFeedback
//             onPress={() => changeMonth(-1)}
//             style={{ ...styles.arrow, transform: [{ rotate: "180deg" }] }}
//           >
//             <Icons type={ICONS.PREVIOUS} />
//           </TouchableWithoutFeedback>

//           <TouchableWithoutFeedback
//             onPress={() => changeMonth(1)}
//             style={styles.arrow}
//           >
//             <Icons type={ICONS.NEXT} />
//           </TouchableWithoutFeedback>
//         </View>
//       </View>

//       {/* Week Days */}
//       <View style={styles.weekDaysContainer}>
//         {daysOfWeek.map((day, index) => (
//           <Text
//             onLayout={(event) => {
//               const { width } = event.nativeEvent.layout;
//               setDayWidth(width);
//             }}
//             style={styles.weekDay}
//             key={index}
//           >
//             {day}
//           </Text>
//         ))}
//       </View>

//       {/* Days */}
//       <View style={styles.daysContainer}>{renderDays()}</View>

//       <Button
//         text="Save"
//         style={{ marginTop: 12 }}
//         onPress={handleSave}
//         inActive={!selectedDate}
//         inActiveColor="#717272"
//       />

//       {renderYearPicker()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 5,
//   },
//   title: {
//     fontFamily: fonts.f700,
//     fontSize: scale(17),
//     //fontWeight: "700",
//     textAlign: "left",
//     color: Colors.labelBlack,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     justifyContent: "space-between",
//     marginTop: 15,
//   },
//   monthText: {
//     fontFamily: fonts.f600,
//     fontSize: scale(17),
//     //fontWeight: "600",
//     marginEnd: 8,
//     color: "#000000",
//   },
//   arrowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 28,
//   },
//   arrow: {
//     justifyContent: "center",
//   },
//   weekDaysContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   weekDay: {
//     width: 44,
//     textAlign: "center",
//     color: "#3C3C434D",
//     fontSize: scale(13),
//     fontFamily: fonts.f600,
//   },
//   daysContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: "10%",
//   },
//   day: {
//     width: 44,
//     height: 44,
//     alignItems: "center",
//     justifyContent: "center",
//     margin: Platform.OS === "ios" ? -1 : scale(3),
//   },
//   selectedDay: {
//     backgroundColor: "#e0efff",
//     width: scale(41.5),
//     height: scale(41.5),
//     borderRadius: scale(41.5 / 2),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dayText: {
//     color: "#000",
//     fontSize: scale(14),
//     fontFamily: fonts.f400,
//   },
//   selectedDayText: {
//     fontFamily: fonts.f500,
//     color: "#007AFF",
//     fontSize: 24,
//   },
//   disabledDay: {
//     backgroundColor: "#f0f0f0",
//   },
//   disabledDayText: {
//     color: "#d0d0d0",
//   },
//   saveButton: {
//     backgroundColor: Colors.primaryBlue,
//     paddingVertical: scale(10),
//     borderRadius: scale(8),
//     marginHorizontal: scale(10),
//     marginTop: scale(15),
//     alignItems: "center",
//   },
//   disabledSaveButton: {
//     backgroundColor: "#B0B0B0",
//   },
//   saveButtonText: {
//     color: "white",
//     fontSize: scale(14),
//     fontFamily: fonts.f600,

//     //fontWeight: "600",
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   yearPickerContainer: {
//     backgroundColor: "white",
//     marginHorizontal: scale(70),
//     borderRadius: scale(10),
//     padding: scale(20),
//     maxHeight: "40%",
//   },
//   yearItem: {
//     paddingVertical: scale(10),
//     alignItems: "center",
//   },
//   selectedYearItem: {
//     backgroundColor: "#e0efff",
//     borderRadius: scale(10),
//   },
//   yearText: {
//     fontSize: scale(18),
//     color: "#000",
//     fontFamily: fonts.f500,
//   },
//   weekRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });

// export default CustomDatePicker;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";
import { Colors, fonts } from "../constant";
import { ICONS } from "../constant/icons.constants";
import Icons from "./Icons";
import { scale } from "../../helper";
import Button from "./Button";

const CustomDatePicker = ({
  initialDate,
  onDateChange,
  closeBottomSheet,
  fromDate,
  toDate,
}) => {
  const [currentDate, setCurrentDate] = useState(
    moment(initialDate || new Date())
  );
  const [currentMonth, setCurrentMonth] = useState(
    moment(initialDate || new Date()).format("YYYY-MM-DD")
  );
  const [selectedYear, setSelectedYear] = useState(
    moment(initialDate || new Date()).year()
  );
  const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
  const [dayWidth, setDayWidth] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to check if a date is selectable based on fromDate and toDate
  const isDateSelectable = (date) => {
    if (fromDate && moment(date).isBefore(moment(fromDate))) {
      return false;
    }
    if (toDate && moment(date).isAfter(moment(toDate))) {
      return false;
    }
    return true;
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const changeMonth = (increment) => {
    const newDate = currentDate.clone().add(increment, "months");
    setCurrentDate(newDate);
    setSelectedYear(newDate.year());
  };

  const renderDays = () => {
    const year = currentDate.year();
    const month = currentDate.month();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <View style={{ ...styles.day, width: dayWidth }} key={`empty-${i}`} />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        selectedDate?.getDate() === day &&
        selectedDate?.getMonth() === month &&
        selectedDate?.getFullYear() === year;

      const selectable = isDateSelectable(date);

      days.push(
        <TouchableOpacity
          style={[
            styles.day,
            { width: dayWidth },
            isSelected ? styles.selectedDay : null,
            !selectable ? styles.disabledDay : null,
          ]}
          key={day}
          onPress={() => selectable && setSelectedDate(date)}
          disabled={!selectable} // Disable the button if date is not selectable
        >
          <Text
            style={[
              styles.dayText,
              isSelected ? styles.selectedDayText : null,
              !selectable ? styles.disabledDayText : null,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const handleSave = () => {
    const yearToUse = selectedYear || currentDate.year();
    const monthToUse = currentDate.month();
    const dayToUse = selectedDate ? selectedDate.getDate() : 1;

    const updatedDate = new Date(yearToUse, monthToUse, dayToUse);

    if (onDateChange) {
      onDateChange(updatedDate);
    }

    closeBottomSheet();
  };

  const renderYearPicker = () => {
    const years = Array.from(
      { length: 50 },
      (_, i) => moment().year() - 25 + i
    );

    return (
      <Modal
        visible={isYearPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsYearPickerVisible(false)}
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={() => setIsYearPickerVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.yearPickerContainer}>
                <FlatList
                  data={years}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.yearItem,
                        item === selectedYear ? styles.selectedYearItem : null,
                      ]}
                      onPress={() => {
                        setSelectedYear(item);
                        setIsYearPickerVisible(false);
                        setSelectedDate(new Date(item, currentDate.month(), 1));
                      }}
                    >
                      <Text style={styles.yearText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  initialScrollIndex={years.indexOf(selectedYear)}
                  getItemLayout={(data, index) => ({
                    length: 40,
                    offset: 40 * index,
                    index,
                  })}
                  onScrollToIndexFailed={(info) => {
                    console.warn(`Failed to scroll to index: ${info.index}`);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.title}>Pick a Date</Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <Icons type={ICONS.CLOSE} onClick={closeBottomSheet} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        {/* Month and Year Text */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setIsYearPickerVisible(true)}
        >
          <Text style={styles.monthText}>
            {months[currentDate.month()]} {selectedYear}
          </Text>
          <Icons type={ICONS.CAL_CHANGE} />
        </TouchableOpacity>

        {/* Month Navigation Arrows */}
        <View style={styles.arrowContainer}>
          <TouchableWithoutFeedback
            onPress={() => changeMonth(-1)}
            style={{ ...styles.arrow, transform: [{ rotate: "180deg" }] }}
          >
            <Icons type={ICONS.PREVIOUS} />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => changeMonth(1)}
            style={styles.arrow}
          >
            <Icons type={ICONS.NEXT} />
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* Week Days */}
      <View style={styles.weekDaysContainer}>
        {daysOfWeek.map((day, index) => (
          <Text
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setDayWidth(width);
            }}
            style={styles.weekDay}
            key={index}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Days */}
      <View style={styles.daysContainer}>{renderDays()}</View>

      <Button
        text="Save"
        style={{ marginTop: 12 }}
        onPress={handleSave}
        inActive={!selectedDate}
        inActiveColor="#717272"
      />

      {renderYearPicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  title: {
    fontFamily: fonts.f700,
    fontSize: scale(17),
    //fontWeight: "700",
    textAlign: "left",
    color: Colors.labelBlack,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
    marginTop: 15,
  },
  monthText: {
    fontFamily: fonts.f600,
    fontSize: scale(17),
    //fontWeight: "600",
    marginEnd: 8,
    color: "#000000",
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 28,
  },
  arrow: {
    justifyContent: "center",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDay: {
    width: 44,
    textAlign: "center",
    color: "#3C3C434D",
    fontSize: scale(13),
    fontFamily: fonts.f600,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10%",
  },
  day: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    margin: Platform.OS === "ios" ? -1 : scale(3),
  },
  selectedDay: {
    backgroundColor: "#e0efff",
    width: scale(41.5),
    height: scale(41.5),
    borderRadius: scale(41.5 / 2),
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    color: "#000",
    fontSize: scale(14),
    fontFamily: fonts.f400,
  },
  selectedDayText: {
    fontFamily: fonts.f500,
    color: "#007AFF",
    fontSize: 24,
  },
  disabledDay: {
    backgroundColor: "#f0f0f0",
  },
  disabledDayText: {
    color: "#d0d0d0",
  },
  saveButton: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: scale(10),
    borderRadius: scale(8),
    marginHorizontal: scale(10),
    marginTop: scale(15),
    alignItems: "center",
  },
  disabledSaveButton: {
    backgroundColor: "#B0B0B0",
  },
  saveButtonText: {
    color: "white",
    fontSize: scale(14),
    fontFamily: fonts.f600,
    //fontWeight: "600",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  yearPickerContainer: {
    backgroundColor: "white",
    marginHorizontal: scale(70),
    borderRadius: scale(10),
    padding: scale(20),
    maxHeight: "40%",
  },
  yearItem: {
    paddingVertical: scale(10),
    alignItems: "center",
  },
  selectedYearItem: {
    backgroundColor: "#e0efff",
    borderRadius: scale(10),
  },
  yearText: {
    fontSize: scale(18),
    color: "#000",
    fontFamily: fonts.f500,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CustomDatePicker;
