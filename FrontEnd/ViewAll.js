import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API_BASE_URL from './config';

const ViewAll = ({ route }) => {
  const { doctorId } = route.params || { doctorId: '' };
  const [patientIDs, setPatientIDs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = () => {
    axios.get(`${API_BASE_URL}/fetch_data.php?doctorId=${doctorId}`)
      .then(response => {
        if (response.data.status === "success" && Array.isArray(response.data.data)) {
          setPatientIDs(response.data.data);
          setFilteredPatients(response.data.data);
        } else {
          console.error('Invalid response data:', response.data);
          setError(new Error('Invalid response data'));
        }
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = patientIDs.filter(patient => {
      const patientId = patient.P_Id ? patient.P_Id.toString().toLowerCase() : '';
      const patientName = patient.name ? patient.name.toLowerCase() : '';
      return patientId.includes(text.toLowerCase()) || patientName.includes(text.toLowerCase());
    });
    setFilteredPatients(filtered);
  };

  const onPatientIDPress = (patient) => {
    navigation.navigate('PatientDetails', { doctorId, patient });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.backBarText}>View All Patients</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DownloadScreen')} style={styles.downloadButton}>
          <Ionicons name="download" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Patient ID or Name"
        onChangeText={handleSearch}
        value={searchText}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {error ? (
            <Text style={styles.errorText}>Error fetching patient data: {error.message}</Text>
          ) : (
            filteredPatients.map((patient, index) => (
              <TouchableOpacity key={index} style={styles.patientItem} onPress={() => onPatientIDPress(patient)}>
                <Image source={{ uri: patient.image_path }} style={styles.patientImage} />
                <View style={styles.patientDetails}>
                  <Text style={styles.patientID}>Patient ID: {patient.P_Id}</Text>
                  <Text style={styles.patientName}>Name: {patient.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
          {filteredPatients.length === 0 && !error && (
            <Text style={styles.noResults}>No results found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6EBFF9',
    paddingVertical: 30,
    paddingHorizontal: 15,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  backBarText: {
    color: 'white',
    fontSize: 22,
  },
  downloadButton: {
    padding: 5,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 120, // Adjust margin to move it below the back bar
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  patientItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderColor: '#007BFF',
    borderWidth: 2,
  },
  patientDetails: {
    flex: 1,
  },
  patientID: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  patientName: {
    fontSize: 14,
    color: '#555',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ViewAll;
