import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, Filter, Grid2x2 as Grid, List, ShoppingCart, Heart } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrowseScreen() {
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 1, name: 'Books', icon: '📚' },
    { id: 2, name: 'Electronics', icon: '💻' },
    { id: 3, name: 'Clothing', icon: '👕' },
    { id: 4, name: 'Food', icon: '🍕' },
    { id: 5, name: 'Accessories', icon: '🎒' },
  ];

  const products = [
    { id: 1, name: 'Engineering Mathematics', price: '₦8,500', rating: 4.5, image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg', seller: 'BookStore UI' },
    { id: 2, name: 'Wireless Headphones', price: '₦15,000', rating: 4.8, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg', seller: 'Tech Hub' },
    { id: 3, name: 'Campus Hoodie', price: '₦6,500', rating: 4.2, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', seller: 'UI Fashion' },
    { id: 4, name: 'Study Lamp', price: '₦4,200', rating: 4.6, image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg', seller: 'Home Essentials' },
  ];

  const renderProductCard = (product: any) => (
    <TouchableOpacity key={product.id} style={[styles.productCard, viewMode === 'list' && styles.listCard]}>
      <Image source={{ uri: product.image }} style={[styles.productImage, viewMode === 'list' && styles.listImage]} />
      <View style={[styles.productInfo, viewMode === 'list' && styles.listInfo]}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.sellerName}>{product.seller}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {product.rating}</Text>
        </View>
        <Text style={styles.productPrice}>{product.price}</Text>
        <View style={styles.productActions}>
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
            placeholder="Search products..."
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
        <Text style={styles.resultCount}>{products.length} products found</Text>
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

      {/* Products */}
      <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.productsGrid, viewMode === 'list' && styles.productsList]}>
          {products.map(renderProductCard)}
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
  productsContainer: {
    flex: 1,
    padding: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productsList: {
    flexDirection: 'column',
  },
  productCard: {
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
  productImage: {
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
  productInfo: {
    padding: 12,
  },
  listInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#f59e0b',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  productActions: {
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