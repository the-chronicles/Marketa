import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import {
  Filter,
  Grid2x2 as Grid,
  Heart,
  List,
  Search,
  ShoppingCart,
  Star,
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

export default function BrowseFoodScreen() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredFoods, setFilteredFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const LoadingSkeleton = () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
      {[...Array(4)].map((_, i) => (
        <View
          key={i}
          style={{
            width: "48%",
            height: 200,
            backgroundColor: "#f3f4f6",
            borderRadius: 12,
            marginBottom: 16,
          }}
        />
      ))}
    </View>
  );

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "foods"), (snapshot) => {
      const fetchedFoods = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilteredFoods(
        applyFilters(fetchedFoods, searchText, selectedCategory)
      );
      setLoading(false);
    });

    return () => unsubscribe(); // clean up
  }, [db, searchText, selectedCategory]);

  const applyFilters = (
    foods: any[],
    searchText: string,
    selectedCategory: string | null
  ) => {
    return foods.filter((food) => {
      const matchesText =
        food.name.toLowerCase().includes(searchText.toLowerCase()) ||
        food.vendor.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory = selectedCategory
        ? food.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      return matchesText && matchesCategory;
    });
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setFilteredFoods((prev) => applyFilters(prev, text, selectedCategory));
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setFilteredFoods((prev) => applyFilters(prev, searchText, category));
  };

  const categories = [
    { id: 1, name: "Grains", icon: "🍚" },
    { id: 2, name: "Swallow", icon: "🍲" },
    { id: 3, name: "Snacks", icon: "🍿" },
    { id: 4, name: "Drinks", icon: "🥤" },
    { id: 5, name: "Soup", icon: "🍜" },
  ];

  const renderFoodCard = (food: any) => (
    <TouchableOpacity
      key={food.id}
      style={[styles.foodCard, viewMode === "list" && styles.listCard]}
    >
      <Image
        source={{ uri: food.image }}
        style={[styles.foodImage, viewMode === "list" && styles.listImage]}
      />
      <View style={[styles.foodInfo, viewMode === "list" && styles.listInfo]}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.vendorName}>{food.vendor}</Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#f59e0b" />
          <Text style={styles.rating}>{food.rating}</Text>
          <Text style={styles.category}>• {food.category}</Text>
        </View>
        <Text style={styles.foodPrice}>{food.price}</Text>
        <View style={styles.foodActions}>
          <TouchableOpacity style={styles.addToCartButton}>
            <ShoppingCart size={16} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishlistButton}>
            <Heart size={16} color="#10b981" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food..."
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            handleCategorySelect(selectedCategory === "Rice" ? null : "Rice")
          }
        >
          <Filter size={20} color="#10b981" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.foodsContainer}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <TouchableOpacity
            key={"all"}
            style={[
              styles.categoryCard,
              selectedCategory === null && { backgroundColor: "#10b981" },
            ]}
            onPress={() => handleCategorySelect(null)}
          >
            <Text style={styles.categoryIcon}>🍽️</Text>
            <Text
              style={[
                styles.categoryName,
                selectedCategory === null && { color: "#fff" },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                selectedCategory === category.name && {
                  backgroundColor: "#10b981",
                },
              ]}
              onPress={() => handleCategorySelect(category.name)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category.name && { color: "#fff" },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* View Mode Toggle */}
        <View style={styles.viewModeContainer}>
          <Text style={styles.resultCount}>
            {filteredFoods.length} food item
            {filteredFoods.length !== 1 ? "s" : ""} found
            {selectedCategory ? ` in "${selectedCategory}"` : ""}
          </Text>

          <View style={styles.viewModeToggle}>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "grid" && styles.activeViewMode,
              ]}
              onPress={() => setViewMode("grid")}
            >
              <Grid
                size={20}
                color={viewMode === "grid" ? "#fff" : "#6b7280"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "list" && styles.activeViewMode,
              ]}
              onPress={() => setViewMode("list")}
            >
              <List
                size={20}
                color={viewMode === "list" ? "#fff" : "#6b7280"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Foods */}
        <View
          style={[styles.foodsGrid, viewMode === "list" && styles.foodsList]}
        >
          {loading ? (
            <LoadingSkeleton />
          ) : filteredFoods.length > 0 ? (
            filteredFoods.map(renderFoodCard)
          ) : (
            <Text
              style={{ color: "#6b7280", textAlign: "center", marginTop: 20 }}
            >
              No food found for {searchText}
            </Text>
          )}
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
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  filterButton: {
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#10b981",
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  categoryCard: {
    alignItems: "center",
    marginRight: 20,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    minWidth: 80,
    height: 80,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
  },
  viewModeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f9fafb",
    marginTop: 4,
  },
  resultCount: {
    fontSize: 14,
    color: "#6b7280",
  },
  viewModeToggle: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 4,
  },
  viewModeButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeViewMode: {
    backgroundColor: "#10b981",
  },
  foodsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0, // remove extra top padding here
  },

  foodsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  foodsList: {
    flexDirection: "column",
  },
  foodCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listCard: {
    width: "100%",
    flexDirection: "row",
  },
  foodImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  listImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 12,
  },
  foodInfo: {
    padding: 12,
  },
  listInfo: {
    flex: 1,
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
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 4,
  },
  category: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 4,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 8,
  },
  foodActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 1,
    marginRight: 8,
  },
  addToCartText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  wishlistButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#10b981",
  },
});
