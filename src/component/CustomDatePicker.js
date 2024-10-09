import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from '../constant';
import { ICONS } from '../constant/icons.constants';
import Icons from './Icons';

const CustomDatePicker = ({ initialDate, onDateChange, closeBottomSheet }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate ? initialDate.toISOString().split('T')[0] : '');

  const onDayPress = (day) => {
    const newDate = day.dateString; 
    setSelectedDate(newDate);
  };

  const handleSave = () => {
    if (onDateChange) {
      onDateChange(selectedDate); 
    }
    closeBottomSheet(); 
  };


  useEffect(() => {
    console.log('Selected Date:', selectedDate);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
          <Text style={styles.title}>Pick a Date</Text>
          <TouchableOpacity onPress={closeBottomSheet}>
            <Icons type={ICONS.CLOSE} />
          </TouchableOpacity>
        </View>

        <Calendar
          current={selectedDate || new Date().toISOString().split('T')[0]} 
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#e0efff',
              dotColor: 'blue',
              selectedTextColor: '#007aff',
            },
          }}
          theme={{
            textSectionTitleColor: 'black',
            selectedDayBackgroundColor: '#007bff',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            arrowColor: '#007bff',
            monthTextColor: 'black',
            dayTextColor: '#3C3C43',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
          }}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
    color: Colors.labelBlack
  },
  saveButton: {
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomDatePicker;
