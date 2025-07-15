import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, MessageCircle, Phone, Video, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

export default function SellerChatScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Is the jollof rice still available? 🍚',
      time: '2 mins ago',
      unread: 2,
      avatar: '👨‍🎓',
      type: 'customer',
      online: true,
      orderStatus: 'ordering'
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'Thank you! The food was delicious 😋',
      time: '10 mins ago',
      unread: 0,
      avatar: '👩‍🎓',
      type: 'customer',
      online: false,
      orderStatus: 'completed'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      lastMessage: 'How long will the fried rice take?',
      time: '25 mins ago',
      unread: 1,
      avatar: '👨‍🎓',
      type: 'customer',
      online: true,
      orderStatus: 'preparing'
    },
    {
      id: 4,
      name: 'Delivery Rider - Alex',
      lastMessage: 'I\'m here to pick up order #FD-001 🚴‍♂️',
      time: '30 mins ago',
      unread: 0,
      avatar: '🚴‍♂️',
      type: 'rider',
      online: true,
      orderStatus: 'pickup'
    },
    {
      id: 5,
      name: 'Marketa Support',
      lastMessage: 'How can we help improve your food business?',
      time: '1 hour ago',
      unread: 0,
      avatar: '🎧',
      type: 'support',
      online: true,
      orderStatus: null
    },
  ];

  const quickActions = [
    { id: 1, title: 'Order Updates', icon: '📦', color: colors.primary },
    { id: 2, title: 'Menu Questions', icon: '🍽️', color: '#3b82f6' },
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
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    statusText: {
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

  function getStatusColor(status: string | null) {
    switch (status) {
      case 'ordering': return '#f59e0b';
      case 'preparing': return colors.primary;
      case 'pickup': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return colors.textSecondary;
    }
  }

  function getStatusText(status: string | null) {
    switch (status) {
      case 'ordering': return 'ordering';
      case 'preparing': return 'preparing';
      case 'pickup': return 'pickup';
      case 'completed': return 'completed';
      default: return 'support';
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
                <View style={[dynamicStyles.statusBadge, { backgroundColor: getStatusColor(conversation.orderStatus) }]}>
                  <Text style={dynamicStyles.statusText}>{getStatusText(conversation.orderStatus)}</Text>
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

      {/* Food Business Tips */}
      <View style={dynamicStyles.tipsContainer}>
        <Text style={dynamicStyles.tipsTitle}>👨‍🍳 Food Business Tips</Text>
        <Text style={dynamicStyles.tipsText}>
          • Respond quickly to customer inquiries
          • Share cooking progress with photos
          • Ask for feedback to improve your menu
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