import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const FoodsToEatScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://www.zarla.com/images/zarla-healthy-food-logos-3526x3024-20211229.jpg?crop=1:1,smart&width=1200&dpr=2',
          }}
          style={styles.image}
          onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
        />
        <Text style={styles.text}>List of Foods to Control</Text>
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
              🍑 Papaya
            </Text>
            <Text style={styles.categoryFoodList}>
              🍈 Cantaloupe
            </Text>
            <Text style={styles.categoryFoodList}>
              🍍 Pineapple
            </Text>
            <Text style={styles.categoryFoodList}>
              🍇 Raisins
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
              🍠 Yam
            </Text>
            <Text style={styles.categoryFoodList}>
              🥕 Beetroot
            </Text>
            <Text style={styles.categoryFoodList}>
              🍠 Sweet Potato
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
              🥣 Muesli
            </Text>
            <Text style={styles.categoryFoodList}>
              🌾 Rye
            </Text>
            <Text style={styles.categoryFoodList}>
              🍛 Brown Rice
            </Text>
            <Text style={styles.categoryFoodList}>
              🍚 Couscous
            </Text>
            <Text style={styles.categoryFoodList}>
              🍛 Basmati Rice
            </Text>
          </View>
        </View>

        {/* Pulses */}
        
        {/* Dairy Products */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://media.istockphoto.com/id/544807136/photo/various-fresh-dairy-products.jpg?s=612x612&w=0&k=20&c=U5T70bi24itoTDive1CVonJbJ97ChyL2Pz1I2kOoSRo=' }}
            style={styles.categoryImage}
            onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
          />
          <Text style={styles.categoryText}>Dairy Products (Control these intakes)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
            🍦 Ice Crem
            </Text>
            
          </View>
        </View>

        {/* Nuts and Seeds */}
        <View style={styles.categoryContainer}>
  <Image
    source={{ uri: 'https://media.istockphoto.com/id/695071562/photo/nuts-assortment-on-rustic-wood-table.jpg?s=612x612&w=0&k=20&c=G1ndYym-HLo9FCKnA2kh9qq4_2Lz_fYJH6QPZmpPw_Q=' }}
    style={styles.categoryImage}
    onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
  />
  <Text style={styles.categoryText}>Other Foods (Food Items that need to be controlled)</Text>
  <View style={styles.foodListContainer}>
    <Text style={styles.categoryFoodList}>
      🍯 Honey
    </Text>
    <Text style={styles.categoryFoodList}>
      🍚 Table Sugar
    </Text>
    <Text style={styles.categoryFoodList}>
      🍬 Brown Sugar
    </Text>
    <Text style={styles.categoryFoodList}>
      🍜 Noodles
    </Text>
    <Text style={styles.categoryFoodList}>
      🥤 Soft Drinks
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
