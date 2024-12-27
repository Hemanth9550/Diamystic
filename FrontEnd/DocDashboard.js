import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import LogoutConfirmation from './LogoutConfirmation';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const DocDashboard = ({ route }) => {
  const { doctorId, doctorname, email } = route.params || '';
  const [recentPatients, setRecentPatients] = useState([]);
  const [error, setError] = useState(null);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [activeIcon, setActiveIcon] = useState('Home'); // State to track active icon
  const navigation = useNavigation();

  // Ensure doctorId is passed correctly via route params
  useEffect(() => {
    if (route.params && route.params.doctorId) {
      setActiveIcon('Home'); // Reset active icon to 'Home' when doctorId changes
    }
  }, [route.params]);

  useEffect(() => {
    fetchRecentPatients();
  }, [doctorId]); // Fetch patients when doctorId changes

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: '#6EBFF9' },
      headerTitle: null,
      headerLeft: () => (
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Docmenu', { doctorId, doctorname, email })}>
          <FontAwesome name="bars" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerTitleContainerStyle: {
        left: 0,
        right: 0,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTitleAlign: 'center',
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Hello, {doctorname}</Text>
        </View>
      ),
    });
  }, [navigation, doctorId]);

  // Effect to fetch recent patients
  const fetchRecentPatients = () => {
    axios
      .get(`${API_BASE_URL}/fetch_data.php?doctorId=${doctorId}`)
      .then((response) => {
        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          const patientsWithImageURL = response.data.data.map((patient) => ({
            ...patient,
            image: { uri: patient.image_path },
          }));

          // Sort patients by P_Id in descending order
          patientsWithImageURL.sort((a, b) => b.P_Id - a.P_Id);

          setRecentPatients(patientsWithImageURL);
        } else {
          console.error('Invalid response data:', response.data);
          setError(new Error('Invalid response data'));
        }
      })
      .catch((error) => {
        console.error('Error fetching recent patients data:', error);
        setError(error);
      });
  };

  // Effect to reset active icon when screen gains focus
  useFocusEffect(
    useCallback(() => {
      setActiveIcon('Home'); // Reset active icon to 'Home' when the screen gains focus
    }, [])
  );

  const handleSeeMorePress = () => {
    navigation.navigate('ViewAll', { doctorId, patientIDs: recentPatients.map((patient) => patient.P_Id) });
  };

  const handleLogoutPress = () => {
    setLogoutVisible(true);
  };

  const handleConfirmLogout = () => {
    setLogoutVisible(false);
    navigation.navigate('DoctorLogin');
  };

  const handleCancelLogout = () => {
    setLogoutVisible(false);
  };

  const handleIconPress = (iconName) => {
    if (activeIcon === iconName) {
      return;
    }

    setActiveIcon(iconName);
    if (iconName === 'Home') {
      navigation.navigate('DocDashboard', { doctorId }); // Navigate to DocDashboard screen with doctorId
    } else if (iconName === 'Add') {
      navigation.navigate('AddPatient', { doctorId }); // Navigate to AddPatient screen with doctorId
    } else if (iconName === 'Video') {
      navigation.navigate('Video', { doctorId }); // Navigate to Video screen
    } else if (iconName === 'Logout') {
      handleLogoutPress(); // Show logout confirmation
    }
  };

  const onPatientIDPress = (patient) => {
    navigation.navigate('PatientDetails', { doctorId, patient }); // Navigate to PatientDetails screen
  };

  const getIconStyle = (iconName) => {
    return {
      opacity: activeIcon === iconName ? 1 : 0.5,
      shadowColor: activeIcon === iconName ? '#6EBFF9' : 'transparent',
      shadowOffset: activeIcon === iconName ? { width: 0, height: 0 } : {},
      shadowOpacity: activeIcon === iconName ? 0.7 : 0,
      shadowRadius: activeIcon === iconName ? 10 : 0,
      elevation: activeIcon === iconName ? 10 : 0,
    };
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.topImage}
        source={{ uri: 'https://c8.alamy.com/comp/T1GX71/doctor-holding-stethoscope-with-sign-of-world-diabetes-and-a-heart-symbol-T1GX71.jpg' }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.box}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.recentPatientsContainer}>
              {error ? (
                <Text style={styles.errorText}>Error fetching recent patients data: {error.message}</Text>
              ) : (
                recentPatients.map((patient, index) => (
                  <TouchableOpacity key={index} onPress={() => onPatientIDPress(patient)} style={styles.patientBox}>
                    <View style={styles.ellipse}>
                      <Image
                        style={styles.image}
                        source={patient.image}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.pidText}>P_Id: {patient.P_Id}</Text>
                        <Text style={styles.nameText}>Name: {patient.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.seeMoreContainer} onPress={handleSeeMorePress}>
            <Text style={[styles.seeMoreText, { textDecorationLine: 'underline' }]}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconButtonsWrapper}>
        <View style={styles.iconButtonsContainer}>
          <TouchableOpacity style={[styles.iconButton, getIconStyle('Home')]} onPress={() => handleIconPress('Home')}>
            <FontAwesome name="home" size={32} color="white" />
            <Text style={[styles.iconButtonText, { color: 'white' }]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, getIconStyle('Add')]} onPress={() => handleIconPress('Add')}>
            <FontAwesome name="plus" size={32} color="white" />
            <Text style={[styles.iconButtonText, { color: 'white' }]}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, getIconStyle('Video')]} onPress={() => handleIconPress('Video')}>
            <FontAwesome name="video-camera" size={32} color="white" />
            <Text style={[styles.iconButtonText, { color: 'white' }]}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, getIconStyle('Logout')]} onPress={() => handleIconPress('Logout')}>
            <FontAwesome name="sign-out" size={32} color="white" />
            <Text style={[styles.iconButtonText, { color: 'white' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LogoutConfirmation visible={logoutVisible} onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      menuButton: {
        marginLeft: 15,
      },
      contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      box: {
        width: width * 0.9, // Adjusted width
        height: height * 0.5, // Adjusted height
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#6EBFF9',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: -150, // Adjusted margin top
      },
      topImage: {
        width: width * 0.9, // Decreased width
        height: height * 0.25, // Decreased height
        resizeMode: 'cover',
        position: 'absolute',
        top: 15, // Adjusted position from top
        borderRadius: 20,
      },
      scrollView: {
        flex: 1,
        width: '100%',
      },
      recentPatientsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      recentPatientsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      errorText: {
        color: 'red',
        textAlign: 'center',
      },
      patientBox: {
        width: '90%',
        height: 90,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#6EBFF9',
        borderRadius: 10,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      ellipse: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
      },
      textContainer: {
        marginLeft: 15,
        justifyContent: 'center',
      },
      pidText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      nameText: {
        fontSize: 14,
        color: 'gray',
      },
      headerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      seeMoreContainer: {
        position: 'absolute',
        top: -25,
        right: 10,
      },
      seeMoreText: {
        fontSize: 16,
        color: 'blue',
      },
      errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
      },
      iconButtonsWrapper: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
      },
      iconButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        height: 80,
        backgroundColor: '#6EBFF9',
        borderRadius: 40,
        marginBottom: -5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      },
      iconButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      },
      iconButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
      },
    });
    
    export default DocDashboard;