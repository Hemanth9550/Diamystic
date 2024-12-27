import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const FoodsToEatScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8TeWI-ExbnpDmx3J-GG4S9C40vcpxbt0hqy2ehCYTQ&s',
          }}
          style={styles.image}
        />
        <Text style={styles.text}>List of Foods to Eat</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {/* Fruits */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7DNd_zlgrw-M57ILD9Pq4hoYonh04dhSG-Q&s' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Fruits (e.g., apricots, apples, oranges, dates, strawberries, grapefruit, peaches, kiwi, prunes, plum, pears, berries, pomegranate, guava, banana, figs, mango)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
              🍑 Apricots
            </Text>
            <Text style={styles.categoryFoodList}>
              🍏 Apple
            </Text>
            <Text style={styles.categoryFoodList}>
              🍊 Oranges
            </Text>
            <Text style={styles.categoryFoodList}>
              🌟 Dates
            </Text>
            <Text style={styles.categoryFoodList}>
              🍓 Strawberry
            </Text>
            <Text style={styles.categoryFoodList}>
              🍊 Grapefruit
            </Text>
            <Text style={styles.categoryFoodList}>
              🍑 Peaches
            </Text>
            <Text style={styles.categoryFoodList}>
              🥝 Kiwi
            </Text>
            <Text style={styles.categoryFoodList}>
              🍑 Prunes
            </Text>
            <Text style={styles.categoryFoodList}>
              🍑 Plum
            </Text>
            <Text style={styles.categoryFoodList}>
              🍐 Pears
            </Text>
            <Text style={styles.categoryFoodList}>
              🍓 Berries
            </Text>
            <Text style={styles.categoryFoodList}>
              🍅 Pomegranate
            </Text>
            <Text style={styles.categoryFoodList}>
              🍈 Guava
            </Text>
            <Text style={styles.categoryFoodList}>
              🍌 Banana
            </Text>
            <Text style={styles.categoryFoodList}>
              🍈 Figs
            </Text>
            <Text style={styles.categoryFoodList}>
              🥭 Mango
            </Text>
          </View>
        </View>

        {/* Vegetables */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Vegetables (e.g., ladyfinger, green beans, onion, cabbage, green peas, radish, brinjal, cauliflower, cucumber, carrot, broccoli, peppers, tomato)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
              🥕 Carrots
            </Text>
            <Text style={styles.categoryFoodList}>
              🥦 Broccoli
            </Text>
            <Text style={styles.categoryFoodList}>
              🥦 Cauliflower
            </Text>
            <Text style={styles.categoryFoodList}>
              🌽 Corn
            </Text>
            <Text style={styles.categoryFoodList}>
              🍆 Eggplant
            </Text>
            <Text style={styles.categoryFoodList}>
              🥒 Cucumber
            </Text>
            <Text style={styles.categoryFoodList}>
              🌶️ Bell Peppers
            </Text>
            <Text style={styles.categoryFoodList}>
              🥦 Brussels Sprouts
            </Text>
            <Text style={styles.categoryFoodList}>
              🥬 Kale
            </Text>
            <Text style={styles.categoryFoodList}>
              🥬 Spinach
            </Text>
            <Text style={styles.categoryFoodList}>
              🥬 Lettuce
            </Text>
            <Text style={styles.categoryFoodList}>
              🥦 Zucchini
            </Text>
            <Text style={styles.categoryFoodList}>
              🥦 Squash
            </Text>
            <Text style={styles.categoryFoodList}>
              🍅 Tomatoes
            </Text>
            <Text style={styles.categoryFoodList}>
              🥦 Green Beans
            </Text>
            <Text style={styles.categoryFoodList}>
              🥕 Radishes
            </Text>
            <Text style={styles.categoryFoodList}>
              🥬 Swiss Chard
            </Text>
          </View>
        </View>

        {/* Meats */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://t3.ftcdn.net/jpg/02/26/53/80/360_F_226538033_C42p96JDNwkSdQs86Agxd1TtaVJsyJ71.jpg' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Meats (e.g., chicken, turkey, beef, pork, lamb, bison, venison, fish, shrimp, lobster, squid, octopus, crab, rabbit)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
              🍗 Chicken Breast
            </Text>
            <Text style={styles.categoryFoodList}>
              🦃 Turkey Breast
            </Text>
            <Text style={styles.categoryFoodList}>
              🥩 Lean Beef
            </Text>
            <Text style={styles.categoryFoodList}>
              🐖 Pork Tenderloin
            </Text>
            <Text style={styles.categoryFoodList}>
              🦌 Venison
            </Text>
            <Text style={styles.categoryFoodList}>
              🐑 Lamb
            </Text>
            <Text style={styles.categoryFoodList}>
              🐄 Bison
            </Text>
            <Text style={styles.categoryFoodList}>
              🐔 Chicken Thighs
            </Text>
            <Text style={styles.categoryFoodList}>
              🐇 Rabbit
            </Text>
            <Text style={styles.categoryFoodList}>
              🐓 Chicken Wings
            </Text>
            <Text style={styles.categoryFoodList}>
              🐟 Salmon
            </Text>
            <Text style={styles.categoryFoodList}>
              🦞 Lobster
            </Text>
            <Text style={styles.categoryFoodList}>
              🦐 Shrimp
            </Text>
            <Text style={styles.categoryFoodList}>
              🐟 Cod
            </Text>
            <Text style={styles.categoryFoodList}>
              🦑 Squid
            </Text>
            <Text style={styles.categoryFoodList}>
              🐙 Octopus
            </Text>
            <Text style={styles.categoryFoodList}>
              🦀 Crab
            </Text>
            <Text style={styles.categoryFoodList}>
              🐠 Trout
            </Text>
          </View>
        </View>

        {/* Cereals */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://www.srnutrition.co.uk/wp-content/uploads/2020/06/breakfast-cereals5-1024x769.jpg.webp' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Cereals (e.g., barley, oatmeal, bran, quinoa, corn, peanuts, spaghetti, poha, whole wheat, daliya)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
              🍚 Quinoa
            </Text>
            <Text style={styles.categoryFoodList}>
              🥣 Oats
            </Text>
            <Text style={styles.categoryFoodList}>
              🍲 Lentils
            </Text>
            <Text style={styles.categoryFoodList}>
              🧆 Chickpeas
            </Text>
            <Text style={styles.categoryFoodList}>
              🖤 Black Beans
            </Text>
            <Text style={styles.categoryFoodList}>
              🍚 Kidney Beans
            </Text>
            <Text style={styles.categoryFoodList}>
              🍛 Pinto Beans
            </Text>
            <Text style={styles.categoryFoodList}>
              🍱 Brown Rice
            </Text>
            <Text style={styles.categoryFoodList}>
              🍙 Wild Rice
            </Text>
            <Text style={styles.categoryFoodList}>
              🍙 Bulgar
            </Text>
            <Text style={styles.categoryFoodList}>
              🍛 Basmati Rice
            </Text>
            <Text style={styles.categoryFoodList}>
              🍛 Jasmine Rice
            </Text>
            <Text style={styles.categoryFoodList}>
              🍙 Sushi Rice
            </Text>
            <Text style={styles.categoryFoodList}>
              🍚 Arborio Rice
            </Text>
          </View>
        </View>

        {/* Pulses */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://t3.ftcdn.net/jpg/06/62/73/32/360_F_662733296_YAY9Y4epU7miuyRa8eHNOINraeVRIBwB.jpg' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Pulses (e.g., green gram, black-eyed peas, chickpeas, soybeans, kidney beans)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
              🌿 Green Gram
            </Text>
            <Text style={styles.categoryFoodList}>
              🖤 Black-Eyed Peas
            </Text>
            <Text style={styles.categoryFoodList}>
              🧆 Chickpeas
            </Text>
            <Text style={styles.categoryFoodList}>
              🌱 Soybeans
            </Text>
            <Text style={styles.categoryFoodList}>
              🍛 Kidney Beans
            </Text>
            <Text style={styles.categoryFoodList}>
              🍙 Lentils
            </Text>
            <Text style={styles.categoryFoodList}>
              🍲 Black Beans
            </Text>
            <Text style={styles.categoryFoodList}>
              🍛 Pinto Beans
            </Text>
            <Text style={styles.categoryFoodList}>
              🍱 Fava Beans
            </Text>
            <Text style={styles.categoryFoodList}>
              🍙 Peas
            </Text>
          </View>
        </View>

        {/* Dairy Products */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://media.istockphoto.com/id/544807136/photo/various-fresh-dairy-products.jpg?s=612x612&w=0&k=20&c=U5T70bi24itoTDive1CVonJbJ97ChyL2Pz1I2kOoSRo=' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Dairy Products (e.g., milk, curd, yogurt, paneer, buttermilk, cheese)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
              🥛 Milk
            </Text>
            <Text style={styles.categoryFoodList}>
              🍶 Curd
            </Text>
            <Text style={styles.categoryFoodList}>
              🥭 Yogurt
            </Text>
            
            <Text style={styles.categoryFoodList}>
              🍼 Buttermilk
            </Text>
            <Text style={styles.categoryFoodList}>
              🧀 Paneer
            </Text>
            
            
            
          </View>
        </View>

        {/* Nuts and Seeds */}
        <View style={styles.categoryContainer}>
          <Image
            source={{ uri: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/9884/GettyImages-179751167.jpg' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Nuts and Seeds (e.g., walnuts, almonds, sunflower seeds, pumpkin seeds)</Text>
          <View style={styles.foodListContainer}>
            <Text style={styles.categoryFoodList}>
              🥜 Walnuts
            </Text>
            <Text style={styles.categoryFoodList}>
              🌰 Almonds
            </Text>
            <Text style={styles.categoryFoodList}>
              🌻 Sunflower Seeds
            </Text>
            <Text style={styles.categoryFoodList}>
              🎃 Pumpkin Seeds
            </Text>
            <Text style={styles.categoryFoodList}>
              🥥 Coconut
            </Text>
            <Text style={styles.categoryFoodList}>
              🌰 Hazelnuts
            </Text>
            <Text style={styles.categoryFoodList}>
              🥜 Peanuts
            </Text>
            <Text style={styles.categoryFoodList}>
              🌱 Chia Seeds
            </Text>
            <Text style={styles.categoryFoodList}>
              🌰 Flaxseeds
            </Text>
            <Text style={styles.categoryFoodList}>
              🍯 Sesame Seeds
            </Text>
          </View>
        </View>

        {/* Other Foods */}
        
        
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
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foodListContainer: {
    marginLeft: 20,
    marginRight: 10,
  },
  categoryFoodList: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default FoodsToEatScreen;
