import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import { Colors } from '../constant';
import { ICONS } from '../constant/icons.constants';
import Icons from './Icons';
import { scale } from '../../helper';

const CustomDatePicker = ({ initialDate, onDateChange, closeBottomSheet }) => {
  const [currentDate, setCurrentDate] = useState(moment(initialDate || new Date()));
  const [currentMonth, setCurrentMonth] = useState(moment(initialDate || new Date()).format('YYYY-MM-DD'));
  const [selectedYear, setSelectedYear] = useState(moment(initialDate || new Date()).year());
  const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const changeMonth = (increment) => {
    const newDate = currentDate.clone().add(increment, 'months');
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
      days.push(<View style={styles.day} key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;

      days.push(
        <TouchableOpacity
          style={[styles.day, isSelected ? styles.selectedDay : null]}
          key={day}
          onPress={() => setSelectedDate(new Date(year, month, day))}
        >
          <Text style={[styles.dayText, isSelected ? styles.selectedDayText : null]}>
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
    const years = Array.from({ length: 50 }, (_, i) => moment().year() - 25 + i);

    return (
      <Modal
        visible={isYearPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsYearPickerVisible(false)}
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
                  getItemLayout={(data, index) => (
                    { length: 40, offset: 40 * index, index }
                  )}
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
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
        <Text style={styles.title}>Pick a Date</Text>
        <TouchableOpacity style={{ paddingHorizontal: 10}} onPress={closeBottomSheet}>
          <View style={{ paddingEnd: 5, alignItems: 'center' }}>
            <Icons type={ICONS.CLOSE} onClick={closeBottomSheet}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        {/* Month and Year Text */}
        <TouchableOpacity
          style={{ flexDirection: "row", }}
          onPress={() => setIsYearPickerVisible(true)}
        >
          <Text style={styles.monthText}>
            {months[currentDate.month()]} {selectedYear}
          </Text>
          <Icons type={ICONS.NEXT} />
        </TouchableOpacity>

        {/* Month Navigation Arrows */}
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.arrow}>
            <Icons type={ICONS.PREVIOUS} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.arrow}>
            <Icons type={ICONS.NEXT} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Week Days */}
      <View style={styles.weekDaysContainer}>
        {daysOfWeek.map((day, index) => (
          <Text style={styles.weekDay} key={index}>
            {day}
          </Text>
        ))}
      </View>

      {/* Days */}
      <View style={styles.daysContainer}>
        {renderDays()}
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          !selectedDate ? styles.disabledSaveButton : null
        ]}
        onPress={handleSave}
        disabled={!selectedDate}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      {renderYearPicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(5),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scale(16),
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: scale(10),
    color: Colors.labelBlack,
    paddingStart: scale(11)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
    justifyContent: 'space-between',
    paddingStart: scale(10),
    marginTop: scale(15)
  },
  monthText: {
    fontSize: scale(15),
    fontWeight: '600',
    marginEnd: scale(8),
    color: '#000000',
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  arrow: {
    paddingHorizontal: scale(5),  
    justifyContent: 'center',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: scale(8),
  },
  weekDay: {
    width: scale(35.5),  
    textAlign: 'center',
    fontWeight: '600',
    color: '#8E8E93',
    fontSize: scale(13),
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(5),  
  },
  day: {
    width: scale(41.5),  
    height: scale(41.5),
    alignItems: 'center',
    justifyContent: 'center',
    margin: scale(3),
  },
  selectedDay: {
    backgroundColor: '#e0efff',
    width: scale(41.5),
    height: scale(41.5),
    borderRadius: scale(41.5 / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#000',
    fontSize: scale(14),
  },
  selectedDayText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: scale(10),
    borderRadius: scale(8),
    marginHorizontal: scale(10),
    marginTop: scale(15),
    alignItems: 'center',
  },
  disabledSaveButton: {
    backgroundColor: '#B0B0B0',
  },
  saveButtonText: {
    color: 'white',
    fontSize: scale(14),
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  yearPickerContainer: {
    backgroundColor: 'white',
    marginTop: scale(150),
    marginHorizontal: scale(70),
    borderRadius: scale(10),
    padding: scale(20),
    maxHeight: '40%',
  },
  yearItem: {
    paddingVertical: scale(10),
    alignItems: 'center',
  },
  selectedYearItem: {
    backgroundColor: '#e0efff',
    borderRadius: scale(10),
  },
  yearText: {
    fontSize: scale(18),
    color: '#000',
  },
});



export default CustomDatePicker;