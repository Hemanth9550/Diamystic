import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, Dimensions, ScrollView } from 'react-native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const DoctorSignUp = ({ navigation }) => {
  const [doctorId, setDoctorId] = useState('');
  const [doctorname, setDoctorname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleSignUp = async () => {
    // Perform validation for Doctor ID
    if (!doctorId.startsWith('DOCT')) {
      Alert.alert('Invalid Doctor ID, Doctor ID must Start with DOCT');
      return;
    }

    // Perform other validations, e.g., checking if passwords match, etc.
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please re-enter.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('doctorId', doctorId);
      formData.append('doctorname', doctorname);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('phoneNo', phoneNo);
      formData.append('email', email);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('experience', experience);
      formData.append('specialization', specialization);

      const response = await fetch(`${API_BASE_URL}/signupd.php`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status === 'success') {
        Alert.alert('Sign Up Successful', 'Account created successfully.');
        navigation.navigate('DoctorLogin'); // Navigate to login screen
      } else {
        Alert.alert('Sign Up Failed', 'Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      Alert.alert('Error', 'An error occurred during sign up. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.keyboardAvoidingContainer}>
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={setDoctorId}
            value={doctorId}
            placeholder="Doctor ID"
            placeholderTextColor="#ccc"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={setDoctorname}
            value={doctorname}
            placeholder="Doctor Name"
            placeholderTextColor="#ccc"
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNo}
            value={phoneNo}
            placeholder="Phone Number"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={setGender}
            value={gender}
            placeholder="Gender"
            placeholderTextColor="#ccc"
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            onChangeText={setAge}
            value={age}
            placeholder="Age"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setExperience}
            value={experience}
            placeholder="Experience (in years)"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSpecialization}
            value={specialization}
            placeholder="Specialization"
            placeholderTextColor="#ccc"
            autoCapitalize="words"
          />
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
    color: '#333',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: height * 0.06,
    fontSize: width * 0.045,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  signupButton: {
    width: '80%',
    height: height * 0.06,
    backgroundColor: '#6EBFF9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default DoctorSignUp;
