import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from './config';

const Anthro = ({ route }) => {
  const { P_Id, age } = route.params; // Receive P_Id and age passed from PatientDetails
  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waistCircumference, setWaistCircumference] = useState('');
  const [hipCircumference, setHipCircumference] = useState('');
  const [whr, setWhr] = useState('');
  const [bmi, setBmi] = useState('');
  const [beforeFood, setBeforeFood] = useState('');
  const [afterFood, setAfterFood] = useState('');
  const [srUrea, setSrUrea] = useState('');
  const [srCreatine, setSrCreatine] = useState('');
  const [hba1c, setHba1c] = useState(''); // Changed from eoa to hba1c
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]); // Store selected date in YYYY-MM-DD format
    hideDatePicker();
  };

  useEffect(() => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(`${calculatedBmi.toFixed(2)} (${getBmiCategory(calculatedBmi)})`);
    }

    if (waistCircumference && hipCircumference) {
      const calculatedWhr = parseFloat(waistCircumference) / parseFloat(hipCircumference);
      setWhr(calculatedWhr.toFixed(2));
    }
  }, [height, weight, waistCircumference, hipCircumference]);

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
  };

  const addDetails = () => {
    const data = {
      P_Id: P_Id,
      height: height,
      weight: weight,
      waistCircumference: waistCircumference,
      hipCircumference: hipCircumference,
      whr: whr,
      bmi: bmi,
      beforeFood: beforeFood,
      afterFood: afterFood,
      srUrea: srUrea,
      srCreatine: srCreatine,
      hba1c: hba1c, // Changed from eoa to hba1c
      date: selectedDate
    };

    fetch(`${API_BASE_URL}/medic.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseJson => {
      setShowSuccessMessage(true); // Display success message
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after 2 seconds
        navigation.goBack(); // Navigate back to previous screen
      }, 2000); // Delay for 2 seconds before hiding success message
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // Display error message
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#6EBFF9' },
      headerStatusBarHeight: 20,
      headerTitle: '',
      marginBottom: 0,
      headerTitleStyle: { textAlign: 'center', flexGrow: 1, color: 'white' },
      headerTintColor: 'white',
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Text style={styles.dateButtonText}>Select Date</Text>
      </TouchableOpacity>
      {selectedDate ? <Text style={styles.dateText}>Selected Date: {selectedDate}</Text> : null}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.heading}>Anthropometry</Text>
      <View style={styles.row}>
        <View style={[styles.box, styles.anthroBox]}>
          <Text style={styles.boxText}>Height (cm)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Height"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.box, styles.anthroBox]}>
          <Text style={styles.boxText}>Weight (kg)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.box, styles.anthroBox]}>
          <Text style={styles.boxText}>Waist Circumference (cm)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Waist Circumference"
            value={waistCircumference}
            onChangeText={setWaistCircumference}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.box, styles.anthroBox]}>
          <Text style={styles.boxText}>Hip Circumference (cm)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Hip Circumference"
            value={hipCircumference}
            onChangeText={setHipCircumference}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.box, styles.anthroBox]}>
          <Text style={styles.boxText}>WHR</Text>
          <TextInput
            style={styles.textInput}
            placeholder="WHR"
            value={whr}
            editable={false}
          />
        </View>
        <View style={[styles.box, styles.anthroBox]}>
          <Text style={styles.boxText}>BMI (Category)</Text>
          <TextInput
            style={[styles.textInput, styles.bmiTextInput]}
            placeholder="BMI"
            value={bmi}
            editable={false}
          />
        </View>
      </View>

      <Text style={styles.heading}>Blood Glucose Values</Text>
      <View style={styles.row}>
        <View style={[styles.box, styles.bloodBox]}>
          <Text style={styles.boxText}>Blood Sugar Level (Before Food)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Level"
            value={beforeFood}
            onChangeText={setBeforeFood}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.box, styles.bloodBox]}>
          <Text style={styles.boxText}>Blood Sugar Level (After Food)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Level"
            value={afterFood}
            onChangeText={setAfterFood}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Text style={styles.heading}>Lab Values</Text>

      <View style={styles.row}>
        <View style={[styles.box, styles.boxLarge]}>
          <Text style={styles.boxText}>Sr.Urea</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Sr.Urea"
            value={srUrea}
            onChangeText={setSrUrea}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.box, styles.boxLarge]}>
          <Text style={styles.boxText}>Sr.Creatine</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Sr.Creatine"
            value={srCreatine}
            onChangeText={setSrCreatine}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.box, styles.boxLarge]}>
          <Text style={styles.boxText}>Hba1c</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Hba1c"
            value={hba1c}
            onChangeText={setHba1c}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={addDetails}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>Details added successfully!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  dateButton: {
    backgroundColor: '#6EBFF9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  dateText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  anthroBox: {
    flex: 1,
    maxWidth: '45%',
  },
  bloodBox: {
    flex: 1,
    maxWidth: '45%',
  },
  boxLarge: {
    flex: 1,
    maxWidth: '100%',
  },
  boxText: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  bmiTextInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
  },
  submitButton: {
    backgroundColor: '#6EBFF9',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  successMessage: {
    backgroundColor: 'rgba(0, 128, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  successMessageText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Anthro;
