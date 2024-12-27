import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const PatientLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      console.log('Logging in with:', { id, password });

      const response = await fetch(`${API_BASE_URL}/Loginp.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId: id, password }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.status === 'success') {
        console.log('Login successful:', data);
        navigation.navigate('PatDashboard', {
          id: data.loginId,
          name: data.name,
          mail: data.mail,
          P_Id: data.P_Id,
          doctorId: data.doctorId,
          age: data.age,
          mob: data.mob,
          occupation: data.occupation,
        });
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Error', 'An error occurred during login. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('WelcomeScreen')}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>WELCOME</Text>
      <View style={styles.outerBox}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setId}
              value={id}
              placeholder="Patient ID"
              placeholderTextColor="#ccc"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    width: width,
    height: height,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your design
    left: 20, // Adjust based on your design
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  outerBox: {
    width: '80%',
    backgroundColor: '#6EBFF9',
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 25,
    marginBottom: 30,
    borderRadius: 35,
    backgroundColor: 'white',
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'black',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#6EBFF9',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PatientLogin;
