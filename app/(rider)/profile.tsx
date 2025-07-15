import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Settings, CreditCard, MapPin, Bell, Shield, LogOut, CreditCard as Edit, Star, Award, Moon, Sun } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/hooks/useUser';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';

export default function RiderProfileScreen() {
  const { user, logout } = useUser();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const menuItems = [
    { id: 1, title: 'Edit Profile', icon: Edit, color: colors.primary },
    { id: 2, title: 'Payment Settings', icon: CreditCard, color: '#3b82f6' },
    { id: 3, title: 'Delivery Areas', icon: MapPin, color: '#f59e0b' },
    { id: 4, title: 'Notifications', icon: Bell, color: '#ef4444' },
    { id: 5, title: 'Privacy & Security', icon: Shield, color: '#8b5cf6' },
    { id: 6, title: 'Settings', icon: Settings, color: '#6b7280' },
  ];

  const stats = [
    { label: 'Total Deliveries', value: '342', color: colors.primary },
    { label: 'This Week', value: '28', color: '#3b82f6' },
    { label: 'Rating', value: '4.9★', color: '#f59e0b' },
    { label: 'Earnings', value: '₦85,000', color: '#ef4444' },
  ];

  const badges = [
    { id: 1, title: 'Verified Rider', icon: '✅', color: colors.primary },
    { id: 2, title: 'Speed Demon', icon: '⚡', color: '#f59e0b' },
    { id: 3, title: 'Top Performer', icon: '🏆', color: '#3b82f6' },
  ];

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    profileHeader: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.surface,
    },
    avatar: {
      fontSize: 48,
      width: 80,
      height: 80,
      textAlign: 'center',
      lineHeight: 80,
      backgroundColor: colors.card,
      borderRadius: 40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    userRole: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    rating: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 4,
    },
    ratingCount: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 4,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
      backgroundColor: colors.surface,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    badgeCard: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    badgeTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
    },
    quickSettingsCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
    },
    menuContainer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
    },
    menuArrow: {
      fontSize: 20,
      color: colors.textSecondary,
    },
    appInfoCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    appInfoLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    appInfoValue: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '600',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      margin: 20,
      marginTop: 0,
      borderWidth: 1,
      borderColor: '#ef4444',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={dynamicStyles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={dynamicStyles.avatar}>🚴‍♂️</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
          </View>
          <Text style={dynamicStyles.userName}>{user?.name || 'Delivery Mike'}</Text>
          <Text style={dynamicStyles.userEmail}>{user?.email || 'mike.rider@ui.edu.ng'}</Text>
          <Text style={dynamicStyles.userRole}>Delivery Rider • University of Ibadan</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#f59e0b" />
            <Text style={dynamicStyles.rating}>4.9</Text>
            <Text style={dynamicStyles.ratingCount}>(342 deliveries)</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={dynamicStyles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={dynamicStyles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>Rider Achievements</Text>
          <View style={styles.badgesContainer}>
            {badges.map((badge) => (
              <View key={badge.id} style={[dynamicStyles.badgeCard, { borderColor: badge.color }]}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={dynamicStyles.badgeTitle}>{badge.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Settings */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>Quick Settings</Text>
          <View style={dynamicStyles.quickSettingsCard}>
            <View style={dynamicStyles.settingRow}>
              <View style={styles.settingLeft}>
                <Bell size={20} color={colors.primary} />
                <Text style={dynamicStyles.settingText}>Delivery Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            <View style={dynamicStyles.settingRow}>
              <View style={styles.settingLeft}>
                <MapPin size={20} color={colors.primary} />
                <Text style={dynamicStyles.settingText}>Location Services</Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={locationEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            <View style={dynamicStyles.settingRow}>
              <View style={styles.settingLeft}>
                {isDarkMode ? <Sun size={20} color={colors.primary} /> : <Moon size={20} color={colors.primary} />}
                <Text style={dynamicStyles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>Account</Text>
          <View style={dynamicStyles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={dynamicStyles.menuItem}>
                <View style={styles.menuLeft}>
                  <item.icon size={20} color={item.color} />
                  <Text style={dynamicStyles.menuText}>{item.title}</Text>
                </View>
                <Text style={dynamicStyles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>App Info</Text>
          <View style={dynamicStyles.appInfoCard}>
            <View style={styles.appInfoItem}>
              <Text style={dynamicStyles.appInfoLabel}>Version</Text>
              <Text style={dynamicStyles.appInfoValue}>1.0.0</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={dynamicStyles.appInfoLabel}>Build</Text>
              <Text style={dynamicStyles.appInfoValue}>2024.01.15</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={dynamicStyles.appInfoLabel}>Platform</Text>
              <Text style={dynamicStyles.appInfoValue}>Android</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={dynamicStyles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    backgroundColor: '#10b981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  section: {
    padding: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});