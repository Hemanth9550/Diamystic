import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

function PatDashboard() {
  const navigation = useNavigation();
  const route = useRoute();
  const { loginId, name, mail, P_Id, doctorId, age, mob, occupation } = route.params;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const images = [
    'https://img.freepik.com/free-vector/stretching-exercises-concept-illustration_114360-8922.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1712016000&semt=ais',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpUM77W3vUSgJAa6wd5tpnLRQQBkAVxuJZvA&s',
    'https://ysm-res.cloudinary.com/image/upload/v1/yms/prod/e0d7a88b-0776-4e59-bc7e-620b25202d97',
  ];

  const quotes = [
    "Diabetes is a challenge, but it's one you can conquer. Stay strong and stay positive.",
    "Every step you take towards a healthier lifestyle is a step away from diabetes.",
    "Your health is a priority. Make the right choices today to create a better tomorrow.",
    "You are stronger than your diagnosis. Believe in yourself and keep pushing forward.",
    "Managing diabetes is a daily effort, but every effort counts towards a healthier you.",
    "Diabetes may slow you down, but it can't stop you. Keep moving forward.",
    "Take control of your diabetes, one day at a time. Small steps lead to big changes.",
    "Healthy eating and regular exercise are your best allies in the fight against diabetes.",
    "Empower yourself with knowledge. The more you know, the better you can manage your diabetes.",
    "Stay active, stay healthy, stay happy. Your journey with diabetes is yours to own.",
    "Don't let diabetes define you. You have the power to define your own health.",
    "With every mindful meal and every step taken, you are winning the battle against diabetes.",
    "Diabetes is a part of your life, but it doesn't have to control your life. You are in charge.",
    "Your determination and resilience are your greatest strengths in managing diabetes.",
    "Believe in your ability to manage diabetes and live a full, healthy life.",
    "Every healthy choice you make is a victory in your journey with diabetes.",
    "Diabetes is tough, but so are you. Keep fighting and never give up.",
    "Your commitment to a healthy lifestyle is the key to managing diabetes effectively.",
    "Stay motivated, stay positive, and take control of your diabetes with confidence.",
    "Remember, you are not alone in this journey. Reach out for support and keep striving for better health.",
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => (prevIndex === quotes.length - 1 ? 0 : prevIndex + 1));
    }, 9000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  const goToPatMenu = () => {
    navigation.navigate('PatMenu', { doctorId, loginId, name, mail, P_Id, age, occupation, mob });
  };

  const navigateToExercises = () => {
    navigation.navigate('Exercise', { doctorId });
  };

  const navigateToFoodsToEat = () => {
    navigation.navigate('FoodsToEatScreen');
  };

  const navigateToFoodsToControl = () => {
    navigation.navigate('FoodsToControlScreen');
  };

  const navigateToFoodsToAvoid = () => {
    navigation.navigate('FoodsToAvoidScreen');
  };

  const navigateToFoodTriangle = () => {
    navigation.navigate('FoodTriangle');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={goToPatMenu}>
          <FontAwesome name="bars" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Welcome, {name}</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.outerContainer}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: images[currentImageIndex] }}
              style={styles.topImage}
            />
          </View>

          {/* Decorative Divider */}
          <View style={styles.divider} />

          {/* Motivational Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{quotes[currentQuoteIndex]}</Text>
          </View>

          {/* Decorative Divider */}
          <View style={styles.divider} />

          {/* Buttons Section */}
          <View style={styles.buttonsContainer}>
            {/* Row 1 */}
            <View style={styles.buttonsRow}>
              <TouchableOpacity style={styles.button} onPress={navigateToExercises}>
                <Image
                  source={{
                    uri: 'https://emi.parkview.com/media/Image/Dashboard_952_The-many-health-benefits-of-regular-exercise_11_20.jpg',
                  }}
                  style={styles.buttonImage}
                />
                <Text style={styles.buttonText}>Exercises</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={navigateToFoodTriangle}>
                <Image
                  source={{
                    uri: 'https://i.pinimg.com/originals/4b/ea/d9/4bead9255ad7272b006514766071c25d.jpg',
                  }}
                  style={styles.buttonImage}
                />
                <Text style={styles.buttonText}>Food Pyramid</Text>
              </TouchableOpacity>
            </View>

            {/* Decorative Divider */}
            <View style={styles.divider} />

            {/* Row 2 with Horizontal Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContainer}>
              <TouchableOpacity style={styles.smallButton} onPress={navigateToFoodsToEat}>
                <Image
                  source={{
                    uri: 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=',
                  }}
                  style={styles.smallButtonImage}
                />
                <Text style={styles.buttonText}>Foods to Eat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallButton} onPress={navigateToFoodsToControl}>
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBxkOqeG1bkVEZY4NjJuGMmBXMSNaUWy-sk9rzoW_VGg&s',
                  }}
                  style={styles.smallButtonImage}
                />
                <Text style={styles.buttonText}>Foods to Control</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallButton} onPress={navigateToFoodsToAvoid}>
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGCz-mw7WJdN20AKaeO0UEZoTA9gZeBuNi4fxT3GC2g&s',
                  }}
                  style={styles.smallButtonImage}
                />
                <Text style={styles.buttonText}>Foods To Avoid</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F9',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  outerContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6EBFF9',
    paddingVertical: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  menuButton: {
    marginLeft: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  topImage: {
    width: width * 0.9,
    height: height * 0.25,
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#6EBFF9',
    marginVertical: 10,
  },
  quoteContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  quoteText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    width: width * 0.45, // Adjusted to ensure both buttons are the same width
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 10,
  },
  smallButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    width: width * 0.28,
    marginRight: 10,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonImage: {
    width: '100%',
    height: 134,
    borderRadius: 20,
    marginBottom: 10,
  },
  smallButtonImage: {
    width: '100%',
    height: width * 0.28,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
    textAlign: 'center',
  },
  horizontalScrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default PatDashboard;
