import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView, Alert } from 'react-native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const BloodSugarScreen = ({ route }) => {
  const { P_Id } = route.params;
  const [loading, setLoading] = useState(true);
  const [bloodSugarData, setBloodSugarData] = useState([]);

  useEffect(() => {
    fetchBloodSugarData();
  }, []);

  const fetchBloodSugarData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bs_fetch.php?P_Id=${P_Id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setBloodSugarData(data.data); // Set the bloodSugarData state with the fetched data
          if (data.data.length === 0) {
            Alert.alert("No Blood Sugar Values Entered");
          }
        }
        setLoading(false);
      } else {
        console.error('Failed to fetch blood sugar data:', response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching blood sugar data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Blood Sugar Readings</Text>
      {bloodSugarData.length === 0 ? (
        <Text style={styles.noDataText}>No Blood Sugar Values Entered</Text>
      ) : (
        bloodSugarData.map((reading, index) => (
          <View key={index} style={styles.readingsContainer}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{reading.date}</Text>

            <Text style={styles.label}>Before Food:</Text>
            <Text style={styles.value}>{reading.beforefood} mg/dL</Text>

            <Text style={styles.label}>After Food:</Text>
            <Text style={styles.value}>{reading.afterfood} mg/dL</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: width * 0.05,
    paddingBottom: height * 0.05,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#3498db',
  },
  readingsContainer: {
    width: '100%',
    padding: width * 0.05,
    marginBottom: height * 0.02,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: '#333',
  },
  value: {
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    color: '#555',
  },
  noDataText: {
    fontSize: width * 0.05,
    color: '#888',
    textAlign: 'center',
    marginTop: height * 0.2,
  },
});

export default BloodSugarScreen;
