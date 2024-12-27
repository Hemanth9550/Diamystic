import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import LogoutConfirmationModal from './LogoutConfirmation';
import API_BASE_URL from './config';

const PatMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, mail, loginId, P_Id, age, mob, occupation, doctorId } = route.params || {};

  const [profileImage, setProfileImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/image.php?P_Id=${P_Id}`);
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

    fetchProfileImage();
  }, [P_Id]);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    navigation.navigate('PatientLogin'); // Placeholder for actual logout logic
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const handleHelpPress = () => {
    navigation.navigate('HelpScreen',{doctorId});
  };

  const navigateBack = () => {
    navigation.navigate('PatDashboard', { loginId, name, mail, P_Id });
  };

  const handleNavigateToBloodSugar = () => {
    navigation.navigate('BloodSugar', { loginId, name, mail, P_Id });
  };

  const handleNavigateToWatchedVideos = () => {
    navigation.navigate('Exercise', { doctorId });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { loginId, name, mail, P_Id, age, mob, occupation, profileImage });
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <View style={styles.profileText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.mail}>{mail}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
        <Ionicons name="create" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleNavigateToBloodSugar}>
        <Ionicons name="person-add" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Blood Sugar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleNavigateToWatchedVideos}>
        <Ionicons name="videocam" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Videos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleHelpPress}>
        <Ionicons name="help-circle" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>

      {/* Logout confirmation modal */}
      <LogoutConfirmationModal visible={showModal} onConfirm={confirmLogout} onCancel={cancelLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
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
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mail: {
    fontSize: 16,
    color: '#888',
  },
  menuItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default PatMenu;