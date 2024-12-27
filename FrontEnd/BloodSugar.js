import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import API_BASE_URL from './config';

const BloodSugar = () => {
  const route = useRoute();
  const { id, P_Id, name, mail } = route.params; // Access passed params
  const [newValues, setNewValues] = useState({
    beforeFood: '',
    afterFood: ''
  });
  const [recentData, setRecentData] = useState({
    beforeFood: '',
    afterFood: '',
    date: ''
  });
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Log params to ensure P_Id is passed correctly
    console.log('Received params:', { id, P_Id, name, mail });
    fetchRecentData();
  }, []);

  const handleNewChange = (name, value) => {
    setNewValues({ ...newValues, [name]: value });
  };

  const handleSubmit = async () => {
    const data = {
      P_Id: P_Id,
      beforefood: newValues.beforeFood,
      afterfood: newValues.afterFood,
      date: date.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
    };

    try {
      const response = await fetch(`${API_BASE_URL}//bs.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (responseData.success) {
        setRecentData({
          beforeFood: data.beforefood,
          afterFood: data.afterfood,
          date: data.date
        });
        setNewValues({ beforeFood: '', afterFood: '' });
        Alert.alert('Success', 'New record added successfully.');
      } else {
        console.error('Server Error:', responseData.message);
        Alert.alert('Error', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Failed to submit data. Please try again later.');
    }
  };

  const fetchRecentData = async () => {
    try {
      console.log(`Fetching data from: ${API_BASE_URL}/bs1.php?P_Id=${P_Id}`);
      const response = await fetch(`${API_BASE_URL}/bs1.php?P_Id=${P_Id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Recent Data:', responseData);

      setRecentData({
        beforeFood: responseData.beforefood,
        afterFood: responseData.afterfood,
        date: responseData.date
      });
    } catch (error) {
      console.error('Error fetching recent data:', error.message);
      Alert.alert('Error', 'Failed to fetch recent data. Please try again later.');
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Name: {name}</Text>
        <Text style={styles.profileText}>Email: {mail}</Text>
        <Text style={styles.profileText}>Patient ID: {P_Id}</Text>
      </View>

      <View style={styles.recentDataContainer}>
        <Text style={styles.recentDataLabel}>Recent Values:</Text>
        <Text style={styles.recentDataText}>Date: {recentData.date}</Text>
        <Text style={styles.recentDataText}>Before Food: {recentData.beforeFood}</Text>
        <Text style={styles.recentDataText}>After Food: {recentData.afterFood}</Text>
      </View>

      <Text style={styles.sectionTitle}>Add New Values</Text>

      <View style={styles.formGroup}>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.subLabel}>Before Food:</Text>
            <TextInput
              style={styles.input}
              value={newValues.beforeFood}
              onChangeText={(value) => handleNewChange('beforeFood', value)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.subLabel}>After Food:</Text>
            <TextInput
              style={styles.input}
              value={newValues.afterFood}
              onChangeText={(value) => handleNewChange('afterFood', value)}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.datePickerContainer}>
          <Button onPress={showDatePicker} title="Pick Date" />
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  recentDataContainer: {
    marginBottom: 20,
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 8,
  },
  recentDataLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b',
  },
  recentDataText: {
    fontSize: 16,
    color: '#004d40',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#00796b',
  },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default BloodSugar;
