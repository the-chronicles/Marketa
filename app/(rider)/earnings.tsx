import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DollarSign, TrendingUp, Calendar, Clock, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

export default function RiderEarningsScreen() {
  const { colors } = useTheme();

  const earningsData = {
    today: { amount: '₦3,200', deliveries: 8, hours: '6h 30m' },
    week: { amount: '₦18,500', deliveries: 42, hours: '28h 15m' },
    month: { amount: '₦75,200', deliveries: 186, hours: '124h 45m' }
  };

  const recentEarnings = [
    { id: 1, order: 'FD-001', amount: '₦200', time: '2:30 PM', customer: 'John Doe', tip: '₦50' },
    { id: 2, order: 'FD-002', amount: '₦250', time: '1:45 PM', customer: 'Jane Smith', tip: '₦0' },
    { id: 3, order: 'FD-003', amount: '₦200', time: '12:20 PM', customer: 'Mike Johnson', tip: '₦100' },
    { id: 4, order: 'FD-004', amount: '₦300', time: '11:15 AM', customer: 'Sarah Wilson', tip: '₦25' },
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
    summaryCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      margin: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    periodTabs: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 4,
      marginBottom: 20,
    },
    periodTab: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 6,
    },
    activePeriodTab: {
      backgroundColor: colors.primary,
    },
    periodTabText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    activePeriodTabText: {
      color: '#ffffff',
    },
    earningsAmount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primary,
      textAlign: 'center',
      marginBottom: 16,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    earningCard: {
      flexDirection: 'row',
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
    earningInfo: {
      flex: 1,
    },
    orderNumber: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    customerName: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    earningTime: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    earningAmount: {
      alignItems: 'flex-end',
    },
    amount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
    },
    tip: {
      fontSize: 12,
      color: '#f59e0b',
      marginTop: 4,
    },
    insightsCard: {
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
    insightItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    insightText: {
      fontSize: 14,
      color: colors.text,
      marginLeft: 12,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.title}>💰 Earnings</Text>
          <Text style={dynamicStyles.subtitle}>Track your delivery income</Text>
        </View>

        {/* Earnings Summary */}
        <View style={dynamicStyles.summaryCard}>
          <Text style={dynamicStyles.summaryTitle}>Earnings Summary</Text>
          
          <View style={dynamicStyles.periodTabs}>
            <TouchableOpacity style={[dynamicStyles.periodTab, dynamicStyles.activePeriodTab]}>
              <Text style={[dynamicStyles.periodTabText, dynamicStyles.activePeriodTabText]}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dynamicStyles.periodTab}>
              <Text style={dynamicStyles.periodTabText}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dynamicStyles.periodTab}>
              <Text style={dynamicStyles.periodTabText}>Month</Text>
            </TouchableOpacity>
          </View>

          <Text style={dynamicStyles.earningsAmount}>{earningsData.today.amount}</Text>

          <View style={dynamicStyles.statsRow}>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>{earningsData.today.deliveries}</Text>
              <Text style={dynamicStyles.statLabel}>Deliveries</Text>
            </View>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>{earningsData.today.hours}</Text>
              <Text style={dynamicStyles.statLabel}>Hours</Text>
            </View>
            <View style={dynamicStyles.statItem}>
              <Text style={dynamicStyles.statValue}>₦400</Text>
              <Text style={dynamicStyles.statLabel}>Avg/Delivery</Text>
            </View>
          </View>
        </View>

        {/* Recent Earnings */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>Recent Earnings</Text>
          {recentEarnings.map((earning) => (
            <View key={earning.id} style={dynamicStyles.earningCard}>
              <View style={dynamicStyles.earningInfo}>
                <Text style={dynamicStyles.orderNumber}>{earning.order}</Text>
                <Text style={dynamicStyles.customerName}>{earning.customer}</Text>
                <Text style={dynamicStyles.earningTime}>{earning.time}</Text>
              </View>
              <View style={dynamicStyles.earningAmount}>
                <Text style={dynamicStyles.amount}>{earning.amount}</Text>
                {earning.tip !== '₦0' && (
                  <Text style={dynamicStyles.tip}>+{earning.tip} tip</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Insights */}
        <View style={dynamicStyles.insightsCard}>
          <Text style={dynamicStyles.sectionTitle}>💡 Earnings Insights</Text>
          <View style={dynamicStyles.insightItem}>
            <TrendingUp size={20} color={colors.primary} />
            <Text style={dynamicStyles.insightText}>Your earnings increased by 15% this week</Text>
          </View>
          <View style={dynamicStyles.insightItem}>
            <Clock size={20} color="#f59e0b" />
            <Text style={dynamicStyles.insightText}>Peak hours: 12PM-2PM and 6PM-8PM</Text>
          </View>
          <View style={dynamicStyles.insightItem}>
            <Star size={20} color="#ef4444" />
            <Text style={dynamicStyles.insightText}>Higher ratings lead to more tips</Text>
          </View>
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