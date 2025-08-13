// app/chat/[id].tsx
import { auth, db } from "@/config/firebaseConfig";
import { useMessages } from "@/hooks/useMessages";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { Send } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  // SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatRoom() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { messages, send, sending } = useMessages(id);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Chat");
  const me = auth.currentUser?.uid;

  // const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  // const listRef = useRef<FlatList>(null);

  useEffect(() => {
    getDoc(doc(db, "conversations", String(id))).then((snap) => {
      const data = snap.data() as any;
      const other = Object.entries(data?.participants ?? {}).find(
        ([uid]) => uid !== me
      )?.[1] as any;
      setTitle(other?.displayName || "Chat");
    });
  }, [id]);

  const renderItem = ({ item }: any) => {
    const mine = item.senderId === me;
    return (
      <View
        style={[styles.bubble, mine ? styles.bubbleMe : styles.bubbleOther]}
      >
        {!!item.text && (
          <Text style={[styles.text, mine ? styles.textMe : styles.textOther]}>
            {item.text}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: "height" })}
        // Make room for the native header on iOS; Android is handled by "height" + resize (see app.json step below)
        keyboardVerticalOffset={Platform.select({
          ios: headerHeight,
          android: 0,
        })}
      >
        <Stack.Screen options={{ title }} />
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, gap: 8 }}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => {
              send(text);
              setText("");
            }}
          />
          <TouchableOpacity
            disabled={sending || !text.trim()}
            onPress={() => {
              send(text);
              setText("");
            }}
          >
            <Send size={22} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bubble: { maxWidth: "75%", padding: 10, borderRadius: 12 },
  bubbleMe: { alignSelf: "flex-end", backgroundColor: "#10b981" },
  bubbleOther: { alignSelf: "flex-start", backgroundColor: "#f3f4f6" },
  text: { fontSize: 15 },
  textMe: { color: "white" },
  textOther: { color: "#111827" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
  },
  input: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});
