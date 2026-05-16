import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { GameState, Task, RewardNotification } from '@/types';

const defaultCharacter = {
  name: 'Cozy Adventurer',
  hat: null,
  outfit: null,
  accessory: null,
  background: null,
  pet: null,
};

const defaultState: GameState = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  coins: 50,
  tasksCompleted: 0,
  streak: 0,
  character: defaultCharacter,
  ownedItems: [],
  tasks: [],
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function calcXpToNext(level: number): number {
  return Math.floor(100 * Math.pow(1.3, level - 1));
}

function getXpReward(priority: string): number {
  switch (priority) {
    case 'high': return 50;
    case 'medium': return 30;
    case 'low': return 15;
    default: return 15;
  }
}

function getCoinReward(priority: string): number {
  switch (priority) {
    case 'high': return 25;
    case 'medium': return 15;
    case 'low': return 8;
    default: return 8;
  }
}

export function useGameState() {
  const [state, setState] = useLocalStorage<GameState>('cozy-quest-state', defaultState);
  const [notifications, setNotifications] = useLocalStorage<RewardNotification[]>('cozy-quest-notifications', []);

  const addNotification = useCallback((notif: Omit<RewardNotification, 'id'>) => {
    const newNotif: RewardNotification = { ...notif, id: generateId() };
    setNotifications((prev: RewardNotification[]) => [...prev, newNotif]);
    setTimeout(() => {
      setNotifications((prev: RewardNotification[]) => prev.filter((n: RewardNotification) => n.id !== newNotif.id));
    }, 3000);
  }, [setNotifications]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'status' | 'xpReward' | 'coinReward'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      status: 'todo',
      createdAt: new Date().toISOString(),
      completedAt: null,
      xpReward: getXpReward(task.priority),
      coinReward: getCoinReward(task.priority),
    };
    setState((prev: GameState) => ({ ...prev, tasks: [...prev.tasks, newTask] }));
  }, [setState]);

  const updateTaskStatus = useCallback((taskId: string, status: 'todo' | 'in-progress' | 'done') => {
    setState((prev: GameState) => {
      const taskIndex = prev.tasks.findIndex((t: Task) => t.id === taskId);
      if (taskIndex === -1) return prev;
      const task = prev.tasks[taskIndex];
      if (task.status === 'done') return prev;

      const updatedTasks = [...prev.tasks];
      updatedTasks[taskIndex] = {
        ...task,
        status,
        completedAt: status === 'done' ? new Date().toISOString() : null,
      };

      if (status === 'done') {
        let newXp = prev.xp + task.xpReward;
        let newLevel = prev.level;
        let newXpToNext = prev.xpToNext;
        let newCoins = prev.coins + task.coinReward;

        while (newXp >= newXpToNext) {
          newXp -= newXpToNext;
          newLevel += 1;
          newXpToNext = calcXpToNext(newLevel);
        }

        if (newLevel > prev.level) {
          setTimeout(() => {
            addNotification({ type: 'level-up', message: `Level Up! You're now level ${newLevel}! 🎉`, amount: newLevel });
          }, 500);
        }

        setTimeout(() => {
          addNotification({ type: 'xp', message: `+${task.xpReward} XP earned!`, amount: task.xpReward });
          addNotification({ type: 'coins', message: `+${task.coinReward} coins earned!`, amount: task.coinReward });
        }, 100);

        return {
          ...prev,
          tasks: updatedTasks,
          xp: newXp,
          level: newLevel,
          xpToNext: newXpToNext,
          coins: newCoins,
          tasksCompleted: prev.tasksCompleted + 1,
          streak: prev.streak + 1,
        };
      }

      return { ...prev, tasks: updatedTasks };
    });
  }, [setState, addNotification]);

  const deleteTask = useCallback((taskId: string) => {
    setState((prev: GameState) => ({
      ...prev,
      tasks: prev.tasks.filter((t: Task) => t.id !== taskId),
    }));
  }, [setState]);

  const purchaseItem = useCallback((itemId: string, price: number): boolean => {
    let success = false;
    setState((prev: GameState) => {
      if (prev.coins < price || prev.ownedItems.includes(itemId)) return prev;
      success = true;
      return {
        ...prev,
        coins: prev.coins - price,
        ownedItems: [...prev.ownedItems, itemId],
      };
    });
    if (success) {
      addNotification({ type: 'item', message: 'New item purchased! Check your wardrobe! 🛍️', amount: 0 });
    }
    return success;
  }, [setState, addNotification]);

  const equipItem = useCallback((itemId: string | null, category: string) => {
    setState((prev: GameState) => ({
      ...prev,
      character: { ...prev.character, [category]: itemId },
    }));
  }, [setState]);

  const updateCharacterName = useCallback((name: string) => {
    setState((prev: GameState) => ({
      ...prev,
      character: { ...prev.character, name },
    }));
  }, [setState]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev: RewardNotification[]) => prev.filter((n: RewardNotification) => n.id !== id));
  }, [setNotifications]);

  return {
    state,
    notifications,
    addTask,
    updateTaskStatus,
    deleteTask,
    purchaseItem,
    equipItem,
    updateCharacterName,
    dismissNotification,
  };
}
