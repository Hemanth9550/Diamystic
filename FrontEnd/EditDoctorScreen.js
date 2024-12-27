import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import API_BASE_URL from './config';

const EditDoctorScreen = ({ route }) => {
  const { doctorId, profileImage: initialProfileImage } = route.params;
  const [doctorname, setDoctorName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(initialProfileImage || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [requiredFields, setRequiredFields] = useState([]);

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctoredit1.php?doctorId=${doctorId}`);
      const data = await response.json();
      setDoctorName(data.doctorname || '');
      setPhoneNumber(data.phoneno || '');
      setEmail(data.email || '');
      setGender(data.gender || '');
      setAge(data.age || '');
      setExperience(data.experience || '');
      setSpecialization(data.specialization || '');
      if (data.image) {
        setProfileImage(data.image);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      setErrorMessage('Failed to fetch doctor details.');
    }
  };

  const handleSave = async () => {
    try {
      const requiredFields = [];
      if (!doctorname.trim()) requiredFields.push('Name');
      if (!phoneNumber.trim()) requiredFields.push('Phone Number');
      if (!email.trim()) requiredFields.push('Email');
      if (!gender.trim()) requiredFields.push('Gender');
      if (!age.trim()) requiredFields.push('Age');
      if (!experience.trim()) requiredFields.push('Experience');
      if (!specialization.trim()) requiredFields.push('Specialization');
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
      formData.append('doctorId', doctorId);
      formData.append('password', password);
      formData.append('doctorname', doctorname);
      formData.append('phoneno', phoneNumber);
      formData.append('email', email);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('experience', experience);
      formData.append('specialization', specialization);
      if (profileImage) {
        const uriParts = profileImage.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('image', {
          uri: profileImage,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch(`${API_BASE_URL}/doctoredit.php`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.json();
      console.log('Response from server:', responseData);

      if (response.ok && responseData.success) {
        Alert.alert('Success', 'Doctor details updated successfully.', [{ text: 'OK' }]);
      } else {
        console.error('Error updating doctor details:', responseData);
        setErrorMessage('Error: ' + responseData.error);
        Alert.alert('Update Failed', 'Failed to update doctor details. Please try again later.', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Error updating doctor details:', error);
      setErrorMessage('Error: An unexpected error occurred');
      Alert.alert('Update Failed', 'Failed to update doctor details. Please try again later.', [{ text: 'OK' }]);
    }
  };

  const handleChooseImage = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Edit Doctor Profile</Text>
        </View>
        <TouchableOpacity onPress={handleChooseImage}>
          <Image 
            source={{ uri: profileImage || 'https://via.placeholder.com/100' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={doctorname}
          onChangeText={setDoctorName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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
          placeholder="Experience"
          value={experience}
          onChangeText={setExperience}
        />
        <TextInput
          style={styles.input}
          placeholder="Specialization"
          value={specialization}
          onChangeText={setSpecialization}
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default EditDoctorScreen;
