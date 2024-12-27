import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API_BASE_URL from './config';

const DownloadScreen = () => {
  const navigation = useNavigation();

  const handleDownload = (type) => {
    const url = `${API_BASE_URL}download_data.php?type=${type}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleDownload('personal')}>
          <Text style={styles.buttonText}>Patient Personal Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDownload('medical')}>
          <Text style={styles.buttonText}>Patient Medical Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDownload('bloodsugar')}>
          <Text style={styles.buttonText}>Blood Sugar Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  backButton: {
    padding: 5,
  },
  backBarText: {
    color: 'white',
    fontSize: 22,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default DownloadScreen;
