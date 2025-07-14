import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, Filter, Grid2x2 as Grid, List, ShoppingCart, Heart, Star } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrowseFoodScreen() {
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 1, name: 'Rice', icon: '🍚' },
    { id: 2, name: 'Swallow', icon: '🍲' },
    { id: 3, name: 'Snacks', icon: '🍿' },
    { id: 4, name: 'Drinks', icon: '🥤' },
    { id: 5, name: 'Soup', icon: '🍜' },
  ];

  const foods = [
    { id: 1, name: 'Jollof Rice & Chicken', price: '₦1,500', rating: 4.8, image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', vendor: 'Mama Simi Kitchen', category: 'Rice' },
    { id: 2, name: 'Amala & Ewedu', price: '₦1,200', rating: 4.6, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', vendor: 'Buka Express', category: 'Swallow' },
    { id: 3, name: 'Fried Rice Special', price: '₦1,800', rating: 4.9, image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', vendor: 'Campus Delights', category: 'Rice' },
    { id: 4, name: 'Pounded Yam & Egusi', price: '₦1,600', rating: 4.7, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', vendor: 'Mama Cass Kitchen', category: 'Swallow' },
    { id: 5, name: 'Meat Pie', price: '₦400', rating: 4.3, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', vendor: 'Snack Corner', category: 'Snacks' },
    { id: 6, name: 'Coconut Rice', price: '₦1,400', rating: 4.5, image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', vendor: 'Tropical Taste', category: 'Rice' },
  ];

  const renderFoodCard = (food: any) => (
    <TouchableOpacity key={food.id} style={[styles.foodCard, viewMode === 'list' && styles.listCard]}>
      <Image source={{ uri: food.image }} style={[styles.foodImage, viewMode === 'list' && styles.listImage]} />
      <View style={[styles.foodInfo, viewMode === 'list' && styles.listInfo]}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.vendorName}>{food.vendor}</Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#f59e0b" />
          <Text style={styles.rating}>{food.rating}</Text>
          <Text style={styles.category}>• {food.category}</Text>
        </View>
        <Text style={styles.foodPrice}>{food.price}</Text>
        <View style={styles.foodActions}>
          <TouchableOpacity style={styles.addToCartButton}>
            <ShoppingCart size={16} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishlistButton}>
            <Heart size={16} color="#10b981" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#10b981" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* View Mode Toggle */}
      <View style={styles.viewModeContainer}>
        <Text style={styles.resultCount}>{foods.length} food items found</Text>
        <View style={styles.viewModeToggle}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'grid' && styles.activeViewMode]}
            onPress={() => setViewMode('grid')}
          >
            <Grid size={20} color={viewMode === 'grid' ? '#fff' : '#6b7280'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.activeViewMode]}
            onPress={() => setViewMode('list')}
          >
            <List size={20} color={viewMode === 'list' ? '#fff' : '#6b7280'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Foods */}
      <ScrollView style={styles.foodsContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.foodsGrid, viewMode === 'list' && styles.foodsList]}>
          {foods.map(renderFoodCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  categoriesContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    minWidth: 80,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f9fafb',
  },
  resultCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 4,
  },
  viewModeButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeViewMode: {
    backgroundColor: '#10b981',
  },
  foodsContainer: {
    flex: 1,
    padding: 20,
  },
  foodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  foodsList: {
    flexDirection: 'column',
  },
  foodCard: {
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
  listCard: {
    width: '100%',
    flexDirection: 'row',
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  listImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 12,
  },
  foodInfo: {
    padding: 12,
  },
  listInfo: {
    flex: 1,
    padding: 12,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  category: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  foodActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 1,
    marginRight: 8,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  wishlistButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10b981',
  },
});