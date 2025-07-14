import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/hooks/useUser';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Navigate based on user role
        switch (user.role) {
          case 'buyer':
            router.replace('/(buyer)');
            break;
          case 'seller':
            router.replace('/(seller)');
            break;
          case 'rider':
            router.replace('/(rider)');
            break;
          default:
            router.replace('/auth');
        }
      } else {
        const timer = setTimeout(() => {
          router.replace('/auth');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🍕 Marketa</Text>
        <Text style={styles.tagline}>Your Campus Food Delivery</Text>
        <Text style={styles.subtitle}>
          Order delicious food from your favorite campus vendors at University of Ibadan
        </Text>
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🍚</Text>
            <Text style={styles.featureText}>Jollof Rice & Local Dishes</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🚴‍♂️</Text>
            <Text style={styles.featureText}>Fast Campus Delivery</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎮</Text>
            <Text style={styles.featureText}>Games While You Wait</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💰</Text>
            <Text style={styles.featureText}>Student-Friendly Prices</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={() => router.push('/auth')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 16,
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  features: {
    width: '100%',
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  getStartedButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 200,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});