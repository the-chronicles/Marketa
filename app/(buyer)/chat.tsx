import { auth } from "@/config/firebaseConfig";
import { useConversations } from "@/hooks/useConversations";
import { openOrCreateConversation } from "@/lib/chat";
import { useRouter } from "expo-router";
import { MessageCircle, Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// If you created these types in src/types/chat.ts, import them:
type ParticipantRole = "buyer" | "seller" | "rider" | "support";
type Participant = {
  role: ParticipantRole;
  displayName: string;
  photoURL?: string | null;
};
// If you have Conversation type too, you can import it similarly.

export default function ChatScreen() {
  const [searchText, setSearchText] = useState("");
  const { conversations, loading } = useConversations(); // make sure your hook uses a converter or returns the right shape
  const router = useRouter();

  const meUid = auth.currentUser?.uid ?? null;

  const filtered = useMemo(() => {
    const q = searchText.toLowerCase();
    return (conversations ?? []).filter((c: any) => {
      const participants = (c.participants ?? {}) as Record<
        string,
        Participant
      >;
      const names = Object.values(participants).map(
        (p) => p?.displayName?.toLowerCase?.() || ""
      );
      return names.some((n) => n.includes(q));
    });
  }, [conversations, searchText]);

  const quickActions = [
    { id: 1, title: "Order Status", icon: "📦", color: "#10b981" },
    { id: 2, title: "Find Vendor", icon: "🔍", color: "#3b82f6" },
    { id: 3, title: "Report Issue", icon: "⚠️", color: "#ef4444" },
    { id: 4, title: "Help Center", icon: "❓", color: "#f59e0b" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>💬 Messages</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <MessageCircle size={24} color="#10b981" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#6b7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickActionCard}>
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: action.color },
                ]}
              >
                <Text style={styles.quickActionEmoji}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Conversations */}
      <ScrollView
        style={styles.conversationsContainer}
        showsVerticalScrollIndicator={false}
      >
        {(loading ? [] : filtered).map((conversation: any) => {
          const participants = (conversation.participants ?? {}) as Record<
            string,
            Participant
          >;

          // Determine me vs other
          const otherUid =
            Object.keys(participants).find((uid) => uid !== meUid) ??
            Object.keys(participants)[0]; // fallback if meUid not loaded yet
          const other = otherUid ? participants[otherUid] : undefined;

          return (
            <TouchableOpacity
              key={conversation.id}
              style={styles.conversationCard}
              onPress={async () => {
                if (!otherUid) return;

                // Build your own meta from auth.currentUser or your user store
                const meDisplay = auth.currentUser?.displayName ?? "You"; // or use your useUser() hook's name
                const mePhoto = auth.currentUser?.photoURL ?? null;

                // If 'other' already has proper meta in conversation, reuse it
                const id = await openOrCreateConversation(otherUid, {
                  [auth.currentUser!.uid]: {
                    role: "buyer", // this is the buyer screen
                    displayName: meDisplay,
                    photoURL: mePhoto,
                  },
                  [otherUid]: {
                    role: other?.role ?? "seller", // guess or keep from participants
                    displayName: other?.displayName ?? "Chat",
                    photoURL: other?.photoURL ?? null,
                  },
                });

                router.push(`/chat/${id}`);
              }}
            >
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>
                  {other?.displayName?.[0] ?? "👤"}
                </Text>
              </View>

              <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>
                    {other?.displayName ?? "Chat"}
                  </Text>
                  <Text style={styles.conversationTime}>
                    {/* show relative time from conversation.lastMessage?.createdAt if you want */}
                  </Text>
                </View>

                <View style={styles.messageContainer}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {conversation.lastMessage?.text ?? "Start a conversation"}
                  </Text>
                  {conversation.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>
                        {conversation.unread}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Food Chat Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>🍽️ Food Chat Tips</Text>
        <Text style={styles.tipsText}>
          • Ask vendors about ingredients and spice levels • Share your location
          with delivery riders • Rate your food experience after delivery
        </Text>
      </View>
    </SafeAreaView>
  );
}

function getTypeColor(type: string) {
  switch (type) {
    case "vendor":
      return "#10b981";
    case "rider":
      return "#3b82f6";
    case "support":
      return "#f59e0b";
    default:
      return "#6b7280";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  newChatButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 20,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionCard: {
    alignItems: "center",
    marginRight: 20,
    width: 80,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionTitle: {
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
    textAlign: "center",
  },
  conversationsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  conversationCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
    width: 50,
    height: 50,
    textAlign: "center",
    lineHeight: 50,
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: "#10b981",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  conversationTime: {
    fontSize: 12,
    color: "#6b7280",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: "#6b7280",
  },
  unreadBadge: {
    backgroundColor: "#10b981",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  conversationMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  conversationActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  tipsContainer: {
    backgroundColor: "#f9fafb",
    padding: 16,
    margin: 20,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 18,
  },
});
