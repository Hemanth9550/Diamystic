import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const Diabetes = ({ navigation }) => {
  const [imageAnim] = useState(new Animated.Value(-height * 0.5)); // Initial position for image
  const [textAnim] = useState(new Animated.Value(height * 0.5)); // Initial position for text
  const [ellipseAnim1] = useState(new Animated.Value(-width * 0.5)); // Initial position for upper ellipse
  const [ellipseAnim2] = useState(new Animated.Value(width * 0.5)); // Initial position for lower ellipse

  const handleGetStarted = () => {
    navigation.navigate('WelcomeScreen');
  };

  useEffect(() => {
    // Trigger the animations concurrently using Animated.parallel
    Animated.parallel([
      Animated.timing(imageAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(ellipseAnim1, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(ellipseAnim2, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [imageAnim, textAnim, ellipseAnim1, ellipseAnim2]);

  return (
    <View style={styles.container}>
      <View style={styles.diabetes}>
        <Animated.Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG1mGSHFNQVmK-bu7V6P1a2pFlLZNTR2R3og&usqp=CAU' }}
          style={[styles.image, { transform: [{ translateY: imageAnim }] }]}
        />
        <Animated.View
          style={[styles.ellipse, { transform: [{ translateX: ellipseAnim1 }] }]}
        />
        <Animated.View
          style={[styles.ellipse2, { transform: [{ translateX: ellipseAnim2 }] }]}
        />
        <Animated.Text style={[styles.diabetesText, { transform: [{ translateY: textAnim }] }]}>
          Diabetes and Exercise
        </Animated.Text>
        <Animated.Text style={[styles.findRoutineText, { transform: [{ translateY: textAnim }] }]}>
          Find Your Daily Routine
        </Animated.Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  diabetes: {
    width: width * 0.95,
    height: height * 0.95,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ellipse: {
    width: width * 0.6,
    height: height * 0.25,
    backgroundColor: '#6EBFF9',
    position: 'absolute',
    top: -40,
    left: -59,
    borderRadius: (width * 0.6) / 2,
  },
  ellipse2: {
    width: width * 0.58,
    height: height * 0.24,
    backgroundColor: '#6EBFF9',
    position: 'absolute',
    top: height * 0.8,
    left: width * 0.55,
    borderRadius: (width * 0.58) / 2,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: height * 0.05,
  },
  diabetesText: {
    fontWeight: '700',
    fontSize: width * 0.08,
    lineHeight: width * 0.1,
    color: '#000000',
    position: 'absolute',
    top: height * 0.45,
  },
  findRoutineText: {
    fontWeight: '400',
    fontSize: width * 0.05,
    lineHeight: width * 0.06,
    color: '#000000',
    position: 'absolute',
    top: height * 0.53,
  },
  button: {
    width: width * 0.35,
    height: height * 0.07,
    backgroundColor: '#6EBFF9',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.15,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: width * 0.06,
    lineHeight: width * 0.1,
    color: '#FFFFFF',
  },
});

export default Diabetes;
