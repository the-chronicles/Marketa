import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, MessageCircle, Phone, Video, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

export default function RiderChatScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'John Doe (Customer)',
      lastMessage: 'I\'m at the main gate, where are you? 📍',
      time: '2 mins ago',
      unread: 1,
      avatar: '👨‍🎓',
      type: 'customer',
      online: true
    },
    {
      id: 2,
      name: 'Mama Simi Kitchen',
      lastMessage: 'Order is ready for pickup! 🍽️',
      time: '5 mins ago',
      unread: 0,
      avatar: '👨‍🍳',
      type: 'vendor',
      online: true
    },
    {
      id: 3,
      name: 'Jane Smith (Customer)',
      lastMessage: 'Thank you for the fast delivery! ⭐',
      time: '15 mins ago',
      unread: 0,
      avatar: '👩‍🎓',
      type: 'customer',
      online: false
    },
    {
      id: 4,
      name: 'Campus Delights',
      lastMessage: 'Please wait 5 more minutes for the order',
      time: '30 mins ago',
      unread: 0,
      avatar: '🍽️',
      type: 'vendor',
      online: false
    },
    {
      id: 5,
      name: 'Marketa Support',
      lastMessage: 'How can we help you with your deliveries today?',
      time: '1 hour ago',
      unread: 0,
      avatar: '🎧',
      type: 'support',
      online: true
    },
  ];

  const quickActions = [
    { id: 1, title: 'Customer Location', icon: '📍', color: colors.primary },
    { id: 2, title: 'Order Status', icon: '📦', color: '#3b82f6' },
    { id: 3, title: 'Report Issue', icon: '⚠️', color: '#ef4444' },
    { id: 4, title: 'Help Center', icon: '❓', color: '#f59e0b' },
  ];

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
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
      color: colors.text,
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
    quickActionTitle: {
      fontSize: 12,
      color: colors.text,
      fontWeight: '500',
      textAlign: 'center',
    },
    conversationsContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    conversationCard: {
      flexDirection: 'row',
      backgroundColor: colors.card,
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
      backgroundColor: colors.surface,
      borderRadius: 25,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      backgroundColor: colors.primary,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.card,
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
      color: colors.text,
    },
    conversationTime: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    messageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    lastMessage: {
      flex: 1,
      fontSize: 14,
      color: colors.textSecondary,
    },
    unreadBadge: {
      backgroundColor: colors.primary,
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
      backgroundColor: colors.surface,
      padding: 16,
      margin: 20,
      borderRadius: 12,
    },
    tipsTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    tipsText: {
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 18,
    },
  });

  function getTypeColor(type: string) {
    switch (type) {
      case 'customer': return colors.primary;
      case 'vendor': return '#3b82f6';
      case 'support': return '#f59e0b';
      default: return colors.textSecondary;
    }
  }

  return (
    <SafeAreaView style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>💬 Messages</Text>
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
              <View style={[dynamicStyles.quickActionIcon, { backgroundColor: action.color }]}>
                <Text style={styles.quickActionEmoji}>{action.icon}</Text>
              </View>
              <Text style={dynamicStyles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Conversations */}
      <ScrollView style={dynamicStyles.conversationsContainer} showsVerticalScrollIndicator={false}>
        {conversations.map((conversation) => (
          <TouchableOpacity key={conversation.id} style={dynamicStyles.conversationCard}>
            <View style={dynamicStyles.avatarContainer}>
              <Text style={dynamicStyles.avatar}>{conversation.avatar}</Text>
              {conversation.online && <View style={dynamicStyles.onlineIndicator} />}
            </View>
            
            <View style={dynamicStyles.conversationInfo}>
              <View style={dynamicStyles.conversationHeader}>
                <Text style={dynamicStyles.conversationName}>{conversation.name}</Text>
                <Text style={dynamicStyles.conversationTime}>{conversation.time}</Text>
              </View>
              
              <View style={dynamicStyles.messageContainer}>
                <Text style={dynamicStyles.lastMessage} numberOfLines={1}>
                  {conversation.lastMessage}
                </Text>
                {conversation.unread > 0 && (
                  <View style={dynamicStyles.unreadBadge}>
                    <Text style={dynamicStyles.unreadText}>{conversation.unread}</Text>
                  </View>
                )}
              </View>
              
              <View style={dynamicStyles.conversationMeta}>
                <View style={[dynamicStyles.typeBadge, { backgroundColor: getTypeColor(conversation.type) }]}>
                  <Text style={dynamicStyles.typeText}>{conversation.type}</Text>
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
        ))}
      </ScrollView>

      {/* Delivery Tips */}
      <View style={dynamicStyles.tipsContainer}>
        <Text style={dynamicStyles.tipsTitle}>🚴‍♂️ Delivery Tips</Text>
        <Text style={dynamicStyles.tipsText}>
          • Confirm pickup location with vendors
          • Share your live location with customers
          • Use voice messages for quick updates
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newChatButton: {
    padding: 8,
  },
  quickActionCard: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
});