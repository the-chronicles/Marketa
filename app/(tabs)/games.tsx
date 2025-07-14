import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Trophy, Star, Clock, Play, Users, Gift } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GamesScreen() {
  const games = [
    {
      id: 1,
      title: 'Candy Crush Campus',
      description: 'Match candies while waiting for delivery',
      image: 'https://images.pexels.com/photos/7862333/pexels-photo-7862333.jpeg',
      players: '2.5k',
      rating: 4.8,
      category: 'Puzzle',
      rewards: '50 points per level'
    },
    {
      id: 2,
      title: 'UI Trivia Challenge',
      description: 'Test your knowledge about University of Ibadan',
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg',
      players: '1.2k',
      rating: 4.6,
      category: 'Quiz',
      rewards: '100 points per game'
    },
    {
      id: 3,
      title: 'Delivery Runner',
      description: 'Help our rider navigate through campus',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      players: '856',
      rating: 4.4,
      category: 'Action',
      rewards: '75 points per run'
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'John Doe', score: 15420, avatar: '👨‍🎓' },
    { rank: 2, name: 'Jane Smith', score: 12850, avatar: '👩‍🎓' },
    { rank: 3, name: 'Mike Johnson', score: 11200, avatar: '👨‍🎓' },
    { rank: 4, name: 'Sarah Wilson', score: 9800, avatar: '👩‍🎓' },
    { rank: 5, name: 'David Brown', score: 8500, avatar: '👨‍🎓' },
  ];

  const achievements = [
    { id: 1, title: 'First Win', description: 'Complete your first game', icon: '🏆', unlocked: true },
    { id: 2, title: 'Speed Demon', description: 'Finish 10 games in one day', icon: '⚡', unlocked: true },
    { id: 3, title: 'Quiz Master', description: 'Score 100% in trivia', icon: '🧠', unlocked: false },
    { id: 4, title: 'Delivery Expert', description: 'Complete 50 delivery runs', icon: '🚚', unlocked: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Game Center</Text>
            <Text style={styles.subtitle}>Play games while waiting for delivery</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Star size={20} color="#f59e0b" />
            <Text style={styles.pointsText}>1,250 pts</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Trophy size={24} color="#10b981" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Games Won</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={24} color="#3b82f6" />
            <Text style={styles.statValue}>2h 30m</Text>
            <Text style={styles.statLabel}>Time Played</Text>
          </View>
          <View style={styles.statItem}>
            <Gift size={24} color="#ef4444" />
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </View>
        </View>

        {/* Featured Games */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Games</Text>
          {games.map((game) => (
            <View key={game.id} style={styles.gameCard}>
              <Image source={{ uri: game.image }} style={styles.gameImage} />
              <View style={styles.gameInfo}>
                <View style={styles.gameHeader}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{game.category}</Text>
                  </View>
                </View>
                <Text style={styles.gameDescription}>{game.description}</Text>
                <View style={styles.gameStats}>
                  <View style={styles.gameStatItem}>
                    <Users size={16} color="#6b7280" />
                    <Text style={styles.gameStatText}>{game.players}</Text>
                  </View>
                  <View style={styles.gameStatItem}>
                    <Star size={16} color="#f59e0b" />
                    <Text style={styles.gameStatText}>{game.rating}</Text>
                  </View>
                </View>
                <Text style={styles.rewardsText}>{game.rewards}</Text>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Play size={20} color="#fff" />
                <Text style={styles.playText}>Play</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Leaderboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Leaderboard</Text>
          <View style={styles.leaderboardContainer}>
            {leaderboard.map((player) => (
              <View key={player.rank} style={styles.leaderboardItem}>
                <View style={styles.rankContainer}>
                  <Text style={styles.rank}>#{player.rank}</Text>
                </View>
                <Text style={styles.avatar}>{player.avatar}</Text>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerScore}>{player.score.toLocaleString()} pts</Text>
                </View>
                {player.rank <= 3 && (
                  <View style={styles.medal}>
                    <Text style={styles.medalText}>
                      {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={[styles.achievementCard, !achievement.unlocked && styles.lockedCard]}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[styles.achievementTitle, !achievement.unlocked && styles.lockedText]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, !achievement.unlocked && styles.lockedText]}>
                  {achievement.description}
                </Text>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Text style={styles.unlockedText}>Unlocked</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  gameCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  gameInfo: {
    flex: 1,
    marginLeft: 12,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  categoryBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  gameDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  gameStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  gameStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  gameStatText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  rewardsText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  playText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  leaderboardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  rankContainer: {
    width: 30,
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  avatar: {
    fontSize: 24,
    marginHorizontal: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  playerScore: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  medal: {
    marginLeft: 12,
  },
  medalText: {
    fontSize: 20,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedCard: {
    backgroundColor: '#f9fafb',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  lockedText: {
    color: '#9ca3af',
  },
  unlockedBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unlockedText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
});