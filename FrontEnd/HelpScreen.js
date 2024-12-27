import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API_BASE_URL from './config';

const HelpScreen = ({ navigation, route }) => {
  const { doctorId } = route.params; // Assuming doctorId is passed from previous screen

  const [supportInfo, setSupportInfo] = useState(null);

  useEffect(() => {
    const fetchSupportInfo = async (doctorId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/contact.php?doctorId=${doctorId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch support information');
        }

        const data = await response.json();
        console.log('Fetched support info:', data); // Log fetched data for debugging

        // Ensure the structure matches your backend response
        if (data && (data.phoneno || data.phoneNumber) && data.email) {
          setSupportInfo(data);
        } else {
          console.warn('Support information is incomplete:', data);
        }
      } catch (error) {
        console.error('Error fetching support information:', error);
      }
    };

    if (doctorId) {
      fetchSupportInfo(doctorId);
    }
  }, [doctorId]);

  const handleCallSupport = () => {
    if (supportInfo && (supportInfo.phoneno || supportInfo.phoneNumber)) {
      // Use supportInfo.phoneno or supportInfo.phoneNumber based on your backend field
      Linking.openURL(`tel:${supportInfo.phoneno || supportInfo.phoneNumber}`);
    } else {
      console.warn('Phone number not available');
    }
  };

  const handleEmailSupport = () => {
    if (supportInfo && supportInfo.email) {
      Linking.openURL(`mailto:${supportInfo.email}`);
    } else {
      console.warn('Email address not available');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Need Help?</Text>
        <Text style={styles.subtitle}>We're here to assist you!</Text>
        <TouchableOpacity style={styles.option} onPress={handleCallSupport}>
          <Ionicons name="call" size={40} color="#6EBFF9" />
          <Text style={styles.optionText}>Call Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleEmailSupport}>
          <Ionicons name="mail" size={40} color="#6EBFF9" />
          <Text style={styles.optionText}>Email Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default HelpScreen;