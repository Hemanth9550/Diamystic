import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const Previous = ({ route }) => {
  const { P_Id } = route.params;
  const [patientDetails, setPatientDetails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/prev.php?P_Id=${P_Id}`);
      const data = await response.json();
      if (data.status === 'success') {
        setPatientDetails(data.patientDetails);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  if (patientDetails.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No Data Entered</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/your-background-image-url' }} // Replace with your background image URL
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {patientDetails.map((detail, index) => (
            <View key={index} style={styles.detailContainer}>
              <Text style={styles.headerText}>Patient Info</Text>
              <Text style={styles.text}>Date: <Text style={styles.value}>{detail.date}</Text></Text>
              <Text style={styles.text}>Patient ID: <Text style={styles.value}>{detail.P_Id}</Text></Text>
              <Text style={styles.text}>Height: <Text style={styles.value}>{detail.height}</Text></Text>
              <Text style={styles.text}>Weight: <Text style={styles.value}>{detail.weight}</Text></Text>
              <Text style={styles.text}>Waist Circumference: <Text style={styles.value}>{detail.waistCircumference}</Text></Text>
              <Text style={styles.text}>Hip Circumference: <Text style={styles.value}>{detail.hipCircumference}</Text></Text>
              <Text style={styles.text}>WHR: <Text style={styles.value}>{detail.whr}</Text></Text>
              <Text style={styles.text}>BMI: <Text style={styles.value}>{detail.bmi}</Text></Text>
              <Text style={styles.text}>Before Food: <Text style={styles.value}>{detail.beforeFood}</Text></Text>
              <Text style={styles.text}>After Food: <Text style={styles.value}>{detail.afterFood}</Text></Text>
              <Text style={styles.text}>SR Urea: <Text style={styles.value}>{detail.srUrea}</Text></Text>
              <Text style={styles.text}>SR Creatine: <Text style={styles.value}>{detail.srCreatine}</Text></Text>
              <Text style={styles.text}>Hba1c: <Text style={styles.value}>{detail.hba1c}</Text></Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  loadingText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    paddingVertical: height * 0.02,
  },
  detailContainer: {
    marginBottom: height * 0.02,
    padding: width * 0.05,
    borderRadius: width * 0.04,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: width * 0.05,
  },
  headerText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  text: {
    fontSize: width * 0.04,
    color: '#555',
    marginBottom: height * 0.01,
  },
  value: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#007BFF', // Added color to highlight values
  },
});

export default Previous;
