import { Sparkles, Target, Flame, Trophy } from 'lucide-react';
import CharacterAvatar from '@/components/character/CharacterAvatar';
import { getMotivationalMessage } from '@/lib/utils';
import type { useGameState } from '@/hooks/useGameState';
import styles from './DashboardPage.module.css';

type DashboardPageProps = {
  gameState: ReturnType<typeof useGameState>;
};

export default function DashboardPage({ gameState }: DashboardPageProps) {
  const { state } = gameState;
  const activeTasks = state.tasks.filter((t) => t.status !== 'done');
  const completedToday = state.tasks.filter((t) => {
    if (!t.completedAt) return false;
    const today = new Date().toDateString();
    return new Date(t.completedAt).toDateString() === today;
  });
  const message = getMotivationalMessage();

  return (
    <div className={styles.page}>
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeLeft}>
          <h1 className={styles.welcomeTitle}>Welcome back, {state.character.name}! 🌟</h1>
          <p className={styles.welcomeMessage}>{message}</p>
          <div className={styles.quickStats}>
            <div className={styles.stat}>
              <Target size={18} />
              <span>{activeTasks.length} active quests</span>
            </div>
            <div className={styles.stat}>
              <Sparkles size={18} />
              <span>{completedToday.length} done today</span>
            </div>
            <div className={styles.stat}>
              <Flame size={18} />
              <span>{state.streak} streak</span>
            </div>
          </div>
        </div>
        <div className={styles.welcomeRight}>
          <CharacterAvatar character={state.character} size="large" />
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏆</div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{state.level}</span>
            <span className={styles.statLabel}>Level</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⚡</div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{state.xp}/{state.xpToNext}</span>
            <span className={styles.statLabel}>XP to next</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🪙</div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{state.coins}</span>
            <span className={styles.statLabel}>Coins</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{state.tasksCompleted}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>
      </div>

      {activeTasks.length > 0 ? (
        <div className={styles.upcomingSection}>
          <h2 className={styles.sectionTitle}>
            <Trophy size={20} />
            Upcoming Quests
          </h2>
          <div className={styles.upcomingList}>
            {activeTasks.slice(0, 5).map((task) => (
              <div key={task.id} className={styles.upcomingItem}>
                <span className={styles.upcomingPriority}>
                  {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                </span>
                <span className={styles.upcomingTitle}>{task.title}</span>
                <span className={styles.upcomingStatus}>
                  {task.status === 'in-progress' ? '🔨 In Progress' : '📋 To Do'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyEmoji}>🌸</span>
          <h3>All caught up!</h3>
          <p>No active quests. Add some from the Tasks page!</p>
        </div>
      )}
    </div>
  );
}
