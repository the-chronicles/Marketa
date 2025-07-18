import { useUser } from '@/hooks/useUser';
import { Tabs } from 'expo-router';
import { Gamepad2, Chrome as Home, MessageCircle, ShoppingCart, Store, Truck, User } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useUser();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      
      {user?.role === 'buyer' && (
        <>
          <Tabs.Screen
            name="browse"
            options={{
              title: 'Browse',
              tabBarIcon: ({ size, color }) => (
                <ShoppingCart size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="games"
            options={{
              title: 'Games',
              tabBarIcon: ({ size, color }) => (
                <Gamepad2 size={size} color={color} />
              ),
            }}
          />
        </>
      )}
      
      {user?.role === 'seller' && (
        <Tabs.Screen
          name="seller"
          options={{
            title: 'My Store',
            tabBarIcon: ({ size, color }) => (
              <Store size={size} color={color} />
            ),
          }}
        />
      )}
      
      {user?.role === 'rider' && (
        <Tabs.Screen
          name="rider"
          options={{
            title: 'Deliveries',
            tabBarIcon: ({ size, color }) => (
              <Truck size={size} color={color} />
            ),
          }}
        />
      )}
      
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}