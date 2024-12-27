import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const doctorAnim = useRef(new Animated.Value(-height)).current; // Start the doctor section offscreen above
  const patientAnim = useRef(new Animated.Value(height)).current; // Start the patient section offscreen below

  useEffect(() => {
    // Animate doctor and patient sections at the same time
    Animated.parallel([
      Animated.timing(doctorAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(patientAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDoctorPress = () => {
    navigation.navigate('DoctorLogin');
  };

  const handlePatientPress = () => {
    navigation.navigate('PatientLogin');
  };

  const handleBackPress = () => {
    navigation.navigate('Diabetes'); // Ensure 'Diabetes' is a valid route in your navigation
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={width * 0.08} color="black" />
      </TouchableOpacity>
      <Text style={styles.welcomeText}>Welcome, Choose Your Category</Text>
      <View style={styles.logoContainer}>
        {/* Doctor Section with animation */}
        <Animated.View style={[styles.logoWrapper, { transform: [{ translateY: doctorAnim }] }]}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8815/8815112.png' }}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.button} onPress={handleDoctorPress}>
            <Text style={styles.buttonText}>Doctor</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Patient Section with animation */}
        <Animated.View style={[styles.logoWrapper, { transform: [{ translateY: patientAnim }] }]}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1mUMqEUdel0RsaAmnp-l7hXMbagns98LlEA&usqp=CAU' }}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.button} onPress={handlePatientPress}>
            <Text style={styles.buttonText}>Patient</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.1,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
  },
  welcomeText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.02,
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginVertical: height * 0.02,
  },
  button: {
    backgroundColor: '#6EBFF9',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    marginVertical: height * 0.01,
    borderRadius: width * 0.05,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
