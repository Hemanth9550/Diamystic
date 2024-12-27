import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import API_BASE_URL from './config';

const EditProfile = ({ route, navigation }) => {
  const { P_Id, profileImage: initialProfileImage } = route.params;
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(initialProfileImage || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [requiredFields, setRequiredFields] = useState([]);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fetch_profile.php?P_Id=${P_Id}`);
      const data = await response.json();
      setPatientName(data.name || '');
      setPhoneNumber(String(data.mob || '')); // Convert to string
      setGender(data.gender || '');
      setAge(String(data.age || '')); // Convert to string
      setOccupation(data.occupation || '');
      setAddress(data.address || '');
      if (data.image) {
        setProfileImage(data.image);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setErrorMessage('Failed to fetch patient details.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    try {
      const requiredFields = [];
      if (!patientName.trim()) requiredFields.push('Name');
      if (!phoneNumber.trim()) requiredFields.push('Phone Number');
      if (!gender.trim()) requiredFields.push('Gender');
      if (!age.trim()) requiredFields.push('Age');
      if (!occupation.trim()) requiredFields.push('Occupation');
      if (!address.trim()) requiredFields.push('Address');
      if (!password.trim()) requiredFields.push('Password');
      if (!confirmPassword.trim()) requiredFields.push('Confirm Password');

      if (requiredFields.length > 0) {
        setRequiredFields(requiredFields);
        Alert.alert('Required Fields', 'Please fill in all required fields.', [{ text: 'OK' }]);
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Error: Passwords do not match');
        Alert.alert('Password Mismatch', 'Passwords do not match. Please check again.', [{ text: 'OK' }]);
        return;
      }

      setErrorMessage('');
      const formData = new FormData();
      formData.append('P_Id', P_Id);
      formData.append('password', password);
      formData.append('confirmpassword', confirmPassword);
      formData.append('patientName', patientName);
      formData.append('mob', phoneNumber);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('occupation', occupation);
      formData.append('address', address);
      if (profileImage) {
        const uriParts = profileImage.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('image', {
          uri: profileImage,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch(`${API_BASE_URL}/update_profile.php`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.json();
      console.log('Response from server:', responseData);

      if (response.ok && responseData.success) {
        navigation.navigate('PatMenu', { P_Id });
      } else {
        console.error('Error updating patient details:', responseData);
        setErrorMessage('Error: ' + responseData.error);
        Alert.alert('Update Failed', 'Failed to update patient details. Please try again later.', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Error updating patient details:', error);
      setErrorMessage('Error: An unexpected error occurred');
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.', [{ text: 'OK' }]);
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorMessage) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack}>
            <View style={styles.headerButtonPlaceholder} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Photo</Text>
          <View style={styles.headerButtonPlaceholder} />
        </View>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <Text style={styles.addImageText}>Add Image</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={patientName}
          onChangeText={setPatientName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          value={occupation}
          onChangeText={setOccupation}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        {requiredFields.length > 0 && (
          <Text style={styles.error}>Please fill in all required fields.</Text>
        )}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerButtonPlaceholder: {
    width: 75, // To align the title in the center
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  addImageText: {
    color: '#007AFF',
    marginBottom: 20,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default EditProfile;
