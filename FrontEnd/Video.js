import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from './config';

const { width, height } = Dimensions.get('window');

const VideoScreen = ({ route }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { doctorId } = route.params;
  const videoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fetch_videos.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId }),
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data.data);
      } else {
        console.error('Failed to fetch videos:', response.status);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleDeleteVideo = (filename) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this video?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/delete_video.php`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename }),
              });

              const result = await response.json();
              if (result.success) {
                Alert.alert('Success', 'Video deleted successfully');
                fetchVideos(); // Refresh the video list
              } else {
                Alert.alert('Error', result.message || 'Failed to delete video');
              }
            } catch (error) {
              console.error('Error deleting video:', error);
              Alert.alert('Error', 'An error occurred while deleting the video. Please try again later.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderVideoItem = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" duration={1000} style={styles.videoContainer}>
      <View style={styles.placeholderContainer}>
        <Ionicons name="play-circle-outline" size={64} color="#4CAF50" />
        <Text style={styles.exerciseText}>Exercise {index + 1}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleVideoPress(item)}>
          <Text style={styles.buttonText}>View Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteVideo(item.filename)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      {selectedVideo === item.video_path && (
        <View style={styles.videoInfoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: item.video_path }}
            style={styles.video}
            controls
            resizeMode="contain"
            onError={(error) => handleVideoError(error)}
            onPlaybackStatusUpdate={(status) => handlePlaybackStatusUpdate(status, item)}
          />
          <View style={styles.textContainer}>
            <Text style={styles.fileNameText}>File Name: {item.filename}</Text>
            <Text style={styles.introText}>Introduction: {item.introduction}</Text>
          </View>
        </View>
      )}
    </Animatable.View>
  );

  const handleVideoError = (error) => {
    console.error('Video loading error:', error);
    Alert.alert('Error', 'There was an error loading the video. Please try again later.');
  };

  const handlePlaybackStatusUpdate = (status, item) => {
    // Handle playback status updates here if needed
  };

  const handleVideoPress = (item) => {
    setSelectedVideo(item.video_path);
  };

  const navigateToAddVideo = () => {
    navigation.navigate('AddVideo', { doctorId });
  };

  return (
    <LinearGradient colors={['#e0f7fa', '#80deea']} style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddVideo}>
        <Text style={styles.addButtonText}>Add Video</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContent: {
    paddingBottom: 60, // Add padding to ensure list items are not hidden behind the button
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
  },
  placeholderContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    marginBottom: 10,
  },
  videoInfoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  video: {
    width: width * 0.8,
    height: height * 0.45,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  introText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  fileNameText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoScreen;
