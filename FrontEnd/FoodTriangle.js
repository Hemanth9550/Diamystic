import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  // Correct import for MaterialCommunityIcons

const { width, height } = Dimensions.get('window');

const FoodTriangle = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Healthy Eating Food Pyramid</Text>
        <Image
          source={{
            uri: imageError
              ? 'https://via.placeholder.com/360x250.png?text=Image+Not+Available'
              : 'https://www.chp.gov.hk/files/jpg/adult_eng.jpg',
          }}
          style={styles.image}
          resizeMode="cover"
          onError={handleImageError}
        />
        <Text style={styles.sectionHeading}>General Guidelines for All Ages</Text>
        
        {/* Food Categories */}
        {foodItems.map((item, index) => (
          <View key={index} style={styles.foodItem}>
            <Text style={styles.foodHeading}>
              <MaterialCommunityIcons name={item.icon} size={20} color={item.color} /> {item.title}
            </Text>
            <Text style={styles.text}>{item.description}</Text>
          </View>
        ))}

        {/* Healthy Eating Pyramid for Specific Age Groups */}
        <Text style={styles.sectionHeading}>Healthy Eating Food Pyramid for Specific Age Groups</Text>
        {ageGroups.map((group, index) => (
          <View key={index}>
            <Text style={styles.subHeading}>{group.title}</Text>
            {group.items.map((item, idx) => (
              <View key={idx} style={styles.foodItem}>
                <Text style={styles.foodHeading}>
                  <MaterialCommunityIcons name={item.icon} size={20} color={item.color} /> {item.title}
                </Text>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.notes}>
          Notes: {'\n'}
          1 "tael" is approximately 40 grams (of raw meat). {'\n'}
          1 bowl is approximately 250-300ml. {'\n'}
          1 cup is approximately 240ml. {'\n'}
          These guidelines are intended for healthy individuals. Those with chronic diseases or specific nutritional needs should consult their doctors or dietitians for personalized dietary recommendations.
        </Text>
      </View>
    </ScrollView>
  );
};

const foodItems = [
  {
    title: 'Grains',
    icon: 'bread-slice',
    color: 'brown',
    description: 'Consume 3 to 8 servings daily. Examples: 1 bowl of cooked rice or noodles, 2 slices of bread.',
  },
  {
    title: 'Vegetables',
    icon: 'leaf',
    color: 'green',
    description: 'Aim for at least 3 servings daily. Examples: 1/2 bowl of cooked vegetables, 1 bowl of raw vegetables.',
  },
  {
    title: 'Fruits',
    icon: 'apple',
    color: 'red',
    description: 'Include at least 2 servings daily. Examples: 1 medium-sized apple, 2 small kiwifruits, 1/2 bowl of fruit slices.',
  },
  {
    title: 'Meat, Fish, Eggs, and Alternatives',
    icon: 'fish',
    color: 'blue',
    description: 'Consume 5 to 8 "taels" (approximately 200-320 grams) daily. Examples: 4-5 slices of cooked meat, 1 egg, 1/4 block of firm tofu.',
  },
  {
    title: 'Milk and Alternatives',
    icon: 'cup',
    color: 'orange',
    description: 'Have 1-2 servings daily. Examples: 1 cup of low-fat milk, 2 slices of low-fat cheese, 1 pot (150g) of low-fat plain yogurt.',
  },
  {
    title: 'Fats/Oils, Salt, and Sugar',
    icon: 'oil',
    color: 'purple',
    description: 'Use sparingly.',
  },
  {
    title: 'Fluids',
    icon: 'water',
    color: 'teal',
    description: 'Drink 6 to 8 glasses daily, including water, tea, clear soups, etc.',
  },
];

const ageGroups = [
  {
    title: 'Children (Aged 2-5 years)',
    items: [
      { title: 'Grains', icon: 'bread-slice', color: 'brown', description: '1.5 - 3 servings' },
      { title: 'Vegetables', icon: 'leaf', color: 'green', description: 'at least 1.5 servings' },
      { title: 'Fruits', icon: 'apple', color: 'red', description: 'at least 1 serving' },
      { title: 'Meat, Fish, Eggs, and Alternatives', icon: 'fish', color: 'blue', description: '1.5 - 3 taels' },
      { title: 'Milk and Alternatives', icon: 'cup', color: 'orange', description: '2 servings' },
      { title: 'Fluids', icon: 'water', color: 'teal', description: '4 - 5 glasses' },
    ],
  },
  {
    title: 'Children (Aged 6-11 years)',
    items: [
      { title: 'Grains', icon: 'bread-slice', color: 'brown', description: '3 - 4 servings' },
      { title: 'Vegetables', icon: 'leaf', color: 'green', description: 'approximately 2 servings' },
      { title: 'Fruits', icon: 'apple', color: 'red', description: 'at least 2 servings' },
      { title: 'Meat, Fish, Eggs, and Alternatives', icon: 'fish', color: 'blue', description: '3 - 5 taels' },
      { title: 'Milk and Alternatives', icon: 'cup', color: 'orange', description: '2 servings' },
      { title: 'Fluids', icon: 'water', color: 'teal', description: '6 - 8 glasses' },
    ],
  },
  {
    title: 'Teens (Aged 12-17 years)',
    items: [
      { title: 'Grains', icon: 'bread-slice', color: 'brown', description: '4 - 6 servings' },
      { title: 'Vegetables', icon: 'leaf', color: 'green', description: 'at least 3 servings' },
      { title: 'Fruits', icon: 'apple', color: 'red', description: 'at least 2 servings' },
      { title: 'Meat, Fish, Eggs, and Alternatives', icon: 'fish', color: 'blue', description: '4 - 6 taels' },
      { title: 'Milk and Alternatives', icon: 'cup', color: 'orange', description: '2 servings' },
      { title: 'Fluids', icon: 'water', color: 'teal', description: '6 - 8 glasses' },
    ],
  },
  {
    title: 'Adults',
    items: [
      { title: 'Grains', icon: 'bread-slice', color: 'brown', description: '3 - 8 servings' },
      { title: 'Vegetables', icon: 'leaf', color: 'green', description: 'approximately 3 servings' },
      { title: 'Fruits', icon: 'apple', color: 'red', description: 'at least 2 servings' },
      { title: 'Meat, Fish, Eggs, and Alternatives', icon: 'fish', color: 'blue', description: '5 - 8 taels' },
      { title: 'Milk and Alternatives', icon: 'cup', color: 'orange', description: '1 - 2 servings' },
      { title: 'Fluids', icon: 'water', color: 'teal', description: '6 - 8 glasses' },
    ],
  },
  {
    title: 'Older Adults',
    items: [
      { title: 'Grains', icon: 'bread-slice', color: 'brown', description: '3 - 5 servings' },
      { title: 'Vegetables', icon: 'leaf', color: 'green', description: 'approximately 3 servings' },
      { title: 'Fruits', icon: 'apple', color: 'red', description: 'at least 2 servings' },
      { title: 'Meat, Fish, Eggs, and Alternatives', icon: 'fish', color: 'blue', description: '5 - 6 taels' },
      { title: 'Milk and Alternatives', icon: 'cup', color: 'orange', description: '1 - 2 servings' },
      { title: 'Fluids', icon: 'water', color: 'teal', description: '6 - 8 glasses' },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  foodItem: {
    marginBottom: 15,
  },
  foodHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 15,
    marginBottom: 15,
  },
  notes: {
    marginTop: 20,
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
  },
});

export default FoodTriangle;
