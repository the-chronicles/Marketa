import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Camera, Plus, ChartBar as BarChart3, Package, Settings, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SellerScreen() {
  const stats = [
    { label: 'Total Revenue', value: '₦245,000', color: '#10b981' },
    { label: 'Products Sold', value: '156', color: '#3b82f6' },
    { label: 'Active Listings', value: '23', color: '#f59e0b' },
    { label: 'Rating', value: '4.8★', color: '#ef4444' },
  ];

  const recentOrders = [
    { id: 1, product: 'Engineering Mathematics', buyer: 'John Doe', amount: '₦8,500', status: 'Delivered' },
    { id: 2, product: 'Wireless Headphones', buyer: 'Jane Smith', amount: '₦15,000', status: 'Processing' },
    { id: 3, product: 'Campus Hoodie', buyer: 'Mike Johnson', amount: '₦6,500', status: 'Shipped' },
  ];

  const myProducts = [
    { id: 1, name: 'Engineering Mathematics', price: '₦8,500', stock: 5, image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' },
    { id: 2, name: 'Wireless Headphones', price: '₦15,000', stock: 0, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg' },
    { id: 3, name: 'Campus Hoodie', price: '₦6,500', stock: 12, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Store</Text>
            <Text style={styles.subtitle}>Manage your products and orders</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.primaryAction}>
            <Camera size={24} color="#fff" />
            <Text style={styles.primaryActionText}>Snap & List Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction}>
            <Plus size={20} color="#10b981" />
            <Text style={styles.secondaryActionText}>Manual Add</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
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
                <Text style={styles.orderProduct}>{order.product}</Text>
                <Text style={styles.orderBuyer}>by {order.buyer}</Text>
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

        {/* My Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Manage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {myProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <View style={styles.stockContainer}>
                    <Text style={[styles.stockText, { color: product.stock > 0 ? '#10b981' : '#ef4444' }]}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Analytics Preview */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.analyticsCard}>
            <BarChart3 size={24} color="#10b981" />
            <View style={styles.analyticsInfo}>
              <Text style={styles.analyticsTitle}>View Detailed Analytics</Text>
              <Text style={styles.analyticsSubtitle}>Sales trends, customer insights & more</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Delivered': return '#10b981';
    case 'Processing': return '#f59e0b';
    case 'Shipped': return '#3b82f6';
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
    fontSize: 28,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
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
  orderProduct: {
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
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  productImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  stockContainer: {
    marginTop: 4,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  analyticsCard: {
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
  analyticsInfo: {
    marginLeft: 12,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  analyticsSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});