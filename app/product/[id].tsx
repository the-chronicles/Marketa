// app/product/[id].tsx
import { auth, db } from "@/config/firebaseConfig";
import { openOrCreateConversation } from "@/lib/chat";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { MessageSquare, ShoppingCart } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Food = {
  id: string;
  name: string;
  price: string; // you used string in your list
  image?: string;
  vendor?: string; // vendor display name
  vendorUid?: string; // ✅ MAKE SURE THIS FIELD EXISTS IN foods DOCS
  vendorAvatar?: string | null;
  category?: string;
  rating?: number | string;
  description?: string;
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "foods", String(id)));
        if (alive) {
          if (snap.exists()) {
            setFood({ id: snap.id, ...(snap.data() as any) });
          } else {
            Alert.alert("Not found", "This product does not exist.");
          }
        }
      } catch (e) {
        Alert.alert("Error", "Failed to load product.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const priceText = useMemo(() => {
    if (!food?.price) return "";
    return String(food.price);
  }, [food]);

  async function addToCart() {
    if (!uid || !food) {
      Alert.alert(
        "Login required",
        "Please sign in to add items to your cart."
      );
      return;
    }
    try {
      await addDoc(collection(db, "carts", uid, "items"), {
        productId: food.id,
        name: food.name,
        image: food.image ?? null,
        vendor: food.vendor ?? null,
        vendorUid: food.vendorUid ?? null,
        price: food.price, // keep string, same as your data
        qty: 1,
        addedAt: serverTimestamp(),
      });
      Alert.alert("Added", `${food.name} added to cart.`);
    } catch {
      Alert.alert("Error", "Could not add to cart.");
    }
  }

  async function contactSeller() {
    const me = auth.currentUser;
    if (!me || !food) {
      Alert.alert("Login required", "Please sign in to chat with the seller.");
      return;
    }

    // Prefer vendorUid, fallback to sellerId
    const sellerUid = (food as any).vendorUid || (food as any).sellerId;
    if (!sellerUid) {
      Alert.alert(
        "Missing seller",
        "This product is missing vendorUid/sellerId."
      );
      return;
    }

    try {
      const conversationId = await openOrCreateConversation(sellerUid, {
        [me.uid]: {
          role: "buyer",
          displayName: me.displayName ?? "You",
          photoURL: me.photoURL ?? null,
        },
        [sellerUid]: {
          role: "seller",
          displayName: food.vendor ?? "Seller",
          photoURL: (food as any).vendorAvatar ?? null,
        },
      });

      await addDoc(
        collection(db, "conversations", conversationId, "messages"),
        {
          text: `Hi ${food.vendor ?? "there"}, I’m interested in "${
            food.name
          }"`,
          senderId: me.uid,
          createdAt: serverTimestamp(),
        }
      );

      router.push(`/chat/${conversationId}`);
    } catch (e) {
      Alert.alert("Error", "Could not start the chat.");
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!food) {
    return (
      <View style={styles.center}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      <Stack.Screen options={{ title: food.name ?? "Product" }} />

      {food.image ? (
        <Image source={{ uri: food.image }} style={styles.hero} />
      ) : (
        <View style={[styles.hero, styles.heroPlaceholder]} />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{food.name}</Text>
        <Text style={styles.vendor}>{food.vendor ?? "Unknown vendor"}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>{priceText}</Text>
          {!!food.category && (
            <Text style={styles.category}>{food.category}</Text>
          )}
        </View>

        {!!food.description && (
          <Text style={styles.desc}>{food.description}</Text>
        )}

        <View style={{ marginTop: 16 }}>
          <Text>
            Related Products will be shown here in the future.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, styles.cartBtn]}
            onPress={addToCart}
          >
            <ShoppingCart size={18} color="#fff" />
            <Text style={styles.btnText}>Add to cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.chatBtn]}
            onPress={contactSeller}
          >
            <MessageSquare size={18} color="#10b981" />
            <Text style={[styles.btnText, { color: "#10b981" }]}>
              Contact seller
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { width: "100%", height: 260, backgroundColor: "#f3f4f6" },
  heroPlaceholder: { justifyContent: "center", alignItems: "center" },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", color: "#111827" },
  vendor: { marginTop: 4, fontSize: 13, color: "#6b7280" },
  row: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: { fontSize: 18, fontWeight: "700", color: "#10b981" },
  category: { fontSize: 12, color: "#6b7280" },
  desc: { marginTop: 12, fontSize: 14, color: "#374151", lineHeight: 20 },
  actions: { marginTop: 16, flexDirection: "row", gap: 12, alignItems: "flex-end", },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  cartBtn: { backgroundColor: "#10b981" },
  chatBtn: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#10b981",
  },
  btnText: { fontSize: 14, fontWeight: "700", color: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
