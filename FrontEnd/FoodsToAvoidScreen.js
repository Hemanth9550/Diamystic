//            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzTE7y8KMzHy8lAXKRbnbUUssPOra-_YI-ShySFWjlxA&s',
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const FoodsToEatScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzTE7y8KMzHy8lAXKRbnbUUssPOra-_YI-ShySFWjlxA&s',
}}
          style={styles.image}
          onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
        />
        <Text style={styles.text}>List of Foods to Avoid</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        
        {/* Fruits */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7DNd_zlgrw-M57ILD9Pq4hoYonh04dhSG-Q&s' }}
            style={styles.categoryImage}
            onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
          />
          <Text style={styles.categoryText}>Fruits (Eat these Fruits in Oderation)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
            🍇 Grapes
            </Text>
            <Text style={styles.categoryFoodList}>
            🍉 Watermelon
            </Text>
            <Text style={styles.categoryFoodList}>
            🍈 Muskmelon
            </Text>
            
          </View>
        </View>

        {/* Vegetables */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg' }}
            style={styles.categoryImage}
            onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
          />
          <Text style={styles.categoryText}>Vegetables (To Eat in Moderation)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
            🥔 White Potato
            </Text>
            <Text style={styles.categoryFoodList}>
            🎃 Pumpkin
            </Text>
            
          </View>
        </View>

        {/* Cereals */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://www.srnutrition.co.uk/wp-content/uploads/2020/06/breakfast-cereals5-1024x769.jpg.webp' }}
            style={styles.categoryImage}
            onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
          />
          <Text style={styles.categoryText}>Cereals (Mae sure to control These cereals)</Text>
          <View style={styles.foodListContainer}>
          <Text style={styles.categoryFoodList}>
      🍚 White Rice
    </Text>
    <Text style={styles.categoryFoodList}>
      🍘 Puffed Rice
    </Text>
    <Text style={styles.categoryFoodList}>
      🍞 Bread
    </Text>
    <Text style={styles.categoryFoodList}>
      🥣 Instant Oats
    </Text>
    <Text style={styles.categoryFoodList}>
      🌾 Jowar
    </Text>
    <Text style={styles.categoryFoodList}>
      🌾 Wheat
    </Text>
    <Text style={styles.categoryFoodList}>
      🌾 Refined Flour (Maida)
    </Text>
          </View>
        </View>

        {/* Pulses */}
        
        {/* Dairy Products */}
        

        {/* Nuts and Seeds */}
        <View style={styles.categoryContainer}>
  <Image
    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKbkBmzfquTztZd7wk9zMTohXAkZVIXr0mw&s' }}
    style={styles.categoryImage}
    onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
  />
  <Text style={styles.categoryText}>Other Foods (Food Items that need to be controlled)</Text>
  <View style={styles.foodListContainer}>
    <Text style={styles.categoryFoodList}>
    🍯 Jaggery
    </Text>
    <Text style={styles.categoryFoodList}>
    🍪 Cookies
    </Text>
    <Text style={styles.categoryFoodList}>
    🌽 Cornflakes
    </Text>
    <Text style={styles.categoryFoodList}>
    🍰 Cake
    </Text>
    
  </View>
</View>

        {/* Other Foods */}
        {/* Add other food categories as needed */}
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  categoriesContainer: {
    width: '100%',
    marginTop: 20,
  },
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  foodListContainer: {
    marginTop: 10,
  },
  categoryFoodList: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default FoodsToEatScreen;
