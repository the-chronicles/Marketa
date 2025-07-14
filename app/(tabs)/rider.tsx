import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Package, DollarSign, Navigation, Phone } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RiderScreen() {
  const todayStats = [
    { label: 'Deliveries', value: '12', color: '#10b981' },
    { label: 'Earnings', value: '₦8,400', color: '#3b82f6' },
    { label: 'Distance', value: '45km', color: '#f59e0b' },
    { label: 'Rating', value: '4.9★', color: '#ef4444' },
  ];

  const activeDeliveries = [
    { 
      id: 1, 
      orderNumber: 'MKT-001', 
      pickup: 'BookStore UI', 
      delivery: 'Tedder Hall', 
      amount: '₦500', 
      status: 'Picked Up',
      distance: '2.5km',
      time: '15 mins'
    },
    { 
      id: 2, 
      orderNumber: 'MKT-002', 
      pickup: 'Tech Hub', 
      delivery: 'Queen Mary Hall', 
      amount: '₦750', 
      status: 'Ready for Pickup',
      distance: '3.2km',
      time: '20 mins'
    },
  ];

  const completedDeliveries = [
    { id: 1, orderNumber: 'MKT-098', destination: 'Kuti Hall', amount: '₦500', time: '2 hours ago' },
    { id: 2, orderNumber: 'MKT-097', destination: 'Awo Hall', amount: '₦750', time: '4 hours ago' },
    { id: 3, orderNumber: 'MKT-096', destination: 'Mellanby Hall', amount: '₦600', time: '5 hours ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Rider Dashboard</Text>
            <Text style={styles.subtitle}>Track your deliveries and earnings</Text>
          </View>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusText}>Online</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <View style={styles.statsGrid}>
            {todayStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Active Deliveries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Deliveries</Text>
          {activeDeliveries.map((delivery) => (
            <View key={delivery.id} style={styles.deliveryCard}>
              <View style={styles.deliveryHeader}>
                <Text style={styles.orderNumber}>{delivery.orderNumber}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(delivery.status) }]}>
                  <Text style={styles.statusBadgeText}>{delivery.status}</Text>
                </View>
              </View>
              
              <View style={styles.deliveryRoute}>
                <View style={styles.routeItem}>
                  <MapPin size={16} color="#10b981" />
                  <Text style={styles.routeText}>Pick up from {delivery.pickup}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routeItem}>
                  <MapPin size={16} color="#ef4444" />
                  <Text style={styles.routeText}>Deliver to {delivery.delivery}</Text>
                </View>
              </View>
              
              <View style={styles.deliveryInfo}>
                <View style={styles.infoItem}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.infoText}>{delivery.time}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Navigation size={16} color="#6b7280" />
                  <Text style={styles.infoText}>{delivery.distance}</Text>
                </View>
                <View style={styles.infoItem}>
                  <DollarSign size={16} color="#6b7280" />
                  <Text style={styles.infoText}>{delivery.amount}</Text>
                </View>
              </View>
              
              <View style={styles.deliveryActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Navigation size={16} color="#fff" />
                  <Text style={styles.actionText}>Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton}>
                  <Phone size={16} color="#10b981" />
                  <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Completed Deliveries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Completed</Text>
          {completedDeliveries.map((delivery) => (
            <View key={delivery.id} style={styles.completedCard}>
              <View style={styles.completedInfo}>
                <Text style={styles.completedOrder}>{delivery.orderNumber}</Text>
                <Text style={styles.completedDestination}>{delivery.destination}</Text>
                <Text style={styles.completedTime}>{delivery.time}</Text>
              </View>
              <Text style={styles.completedAmount}>{delivery.amount}</Text>
            </View>
          ))}
        </View>

        {/* Earnings Summary */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsTitle}>Weekly Earnings</Text>
            <Text style={styles.earningsAmount}>₦52,400</Text>
          </View>
          <View style={styles.earningsBreakdown}>
            <View style={styles.earningsItem}>
              <Text style={styles.earningsLabel}>Deliveries</Text>
              <Text style={styles.earningsValue}>₦48,000</Text>
            </View>
            <View style={styles.earningsItem}>
              <Text style={styles.earningsLabel}>Tips</Text>
              <Text style={styles.earningsValue}>₦4,400</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Picked Up': return '#10b981';
    case 'Ready for Pickup': return '#f59e0b';
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  statusButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
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
  deliveryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  deliveryRoute: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#e5e7eb',
    marginLeft: 8,
    marginVertical: 4,
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  deliveryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  callButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  completedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  completedInfo: {
    flex: 1,
  },
  completedOrder: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  completedDestination: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  completedTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  completedAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  earningsCard: {
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
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  earningsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  earningsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
  earningsBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earningsItem: {
    flex: 1,
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  earningsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
});