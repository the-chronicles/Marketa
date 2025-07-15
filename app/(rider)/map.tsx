import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

export default function RiderMapScreen() {
  const { colors } = useTheme();

  const activeDelivery = {
    id: 1,
    orderNumber: 'FD-001',
    food: 'Jollof Rice & Chicken',
    pickup: 'Mama Simi Kitchen',
    delivery: 'Tedder Hall Room 205',
    customer: 'John Doe',
    phone: '+234 801 234 5678',
    distance: '1.2km',
    time: '8 mins'
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    mapPlaceholder: {
      flex: 1,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      borderRadius: 12,
    },
    mapText: {
      fontSize: 18,
      color: colors.textSecondary,
      marginTop: 16,
    },
    deliveryCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      margin: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    orderNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    foodName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    routeItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    routeText: {
      marginLeft: 8,
      fontSize: 14,
      color: colors.text,
    },
    routeLine: {
      width: 2,
      height: 20,
      backgroundColor: colors.border,
      marginLeft: 8,
      marginVertical: 4,
    },
    customerInfo: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      marginVertical: 12,
    },
    customerName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    customerPhone: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
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
      color: colors.textSecondary,
    },
    actionButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    actionText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    callButton: {
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    callText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>🗺️ Delivery Map</Text>
        <Text style={dynamicStyles.subtitle}>Navigate to your delivery location</Text>
      </View>

      {/* Map Placeholder */}
      <View style={dynamicStyles.mapPlaceholder}>
        <MapPin size={48} color={colors.textSecondary} />
        <Text style={dynamicStyles.mapText}>Map Integration Coming Soon</Text>
        <Text style={[dynamicStyles.mapText, { fontSize: 14, marginTop: 8 }]}>
          Google Maps / Mapbox will be integrated here
        </Text>
      </View>

      {/* Active Delivery Info */}
      <View style={dynamicStyles.deliveryCard}>
        <Text style={dynamicStyles.orderNumber}>{activeDelivery.orderNumber}</Text>
        <Text style={dynamicStyles.foodName}>🍽️ {activeDelivery.food}</Text>
        
        <View style={styles.deliveryRoute}>
          <View style={dynamicStyles.routeItem}>
            <MapPin size={16} color="#10b981" />
            <Text style={dynamicStyles.routeText}>Pick up from {activeDelivery.pickup}</Text>
          </View>
          <View style={dynamicStyles.routeLine} />
          <View style={dynamicStyles.routeItem}>
            <MapPin size={16} color="#ef4444" />
            <Text style={dynamicStyles.routeText}>Deliver to {activeDelivery.delivery}</Text>
          </View>
        </View>
        
        <View style={dynamicStyles.customerInfo}>
          <Text style={dynamicStyles.customerName}>👤 {activeDelivery.customer}</Text>
          <Text style={dynamicStyles.customerPhone}>{activeDelivery.phone}</Text>
        </View>
        
        <View style={dynamicStyles.deliveryInfo}>
          <View style={dynamicStyles.infoItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={dynamicStyles.infoText}>{activeDelivery.time}</Text>
          </View>
          <View style={dynamicStyles.infoItem}>
            <Navigation size={16} color={colors.textSecondary} />
            <Text style={dynamicStyles.infoText}>{activeDelivery.distance}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={dynamicStyles.actionButton}>
          <Navigation size={20} color="#fff" />
          <Text style={dynamicStyles.actionText}>Start Navigation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={dynamicStyles.callButton}>
          <Phone size={20} color={colors.primary} />
          <Text style={dynamicStyles.callText}>Call Customer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  deliveryRoute: {
    marginBottom: 12,
  },
});