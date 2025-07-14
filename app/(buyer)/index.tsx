import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Bell, MapPin, Zap, Gift, Clock, Star } from 'lucide-react-native';
import { useUser } from '@/hooks/useUser';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BuyerHomeScreen() {
  const { user } = useUser();

  const quickActions = [
    { id: 1, title: 'Flash Sales', icon: Zap, color: '#ef4444' },
    { id: 2, title: 'Pooled Delivery', icon: Clock, color: '#f59e0b' },
    { id: 3, title: 'Nearby Vendors', icon: MapPin, color: '#10b981' },
    { id: 4, title: 'Rewards', icon: Gift, color: '#8b5cf6' },
  ];

  const featuredFood = [
    { id: 1, name: 'Jollof Rice & Chicken', price: '₦1,500', rating: 4.8, image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', vendor: 'Mama Simi Kitchen' },
    { id: 2, name: 'Amala & Ewedu', price: '₦1,200', rating: 4.6, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', vendor: 'Buka Express' },
    { id: 3, name: 'Fried Rice Special', price: '₦1,800', rating: 4.9, image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', vendor: 'Campus Delights' },
  ];

  const categories = [
    { id: 1, name: 'Rice Dishes', icon: '🍚', count: '25+' },
    { id: 2, name: 'Swallow', icon: '🍲', count: '18+' },
    { id: 3, name: 'Snacks', icon: '🍿', count: '30+' },
    { id: 4, name: 'Drinks', icon: '🥤', count: '15+' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Hello, {user?.name || 'Student'}! 🍕</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#10b981" />
                <Text style={styles.location}>University of Ibadan</Text>
              </View>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Bell size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={styles.searchBar}>
            <Search size={20} color="#6b7280" />
            <Text style={styles.searchText}>Search for food, vendors...</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} items</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#fff" />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Food */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Today</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredFood.map((food) => (
              <TouchableOpacity key={food.id} style={styles.foodCard}>
                <Image source={{ uri: food.image }} style={styles.foodImage} />
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.vendorName}>{food.vendor}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#f59e0b" />
                    <Text style={styles.rating}>{food.rating}</Text>
                  </View>
                  <Text style={styles.foodPrice}>{food.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Order Status */}
        <View style={styles.orderStatusCard}>
          <View style={styles.orderStatusHeader}>
            <Text style={styles.orderStatusTitle}>Recent Order</Text>
            <Text style={styles.orderStatusTime}>15 mins ago</Text>
          </View>
          <Text style={styles.orderStatusFood}>Jollof Rice & Chicken from Mama Simi</Text>
          <View style={styles.orderStatusProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <Text style={styles.orderStatusText}>Being prepared...</Text>
          </View>
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
    padding: 20,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 5,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchText: {
    marginLeft: 10,
    color: '#6b7280',
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  foodCard: {
    width: 180,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  foodInfo: {
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
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  orderStatusCard: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderStatusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderStatusTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  orderStatusFood: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  orderStatusProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 2,
  },
  orderStatusText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
});