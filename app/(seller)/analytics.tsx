import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TrendingUp, DollarSign, Package, Users, Star, Calendar } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

export default function SellerAnalyticsScreen() {
  const { colors } = useTheme();

  const stats = [
    { label: 'Total Revenue', value: '₦245,000', change: '+15%', color: colors.primary, icon: DollarSign },
    { label: 'Orders', value: '156', change: '+8%', color: '#3b82f6', icon: Package },
    { label: 'Customers', value: '89', change: '+12%', color: '#f59e0b', icon: Users },
    { label: 'Rating', value: '4.8★', change: '+0.2', color: '#ef4444', icon: Star },
  ];

  const topFoods = [
    { name: 'Jollof Rice & Chicken', orders: 45, revenue: '₦67,500', trend: '+12%' },
    { name: 'Fried Rice Special', orders: 32, revenue: '₦57,600', trend: '+8%' },
    { name: 'Amala & Ewedu', orders: 28, revenue: '₦33,600', trend: '+5%' },
    { name: 'Coconut Rice', orders: 21, revenue: '₦29,400', trend: '+15%' },
  ];

  const recentActivity = [
    { time: '2 hours ago', action: 'New order for Jollof Rice', amount: '₦1,500' },
    { time: '4 hours ago', action: 'Customer rated 5 stars', amount: '' },
    { time: '6 hours ago', action: 'Order completed - Fried Rice', amount: '₦1,800' },
    { time: '8 hours ago', action: 'New customer registered', amount: '' },
  ];

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
    periodSelector: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 4,
      margin: 20,
    },
    periodButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 6,
    },
    activePeriod: {
      backgroundColor: colors.primary,
    },
    periodText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    activePeriodText: {
      color: '#ffffff',
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    statCard: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    statChange: {
      fontSize: 12,
      fontWeight: '600',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    topFoodCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    foodHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    foodName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    foodTrend: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: '600',
    },
    foodStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    foodStat: {
      alignItems: 'center',
    },
    foodStatValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    foodStatLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    activityCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    activityHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    activityAction: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
    },
    activityAmount: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: 'bold',
    },
    activityTime: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    chartPlaceholder: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: 200,
    },
    chartText: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 12,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.title}>📊 Analytics</Text>
          <Text style={dynamicStyles.subtitle}>Track your food business performance</Text>
        </View>

        {/* Period Selector */}
        <View style={dynamicStyles.periodSelector}>
          <TouchableOpacity style={[dynamicStyles.periodButton, dynamicStyles.activePeriod]}>
            <Text style={[dynamicStyles.periodText, dynamicStyles.activePeriodText]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={dynamicStyles.periodButton}>
            <Text style={dynamicStyles.periodText}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={dynamicStyles.periodButton}>
            <Text style={dynamicStyles.periodText}>Year</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={dynamicStyles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={dynamicStyles.statCard}>
              <View style={dynamicStyles.statHeader}>
                <stat.icon size={20} color={stat.color} />
                <Text style={[dynamicStyles.statChange, { color: stat.color }]}>{stat.change}</Text>
              </View>
              <Text style={[dynamicStyles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={dynamicStyles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Chart Placeholder */}
        <View style={dynamicStyles.chartPlaceholder}>
          <TrendingUp size={48} color={colors.textSecondary} />
          <Text style={dynamicStyles.chartText}>Sales Chart Coming Soon</Text>
          <Text style={[dynamicStyles.chartText, { fontSize: 14, marginTop: 4 }]}>
            Chart.js integration will be added here
          </Text>
        </View>

        {/* Top Foods */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>🍽️ Top Performing Foods</Text>
          {topFoods.map((food, index) => (
            <View key={index} style={dynamicStyles.topFoodCard}>
              <View style={dynamicStyles.foodHeader}>
                <Text style={dynamicStyles.foodName}>{food.name}</Text>
                <Text style={dynamicStyles.foodTrend}>{food.trend}</Text>
              </View>
              <View style={dynamicStyles.foodStats}>
                <View style={dynamicStyles.foodStat}>
                  <Text style={dynamicStyles.foodStatValue}>{food.orders}</Text>
                  <Text style={dynamicStyles.foodStatLabel}>Orders</Text>
                </View>
                <View style={dynamicStyles.foodStat}>
                  <Text style={dynamicStyles.foodStatValue}>{food.revenue}</Text>
                  <Text style={dynamicStyles.foodStatLabel}>Revenue</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>📈 Recent Activity</Text>
          {recentActivity.map((activity, index) => (
            <View key={index} style={dynamicStyles.activityCard}>
              <View style={dynamicStyles.activityHeader}>
                <Text style={dynamicStyles.activityAction}>{activity.action}</Text>
                {activity.amount && (
                  <Text style={dynamicStyles.activityAmount}>{activity.amount}</Text>
                )}
              </View>
              <Text style={dynamicStyles.activityTime}>{activity.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
});