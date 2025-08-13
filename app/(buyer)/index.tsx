import { useUser } from "@/hooks/useUser";
import * as Location from "expo-location";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  Bell,
  Clock,
  Gift,
  MapPin,
  Search,
  Star,
  Zap,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BuyerHomeScreen() {
  const { user } = useUser();
  const [locationName, setLocationName] = useState("University of Ibadan");
  const [searchText, setSearchText] = useState("");
  type Food = {
    id: string;
    name: string;
    vendor: string;
    image: string;
    rating: number | string;
    price: string;
    // add other fields as needed
  };

  const [featuredFood, setFeaturedFood] = useState<Food[]>([]);
  const [filteredFood, setFilteredFood] = useState<Food[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "foods"), where("isFeatured", "==", true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        ...(doc.data() as Food),
        id: doc.id,
      }));

      const top5 = fetched
        .filter((item) => typeof item.rating === "number")
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 5);

      setFeaturedFood(top5);
      setFilteredFood(top5);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    let [place] = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    if (place) {
      setLocationName(
        `${place.name || ""}, ${place.city || place.region || place.country}`
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const quickActions = [
    { id: 1, title: "Flash Sales", icon: Zap, color: "#ef4444" },
    { id: 2, title: "Delivery Pooling", icon: Clock, color: "#f59e0b" },
    { id: 3, title: "Nearby Vendors", icon: MapPin, color: "#10b981" },
    { id: 4, title: "Mystery Rewards", icon: Gift, color: "#8b5cf6" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>
                Hello {user?.name || "Student"}!
              </Text>
              <TouchableOpacity
                style={styles.locationContainer}
                onPress={getLocation}
              >
                <MapPin size={16} color="#10b981" />
                <Text style={styles.location}>{locationName}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Bell size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchBar}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search for food, vendors..."
              placeholderTextColor="#6b7280"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                const filtered = featuredFood.filter(
                  (item) =>
                    item.name.toLowerCase().includes(text.toLowerCase()) ||
                    item.vendor.toLowerCase().includes(text.toLowerCase())
                );
                setFilteredFood(filtered);
              }}
            />
          </View>
        </View>

        {/* Featured Food */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Today</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <View key={i} style={[styles.foodCard, { opacity: 0.5 }]}>
                  <View
                    style={[styles.foodImage, { backgroundColor: "#f3f4f6" }]}
                  />
                  <View style={{ padding: 12 }}>
                    <View
                      style={{
                        height: 14,
                        backgroundColor: "#e5e7eb",
                        marginBottom: 6,
                        borderRadius: 4,
                      }}
                    />
                    <View
                      style={{
                        height: 12,
                        backgroundColor: "#e5e7eb",
                        marginBottom: 6,
                        width: "60%",
                        borderRadius: 4,
                      }}
                    />
                    <View
                      style={{
                        height: 12,
                        backgroundColor: "#e5e7eb",
                        width: "40%",
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
              ))
            ) : filteredFood.length > 0 ? (
              filteredFood.map((food) => (
                <TouchableOpacity key={food.id} style={styles.foodCard}>
                  <Image
                    source={{ uri: food.image }}
                    style={styles.foodImage}
                  />
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.vendorName}>{food.vendor}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#f59e0b" />
                      <Text style={styles.rating}>{food.rating}</Text>
                    </View>
                    <Text style={styles.foodPrice}>{food.price}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 16, color: "#6b7280" }}>
                  No results found for {searchText}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

       <View style={styles.orderStatusCard}>
          <View style={styles.orderStatusHeader}>
            <Text style={styles.orderStatusTitle}>Recent Order</Text>
            <Text style={styles.orderStatusTime}>15 mins ago</Text>
          </View>
          <Text style={styles.orderStatusFood}>
            I want to cook....
          </Text>
          <View style={styles.orderStatusProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "60%" }]} />
            </View>
            <Text style={styles.orderStatusText}>Being prepared...</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <View
                  style={[styles.actionIcon, { backgroundColor: action.color }]}
                >
                  <action.icon size={24} color="#fff" />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Status */}
        <View style={styles.orderStatusCard}>
          <View style={styles.orderStatusHeader}>
            <Text style={styles.orderStatusTitle}>Recent Order</Text>
            <Text style={styles.orderStatusTime}>15 mins ago</Text>
          </View>
          <Text style={styles.orderStatusFood}>
            Jollof Rice & Chicken from Mama Simi
          </Text>
          <View style={styles.orderStatusProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "60%" }]} />
            </View>
            <Text style={styles.orderStatusText}>Being prepared...</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 20,
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 5,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchTextInput: {
    marginLeft: 10,
    color: "#000",
    fontSize: 16,
    flex: 1,
  },
  searchText: {
    marginLeft: 10,
    color: "#6b7280",
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  categoryCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    // borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: "#6b7280",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  foodCard: {
    width: 180,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  foodInfo: {
    padding: 12,
  },
  foodName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 4,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
  },
  orderStatusCard: {
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderStatusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderStatusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  orderStatusTime: {
    fontSize: 12,
    color: "#6b7280",
  },
  orderStatusFood: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  orderStatusProgress: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    marginRight: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 2,
  },
  orderStatusText: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "600",
  },
});
