import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>exercise video 1</Text>
      </View>

      {/* Rectangular Box with Image (Centered) */}
      <View style={styles.rectangularBox}>
        <Image
          source={{ uri: 'https://continentalhospitals.com/uploads/mceu_31923284811699687086478.jpg' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PatDashboard')}>
          <Text style={styles.buttonText}>{'< Back'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{'Next >'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 9,
    alignItems: 'center',
    marginBottom: 100,
    marginTop: 100,
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rectangularBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '89%',
    height: '65%',
    borderRadius: 10,
    marginBottom: 209,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#00000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyComponent;
