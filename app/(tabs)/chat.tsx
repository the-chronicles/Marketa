import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Search, MessageCircle, Phone, Video, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const [searchText, setSearchText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'BookStore UI',
      lastMessage: 'Your order is ready for pickup',
      time: '10:30 AM',
      unread: 2,
      avatar: '📚',
      type: 'seller',
      online: true
    },
    {
      id: 2,
      name: 'Delivery Rider - John',
      lastMessage: 'On my way to your location',
      time: '10:15 AM',
      unread: 0,
      avatar: '🚴‍♂️',
      type: 'rider',
      online: true
    },
    {
      id: 3,
      name: 'Tech Hub Support',
      lastMessage: 'Thank you for your purchase!',
      time: '9:45 AM',
      unread: 0,
      avatar: '💻',
      type: 'seller',
      online: false
    },
    {
      id: 4,
      name: 'Campus Fashion',
      lastMessage: 'We have new arrivals!',
      time: 'Yesterday',
      unread: 1,
      avatar: '👕',
      type: 'seller',
      online: false
    },
    {
      id: 5,
      name: 'Marketa Support',
      lastMessage: 'How can we help you today?',
      time: 'Yesterday',
      unread: 0,
      avatar: '🎧',
      type: 'support',
      online: true
    },
  ];

  const quickActions = [
    { id: 1, title: 'Order Status', icon: '📦', color: '#10b981' },
    { id: 2, title: 'Find Seller', icon: '🔍', color: '#3b82f6' },
    { id: 3, title: 'Report Issue', icon: '⚠️', color: '#ef4444' },
    { id: 4, title: 'Help Center', icon: '❓', color: '#f59e0b' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
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
              <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                <Text style={styles.quickActionEmoji}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Conversations */}
      <ScrollView style={styles.conversationsContainer} showsVerticalScrollIndicator={false}>
        {conversations.map((conversation) => (
          <TouchableOpacity key={conversation.id} style={styles.conversationCard}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{conversation.avatar}</Text>
              {conversation.online && <View style={styles.onlineIndicator} />}
            </View>
            
            <View style={styles.conversationInfo}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text style={styles.conversationTime}>{conversation.time}</Text>
              </View>
              
              <View style={styles.messageContainer}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {conversation.lastMessage}
                </Text>
                {conversation.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{conversation.unread}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.conversationMeta}>
                <View style={[styles.typeBadge, { backgroundColor: getTypeColor(conversation.type) }]}>
                  <Text style={styles.typeText}>{conversation.type}</Text>
                </View>
                <View style={styles.conversationActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Phone size={16} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Video size={16} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MoreHorizontal size={16} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Chat Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Chat Tips</Text>
        <Text style={styles.tipsText}>
          • Use voice messages for quick communication
          • Share your location with delivery riders
          • Rate your conversation after completion
        </Text>
      </View>
    </SafeAreaView>
  );
}

function getTypeColor(type: string) {
  switch (type) {
    case 'seller': return '#10b981';
    case 'rider': return '#3b82f6';
    case 'support': return '#f59e0b';
    default: return '#6b7280';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  newChatButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
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
    color: '#000',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionCard: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionTitle: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  conversationsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  conversationCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    backgroundColor: '#f3f4f6',
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: '#10b981',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  conversationTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
  },
  unreadBadge: {
    backgroundColor: '#10b981',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  conversationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  conversationActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  tipsContainer: {
    backgroundColor: '#f9fafb',
    padding: 16,
    margin: 20,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});