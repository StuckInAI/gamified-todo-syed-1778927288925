export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type ItemCategory = 'hat' | 'outfit' | 'accessory' | 'background' | 'pet';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string;
  extensionDays: number;
  createdAt: string;
  completedAt: string | null;
  xpReward: number;
  coinReward: number;
}

export interface ShopItem {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  emoji: string;
  description: string;
  unlockLevel: number;
}

export interface Character {
  name: string;
  hat: string | null;
  outfit: string | null;
  accessory: string | null;
  background: string | null;
  pet: string | null;
}

export interface GameState {
  level: number;
  xp: number;
  xpToNext: number;
  coins: number;
  tasksCompleted: number;
  streak: number;
  character: Character;
  ownedItems: string[];
  tasks: Task[];
}

export interface RewardNotification {
  id: string;
  type: 'xp' | 'coins' | 'level-up' | 'item';
  message: string;
  amount: number;
}
