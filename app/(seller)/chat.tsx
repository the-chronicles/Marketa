import { auth } from "@/config/firebaseConfig";
import { useConversations } from "@/hooks/useConversations";
import { useTheme } from "@/hooks/useTheme";
import { openOrCreateConversation } from "@/lib/chat";
import { useRouter } from "expo-router";
import {
  MessageCircle,
  MoveHorizontal as MoreHorizontal,
  Phone,
  Search,
  Video,
} from "lucide-react-native";
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

type ParticipantRole = "buyer" | "seller" | "rider" | "support";
type Participant = {
  role: ParticipantRole;
  displayName: string;
  photoURL?: string | null;
};

export default function SellerChatScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const { conversations, loading } = useConversations();
  const router = useRouter();
  const meUid = auth.currentUser?.uid ?? null;

  const dynamicStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: { fontSize: 24, fontWeight: "bold", color: colors.text },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingVertical: 12,
      margin: 20,
      marginBottom: 16,
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: colors.text },
    quickActionsContainer: { paddingHorizontal: 20, marginBottom: 20 },
    quickActionIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    quickActionTitle: {
      fontSize: 12,
      color: colors.text,
      fontWeight: "500",
      textAlign: "center",
    },
    conversationsContainer: { flex: 1, paddingHorizontal: 20 },
    conversationCard: {
      flexDirection: "row",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    avatarContainer: { position: "relative", marginRight: 12 },
    avatar: {
      fontSize: 18,
      width: 50,
      height: 50,
      textAlign: "center",
      lineHeight: 50,
      backgroundColor: colors.surface,
      borderRadius: 25,
      color: colors.text,
    },
    onlineIndicator: {
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      backgroundColor: colors.primary,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.card,
    },
    conversationInfo: { flex: 1 },
    conversationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    conversationName: { fontSize: 16, fontWeight: "600", color: colors.text },
    conversationTime: { fontSize: 12, color: colors.textSecondary },
    messageContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    lastMessage: { flex: 1, fontSize: 14, color: colors.textSecondary },
    unreadBadge: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginLeft: 8,
    },
    unreadText: { color: "#ffffff", fontSize: 12, fontWeight: "600" },
    conversationMeta: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusText: {
      color: "#ffffff",
      fontSize: 10,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    conversationActions: { flexDirection: "row" },
    actionButton: { padding: 4, marginLeft: 8 },
    tipsContainer: {
      backgroundColor: colors.surface,
      padding: 16,
      margin: 20,
      borderRadius: 12,
    },
    tipsTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    tipsText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  });

  const quickActions = [
    { id: 1, title: "Order Updates", icon: "📦", color: colors.primary },
    { id: 2, title: "Menu Questions", icon: "🍽️", color: "#3b82f6" },
    { id: 3, title: "Report Issue", icon: "⚠️", color: "#ef4444" },
    { id: 4, title: "Help Center", icon: "❓", color: "#f59e0b" },
  ];

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

  function badgeColorFromRole(role?: ParticipantRole) {
    switch (role) {
      case "buyer":
        return "#f59e0b";
      case "rider":
        return "#3b82f6";
      case "seller":
        return colors.primary;
      default:
        return colors.textSecondary;
    }
  }

  return (
    <SafeAreaView style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>💬 Customer Chat</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <MessageCircle size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={dynamicStyles.searchContainer}>
        <Search size={20} color={colors.textSecondary} />
        <TextInput
          style={dynamicStyles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Quick Actions */}
      <View style={dynamicStyles.quickActionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickActionCard}>
              <View
                style={[
                  dynamicStyles.quickActionIcon,
                  { backgroundColor: action.color },
                ]}
              >
                <Text style={styles.quickActionEmoji}>{action.icon}</Text>
              </View>
              <Text style={dynamicStyles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Conversations */}
      <ScrollView
        style={dynamicStyles.conversationsContainer}
        showsVerticalScrollIndicator={false}
      >
        {(loading ? [] : filtered).map((c: any) => {
          const parts = (c.participants ?? {}) as Record<string, Participant>;
          const otherUid =
            Object.keys(parts).find((uid) => uid !== meUid) ??
            Object.keys(parts)[0];
          const other = otherUid ? parts[otherUid] : undefined;

          return (
            <TouchableOpacity
              key={c.id}
              style={dynamicStyles.conversationCard}
              onPress={async () => {
                if (!otherUid) return;
                const meDisplay = auth.currentUser?.displayName ?? "You";
                const mePhoto = auth.currentUser?.photoURL ?? null;

                const id = await openOrCreateConversation(otherUid, {
                  [auth.currentUser!.uid]: {
                    role: "seller",
                    displayName: meDisplay,
                    photoURL: mePhoto,
                  },
                  [otherUid]: {
                    role: other?.role ?? "buyer",
                    displayName: other?.displayName ?? "Chat",
                    photoURL: other?.photoURL ?? null,
                  },
                });

                router.push(`/chat/${id}`);
              }}
            >
              <View style={dynamicStyles.avatarContainer}>
                <Text style={dynamicStyles.avatar}>
                  {other?.displayName?.[0] ?? "👤"}
                </Text>
              </View>

              <View style={dynamicStyles.conversationInfo}>
                <View style={dynamicStyles.conversationHeader}>
                  <Text style={dynamicStyles.conversationName}>
                    {other?.displayName ?? "Chat"}
                  </Text>
                  <Text style={dynamicStyles.conversationTime}></Text>
                </View>

                <View style={dynamicStyles.messageContainer}>
                  <Text style={dynamicStyles.lastMessage} numberOfLines={1}>
                    {c.lastMessage?.text ?? "Start a conversation"}
                  </Text>
                  {c.unread > 0 && (
                    <View style={dynamicStyles.unreadBadge}>
                      <Text style={dynamicStyles.unreadText}>{c.unread}</Text>
                    </View>
                  )}
                </View>

                <View style={dynamicStyles.conversationMeta}>
                  <View
                    style={[
                      dynamicStyles.statusBadge,
                      { backgroundColor: badgeColorFromRole(other?.role) },
                    ]}
                  >
                    <Text style={dynamicStyles.statusText}>
                      {(other?.role ?? "support").toUpperCase()}
                    </Text>
                  </View>
                  <View style={dynamicStyles.conversationActions}>
                    <TouchableOpacity style={dynamicStyles.actionButton}>
                      <Phone size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={dynamicStyles.actionButton}>
                      <Video size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={dynamicStyles.actionButton}>
                      <MoreHorizontal size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tips */}
      <View style={dynamicStyles.tipsContainer}>
        <Text style={dynamicStyles.tipsTitle}>👨‍🍳 Food Business Tips</Text>
        <Text style={dynamicStyles.tipsText}>
          • Respond quickly to customer inquiries{"\n"}• Share cooking progress
          with photos{"\n"}• Ask for feedback to improve your menu
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newChatButton: { padding: 8 },
  quickActionCard: { alignItems: "center", marginRight: 20, width: 80 },
  quickActionEmoji: { fontSize: 24 },
});
