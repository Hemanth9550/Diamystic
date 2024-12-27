import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PatientDetails = ({ route, navigation }) => {
  const { doctorId, patient } = route.params;

  // Optional: Handle case where patient data is not defined or not loaded
  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleAddDetails = () => {
    navigation.navigate('Anthro', {
      P_Id: patient.P_Id,
      doctorId: doctorId, // Pass doctorId to Anthro screen
      age: patient.age, // Pass age to Anthro screen
    });
  };

  const handleViewPrevious = () => {
    navigation.navigate('Previous', {
      P_Id: patient.P_Id,
      doctorId: doctorId, // Pass both P_Id and doctorId to Previous screen
    });
  };

  const handleBloodSugar = () => {
    navigation.navigate('BloodSugarScreen', {
      P_Id: patient.P_Id,
      doctorId: doctorId, // Pass both P_Id and doctorId to BloodSugar screen
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{ uri: patient.image_path }} style={styles.patientImage} />
        <View style={styles.patientDetails}>
          <Text style={styles.detailItem}>Patient ID: {patient.P_Id}</Text>
          <Text style={styles.detailItem}>Name: {patient.name}</Text>
          <Text style={styles.detailItem}>Age: {patient.age}</Text>
          <Text style={styles.detailItem}>Gender: {patient.gender}</Text>
          <Text style={styles.detailItem}>Address: {patient.address}</Text>
          <Text style={styles.detailItem}>Mobile: {patient.mob}</Text>
          <Text style={styles.detailItem}>Email: {patient.mail}</Text>
          <Text style={styles.detailItem}>Login Id: {patient.loginId}</Text>
          <Text style={styles.detailItem}>Password: {patient.password}</Text>

          <Text style={styles.detailItem}>Occupation: {patient.occupation}</Text>
          <Text style={styles.detailItem}>Type Of Worker: {patient.typeofworker}</Text>
          <Text style={styles.detailItem}>Annual income: {patient.annualincome}</Text>
          {/* Add more patient details here */}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddDetails}>
            <Text style={styles.buttonText}>Add Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleViewPrevious} // Navigate to Previous screen with params
          >
            <Text style={styles.buttonText}>View Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleBloodSugar} // Navigate to BloodSugar screen with params
          >
            <Text style={styles.buttonText}>Blood Sugar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.02, // Adjust padding vertically relative to screen height
    paddingHorizontal: width * 0.05, // Adjust padding horizontally relative to screen width
  },
  container: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientImage: {
    width: '100%',
    height: height * 0.25, // Adjust height relative to screen height
    marginBottom: height * 0.02, // Adjust margin bottom relative to screen height
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  patientDetails: {
    width: '100%',
    backgroundColor: '#fff',
    padding: width * 0.05, // Adjust padding relative to screen width
    borderRadius: 10,
    marginBottom: height * 0.02, // Adjust margin bottom relative to screen height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailItem: {
    fontSize: width * 0.04, // Adjust font size relative to screen width
    marginBottom: height * 0.01, // Adjust margin bottom relative to screen height
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: height * 0.02, // Adjust padding vertically relative to screen height
    backgroundColor: '#3498db',
    alignItems: 'center',
    marginBottom: height * 0.02, // Adjust margin bottom relative to screen height
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045, // Adjust font size relative to screen width
    fontWeight: 'bold',
  },
});

export default PatientDetails;
