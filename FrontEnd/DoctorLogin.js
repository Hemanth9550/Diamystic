import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import LinearGradient from 'react-native-linear-gradient';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const DoctorLogin = () => {
  const [doctorId, setDoctorId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Logind.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        console.log('Login successful');
        navigation.navigate('DocDashboard', { doctorId, doctorname: data.doctorname, email: data.email }); // Pass email along with doctorId and doctorname
      } else {
        console.error('Login failed:', data.message);
        Alert.alert('Login Failed', 'Invalid doctor ID or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  };

  const handleSignupPress = () => {
    navigation.navigate('DoctorSignUp');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('WelcomeScreen')}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>WELCOME</Text>
      <LinearGradient colors={['#e0f7fa', '#80deea']} style={styles.outerBox}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setDoctorId}
              value={doctorId}
              placeholder="Doctor ID"
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
      </LinearGradient>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignupPress}>
        <Text style={styles.signupText}>Don't have an account? Sign up here</Text>
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
    padding: width * 0.05,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your design
    left: 20, // Adjust based on your design
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  outerBox: {
    width: '85%',
    padding: width * 0.05,
    marginTop: height * 0.03,
    marginBottom: height * 0.03,
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
    marginTop: height * 0.025,
    marginBottom: height * 0.03,
    borderRadius: 35,
    backgroundColor: 'white',
    width: '100%',
  },
  input: {
    height: height * 0.06,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: width * 0.05,
    fontSize: width * 0.04,
    color: 'black',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#6EBFF9',
    borderRadius: 35,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: height * 0.02,
  },
  signupText: {
    fontSize: width * 0.04,
    color: '#6EBFF9',
    textDecorationLine: 'underline',
  },
});

export default DoctorLogin;
