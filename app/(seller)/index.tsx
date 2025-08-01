import { navigate } from 'expo-router/build/global-state/routing';
import { Camera, Clock, DollarSign, Package, Plus, Settings, Star, TrendingUp } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SellerDashboardScreen() {
  const stats = [
    { label: 'Today\'s Revenue', value: '₦25,400', color: '#10b981', icon: DollarSign },
    { label: 'Orders Today', value: '18', color: '#3b82f6', icon: Package },
    { label: 'Avg. Rating', value: '4.8★', color: '#f59e0b', icon: Star },
    { label: 'Response Time', value: '2 mins', color: '#ef4444', icon: Clock },
  ];

  const recentOrders = [
    { id: 1, food: 'Jollof Rice & Chicken', buyer: 'John Doe', amount: '₦1,500', status: 'Preparing', time: '5 mins ago' },
    { id: 2, food: 'Fried Rice Special', buyer: 'Jane Smith', amount: '₦1,800', status: 'Ready', time: '10 mins ago' },
    { id: 3, food: 'Amala & Ewedu', buyer: 'Mike Johnson', amount: '₦1,200', status: 'Delivered', time: '25 mins ago' },
  ];

  const myFoods = [
    { id: 1, name: 'Jollof Rice & Chicken', price: '₦1,500', available: true, orders: 12, image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg' },
    { id: 2, name: 'Fried Rice Special', price: '₦1,800', available: true, orders: 8, image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg' },
    { id: 3, name: 'Amala & Ewedu', price: '₦1,200', available: false, orders: 15, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>👨‍🍳 Mama Simi Kitchen</Text>
            <Text style={styles.subtitle}>Manage your food business</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.primaryAction} onPress={() => navigate('/add-food')}>
            <Camera size={24} color="#fff" />
            <Text style={styles.primaryActionText}>📸 Snap & Add Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction}>
            <Plus size={20} color="#10b981" />
            <Text style={styles.secondaryActionText}>Manual Add</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Today&apos;s Performance</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <stat.icon size={20} color={stat.color} />
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderFood}>{order.food}</Text>
                <Text style={styles.orderBuyer}>by {order.buyer} • {order.time}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={styles.orderAmount}>{order.amount}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* My Foods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Food Menu</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Manage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.foodsGrid}>
            {myFoods.map((food) => (
              <View key={food.id} style={styles.foodCard}>
                <Image source={{ uri: food.image }} style={styles.foodImage} />
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodPrice}>{food.price}</Text>
                  <View style={styles.foodMeta}>
                    <Text style={styles.ordersCount}>{food.orders} orders today</Text>
                    <View style={[styles.availabilityBadge, { backgroundColor: food.available ? '#10b981' : '#ef4444' }]}>
                      <Text style={styles.availabilityText}>
                        {food.available ? 'Available' : 'Sold Out'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Performance Insights */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.insightsCard}>
            <TrendingUp size={24} color="#10b981" />
            <View style={styles.insightsInfo}>
              <Text style={styles.insightsTitle}>📊 View Detailed Analytics</Text>
              <Text style={styles.insightsSubtitle}>Sales trends, popular items & customer insights</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Preparing': return '#f59e0b';
    case 'Ready': return '#10b981';
    case 'Delivered': return '#3b82f6';
    default: return '#6b7280';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  settingsButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  primaryAction: {
    flex: 2,
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  secondaryActionText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsContainer: {
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
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
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  orderCard: {
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
  orderInfo: {
    flex: 1,
  },
  orderFood: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  orderBuyer: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  foodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  foodImage: {
    width: '100%',
    height: 100,
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
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  foodMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ordersCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  availabilityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  availabilityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  insightsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightsInfo: {
    marginLeft: 12,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  insightsSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});