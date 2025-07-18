import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChefHat, Plus, Minus, ShoppingCart, Clock, Users } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecipeBuilderScreen() {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const recipes = [
    {
      id: 1,
      name: 'Jollof Rice',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      servings: 4,
      cookTime: '45 mins',
      difficulty: 'Easy',
      description: 'Classic Nigerian one-pot rice dish with tomatoes and spices'
    },
    {
      id: 2,
      name: 'Fried Rice',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      servings: 4,
      cookTime: '30 mins',
      difficulty: 'Medium',
      description: 'Colorful rice dish with vegetables and protein'
    },
    {
      id: 3,
      name: 'Coconut Rice',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      servings: 4,
      cookTime: '40 mins',
      difficulty: 'Easy',
      description: 'Aromatic rice cooked in coconut milk'
    },
    {
      id: 4,
      name: 'Egusi Soup',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      servings: 6,
      cookTime: '60 mins',
      difficulty: 'Hard',
      description: 'Traditional Nigerian soup made with ground melon seeds'
    },
  ];

  const jollofIngredients = [
    { id: 1, name: 'Rice (Long grain)', quantity: '3 cups', price: 800, vendor: 'Mama Simi Kitchen', selected: true },
    { id: 2, name: 'Tomatoes (Fresh)', quantity: '4 large', price: 400, vendor: 'Fresh Produce UI', selected: true },
    { id: 3, name: 'Red Bell Pepper', quantity: '2 pieces', price: 300, vendor: 'Fresh Produce UI', selected: true },
    { id: 4, name: 'Onions', quantity: '2 medium', price: 200, vendor: 'Fresh Produce UI', selected: true },
    { id: 5, name: 'Chicken (Cut pieces)', quantity: '1 kg', price: 2500, vendor: 'Meat Palace', selected: true },
    { id: 6, name: 'Curry Powder', quantity: '2 tbsp', price: 150, vendor: 'Spice Corner', selected: true },
    { id: 7, name: 'Thyme (Dried)', quantity: '1 tbsp', price: 100, vendor: 'Spice Corner', selected: true },
    { id: 8, name: 'Bay Leaves', quantity: '3 pieces', price: 50, vendor: 'Spice Corner', selected: false },
    { id: 9, name: 'Vegetable Oil', quantity: '1/2 cup', price: 300, vendor: 'Grocery Hub', selected: true },
    { id: 10, name: 'Stock Cubes', quantity: '3 pieces', price: 150, vendor: 'Grocery Hub', selected: true },
  ];

  const handleRecipeSelect = (recipe: any) => {
    setSelectedRecipe(recipe);
    if (recipe.id === 1) {
      setIngredients(jollofIngredients);
    }
  };

  const toggleIngredient = (id: number) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, selected: !ing.selected } : ing
    ));
  };

  const getTotalPrice = () => {
    return ingredients.filter(ing => ing.selected).reduce((total, ing) => total + ing.price, 0);
  };

  const getSelectedCount = () => {
    return ingredients.filter(ing => ing.selected).length;
  };

  if (selectedRecipe) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Recipe Header */}
          <View style={styles.recipeHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedRecipe(null)}
            >
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Image source={{ uri: selectedRecipe.image }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>{selectedRecipe.name}</Text>
              <Text style={styles.recipeDescription}>{selectedRecipe.description}</Text>
              <View style={styles.recipeStats}>
                <View style={styles.statItem}>
                  <Users size={16} color="#6b7280" />
                  <Text style={styles.statText}>{selectedRecipe.servings} servings</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.statText}>{selectedRecipe.cookTime}</Text>
                </View>
                <View style={styles.statItem}>
                  <ChefHat size={16} color="#6b7280" />
                  <Text style={styles.statText}>{selectedRecipe.difficulty}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Ingredients List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🛒 Shopping List</Text>
            <Text style={styles.sectionSubtitle}>
              Select ingredients you need • {getSelectedCount()} items selected
            </Text>
            
            {ingredients.map((ingredient) => (
              <TouchableOpacity
                key={ingredient.id}
                style={[styles.ingredientCard, !ingredient.selected && styles.unselectedCard]}
                onPress={() => toggleIngredient(ingredient.id)}
              >
                <View style={styles.ingredientInfo}>
                  <View style={styles.ingredientHeader}>
                    <Text style={[styles.ingredientName, !ingredient.selected && styles.unselectedText]}>
                      {ingredient.name}
                    </Text>
                    <Text style={[styles.ingredientPrice, !ingredient.selected && styles.unselectedText]}>
                      ₦{ingredient.price}
                    </Text>
                  </View>
                  <Text style={[styles.ingredientQuantity, !ingredient.selected && styles.unselectedText]}>
                    {ingredient.quantity}
                  </Text>
                  <Text style={[styles.vendorName, !ingredient.selected && styles.unselectedText]}>
                    from {ingredient.vendor}
                  </Text>
                </View>
                <View style={[styles.checkbox, ingredient.selected && styles.checkedBox]}>
                  {ingredient.selected && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Order Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <Text style={styles.totalPrice}>₦{getTotalPrice().toLocaleString()}</Text>
            </View>
            <Text style={styles.summaryText}>
              {getSelectedCount()} ingredients selected for {selectedRecipe.name}
            </Text>
            <TouchableOpacity style={styles.addToCartButton}>
              <ShoppingCart size={20} color="#fff" />
              <Text style={styles.addToCartText}>Add All to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📝 Recipe Builder</Text>
          <Text style={styles.subtitle}>What do you want to cook today?</Text>
        </View>

        {/* How it Works */}
        <View style={styles.howItWorksCard}>
          <Text style={styles.howItWorksTitle}>How it works:</Text>
          <View style={styles.stepContainer}>
            <Text style={styles.step}>1️⃣ Choose a recipe you want to cook</Text>
            <Text style={styles.step}>2️⃣ We'll show you all ingredients & prices</Text>
            <Text style={styles.step}>3️⃣ Select what you need & add to cart</Text>
            <Text style={styles.step}>4️⃣ Get everything delivered together!</Text>
          </View>
        </View>

        {/* Recipe Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Recipes</Text>
          <View style={styles.recipesGrid}>
            {recipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                style={styles.recipeCard}
                onPress={() => handleRecipeSelect(recipe)}
              >
                <Image source={{ uri: recipe.image }} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{recipe.name}</Text>
                  <View style={styles.cardStats}>
                    <View style={styles.cardStat}>
                      <Users size={12} color="#6b7280" />
                      <Text style={styles.cardStatText}>{recipe.servings}</Text>
                    </View>
                    <View style={styles.cardStat}>
                      <Clock size={12} color="#6b7280" />
                      <Text style={styles.cardStatText}>{recipe.cookTime}</Text>
                    </View>
                  </View>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(recipe.difficulty) }]}>
                    <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>💡 Why use Recipe Builder?</Text>
          <Text style={styles.benefitText}>• Never forget ingredients again</Text>
          <Text style={styles.benefitText}>• Compare prices across vendors</Text>
          <Text style={styles.benefitText}>• Get everything in one delivery</Text>
          <Text style={styles.benefitText}>• Save time and money</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Easy': return '#10b981';
    case 'Medium': return '#f59e0b';
    case 'Hard': return '#ef4444';
    default: return '#6b7280';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  howItWorksCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  howItWorksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 12,
  },
  stepContainer: {
    gap: 8,
  },
  step: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  recipesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardInfo: {
    padding: 12,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStatText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  benefitsCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    margin: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    lineHeight: 20,
  },
  // Recipe Detail Styles
  recipeHeader: {
    backgroundColor: '#f9fafb',
  },
  backButton: {
    padding: 20,
    paddingBottom: 0,
  },
  backText: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeInfo: {
    padding: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 24,
  },
  recipeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  ingredientCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unselectedCard: {
    backgroundColor: '#f9fafb',
    opacity: 0.7,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  ingredientPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  ingredientQuantity: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 12,
    color: '#6b7280',
  },
  unselectedText: {
    color: '#9ca3af',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkedBox: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
  summaryText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});