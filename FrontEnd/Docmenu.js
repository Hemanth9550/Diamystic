import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import LogoutConfirmationModal from './LogoutConfirmation';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const DocMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Default values in case route.params is undefined
  const { doctorId, doctorname = '', email = '' } = route.params || {};

  const [profileImage, setProfileImage] = useState(null);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/fetch_imaged.php?doctorId=${doctorId}`);
        console.log('Response from server:', response.data); // Log response for debugging
        if (response.status === 200 && response.data.status === 'success') {
          const imageUrl = response.data.image;
          setProfileImage(imageUrl);
        } else {
          console.error('Error fetching profile image - invalid response:', response.data);
          Alert.alert('Error', 'Failed to fetch profile image. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching profile image:', error.message);
        Alert.alert('Error', 'Failed to fetch profile image. Please check your network connection.');
      }
    };

    if (doctorId) {
      fetchProfileImage();
    }
  }, [doctorId]);

  useEffect(() => {
    navigation.setOptions({ title: 'Doctor Menu' });
  }, []);

  const handleAddPatient = () => {
    navigation.navigate('AddPatient', { doctorId });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditDoctorScreen', { doctorId });
  };

  const handleAddVideo = () => {
    navigation.navigate('AddVideo', { doctorId });
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate('DoctorLogin');
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{doctorname || 'Doctor Name'}</Text>
          <Text style={styles.email}>{email || 'Email Not Available'}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
        <Ionicons name="create" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleAddPatient}>
        <Ionicons name="person-add" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Add Patients</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleAddVideo}>
        <Ionicons name="videocam" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Add Videos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>

      <LogoutConfirmationModal
        visible={isLogoutModalVisible}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.05,
    backgroundColor: '#E8F6EF',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    marginRight: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  menuItem: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuText: {
    fontSize: width * 0.045,
    marginLeft: width * 0.03,
    color: 'white',
  },
  icon: {
    marginRight: width * 0.03,
  },
});

export default DocMenu;
