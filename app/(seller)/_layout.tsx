import { Tabs } from "expo-router";
import {
  ChartBar as BarChart3,
  Camera,
  MessageCircle,
  Store,
  User,
} from "lucide-react-native";
import { SafeAreaView } from "react-native";

export default function SellerTabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
            paddingTop: 8,
          },
          tabBarActiveTintColor: "#10B981",
          tabBarInactiveTintColor: "#6b7280",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ size, color }) => (
              <Store size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="add-food"
          options={{
            title: "Add Food",
            tabBarIcon: ({ size, color }) => (
              <Camera size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarIcon: ({ size, color }) => (
              <BarChart3 size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ size, color }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
