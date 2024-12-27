import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Alert, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import API_BASE_URL from './config';

const { width } = Dimensions.get('window');

const getMimeType = (uri) => {
  const extension = uri.split('.').pop();
  switch (extension) {
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/quicktime';
    case 'avi':
      return 'video/x-msvideo';
    case 'mkv':
      return 'video/x-matroska';
    default:
      return 'video/mp4'; // default MIME type if none match
  }
};

export default function AddVideoScreen({ route, navigation }) {
  const [video, setVideo] = useState(null);
  const [introduction, setIntroduction] = useState('');
  const { doctorId } = route.params; // Extract doctorId from route params

  const pickVideo = async () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'video',
          includeBase64: false,
        },
        (response) => {
          if (response.didCancel) {
            console.log('Video selection canceled.');
          } else if (response.error) {
            console.error('Error picking video:', response.error);
          } else if (response.assets && response.assets.length > 0) {
            setVideo(response.assets[0].uri);
          }
        }
      );
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };

  const uploadVideo = async () => {
    if (!introduction || !video) {
      Alert.alert('Missing information', 'Please fill out all the fields and select a video.');
      return;
    }

    try {
      const formData = new FormData();

      if (video) {
        const uri = video;
        const type = getMimeType(uri);
        const name = uri.split('/').pop();

        formData.append('video_file', {
          uri,
          type,
          name,
        });
      }

      formData.append('doctorId', doctorId); // Include doctorId in the form data
      formData.append('introduction', introduction);

      const response = await fetch(`${API_BASE_URL}/updatevideo.php`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Video uploaded successfully.');
        setVideo(null);
        setIntroduction('');
        // Navigate to the video screen
        navigation.navigate('Video', { doctorId });
      } else {
        Alert.alert('Error', `Failed to upload video: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      Alert.alert('Error', 'Failed to upload video.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.videoPickerContainer} onPress={pickVideo}>
          {video ? (
            <Video
              source={{ uri: video }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="videocam" size={width * 0.5} color="#CCCCCC" />
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Introduction:</Text>
          <TextInput
            style={styles.input}
            value={introduction}
            onChangeText={text => setIntroduction(text)}
          />
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={uploadVideo}>
          <Text style={styles.uploadButtonText}>Upload Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginTop: 50,
  },
  videoPickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6EBFF9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    marginVertical: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#6EBFF9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
