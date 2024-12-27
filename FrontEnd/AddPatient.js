import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import API_BASE_URL from './config';
export default function AddPatient() {
  const navigation = useNavigation();
  const route = useRoute();
  const { doctorId } = route.params; // Extract doctorId from route parameters

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    occupation: '',
    typeOfWorker: '',
    annualIncome: '',
    phoneNumber: '',
    email: '',
    loginId: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setPatient({ ...patient, image: uri });
      }
    });
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (
        !patient.name.trim() ||
        !patient.phoneNumber.trim() ||
        !patient.age.trim() ||
        !patient.gender.trim() ||
        !patient.address.trim() ||
        !patient.password.trim() ||
        !patient.confirmPassword.trim()
      ) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      if (patient.password !== patient.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(patient.phoneNumber)) {
        Alert.alert('Error', 'Please enter a valid phone number.');
        return;
      }

      const formData = new FormData();
      formData.append('name', patient.name);
      formData.append('age', patient.age);
      formData.append('gender', patient.gender);
      formData.append('address', patient.address);
      formData.append('occupation', patient.occupation);
      formData.append('typeOfWorker', patient.typeOfWorker);
      formData.append('annualIncome', patient.annualIncome);
      formData.append('phoneNumber', patient.phoneNumber);
      formData.append('email', patient.email);
      formData.append('loginId', patient.loginId);
      formData.append('password', patient.password);
      formData.append('confirmPassword', patient.confirmPassword);
      formData.append('doctorId', doctorId);
      if (patient.image) {
        formData.append('image', {
          uri: patient.image,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }

      console.log('Form Data:', formData);

      const response = await fetch(`${API_BASE_URL}/patientdetails.php`, {
        method: 'POST',
        body: formData,
      });


      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (response.ok) {
        setPatient({
          name: '',
          age: '',
          gender: '',
          address: '',
          occupation: '',
          typeOfWorker: '',
          annualIncome: '',
          phoneNumber: '',
          email: '',
          loginId: '',
          password: '',
          confirmPassword: '',
          image: null,
        });
        console.log('Form submitted successfully.');
        Alert.alert('Success', 'Patient added successfully!');
      } else {
        console.error('Form submission failed:', responseData.message);
        Alert.alert('Error', 'Failed to add patient. Please try again.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {patient.image ? (
            <Image source={{ uri: patient.image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
          )}
        </TouchableOpacity>
        <Text style={styles.uploadText}>Upload image</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          onChangeText={(text) => setPatient({ ...patient, name: text })}
          value={patient.name}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setPatient({ ...patient, phoneNumber: numericText });
          }}
          value={patient.phoneNumber}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          onChangeText={(text) => setPatient({ ...patient, age: text })}
          value={patient.age}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter gender"
          onChangeText={(text) => setPatient({ ...patient, gender: text })}
          value={patient.gender}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          onChangeText={(text) => setPatient({ ...patient, address: text })}
          value={patient.address}
        />

        <Text style={styles.label}>Occupation</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter occupation"
          onChangeText={(text) => setPatient({ ...patient, occupation: text })}
          value={patient.occupation}
        />

        <Text style={styles.label}>Type of Worker</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={patient.typeOfWorker}
            style={styles.picker}
            onValueChange={(itemValue) => setPatient({ ...patient, typeOfWorker: itemValue })}
          >
            <Picker.Item label="Select Type of Worker" value="" />
            <Picker.Item label="Mild Worker" value="Mild Worker" />
            <Picker.Item label="Moderate Worker" value="Moderate Worker" />
            <Picker.Item label="Heavy Worker" value="Heavy Worker" />
          </Picker>
        </View>

        <Text style={styles.label}>Annual Income</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter annual income"
          onChangeText={(text) => setPatient({ ...patient, annualIncome: text })}
          value={patient.annualIncome}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={(text) => setPatient({ ...patient, email: text })}
          value={patient.email}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Login ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter login ID"
          onChangeText={(text) => setPatient({ ...patient, loginId: text })}
          value={patient.loginId}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={(text) => setPatient({ ...patient, password: text })}
          secureTextEntry={true}
          value={patient.password}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          onChangeText={(text) => setPatient({ ...patient, confirmPassword: text })}
          secureTextEntry={true}
          value={patient.confirmPassword}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  uploadText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '700',
    color: '#666666',
    alignSelf: 'center',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: 100,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#6EBFF9',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 20,
  },
  submitButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
