import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import clsx from 'clsx';
import TaskCard from '@/components/tasks/TaskCard';
import TaskForm from '@/components/tasks/TaskForm';
import type { TaskStatus, TaskPriority } from '@/types';
import type { useGameState } from '@/hooks/useGameState';
import styles from './TasksPage.module.css';

type TasksPageProps = {
  gameState: ReturnType<typeof useGameState>;
};

type FilterStatus = 'all' | TaskStatus;
type FilterPriority = 'all' | TaskPriority;

export default function TasksPage({ gameState }: TasksPageProps) {
  const { state, addTask, updateTaskStatus, deleteTask } = gameState;
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');

  const filteredTasks = state.tasks.filter((task) => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.status === 'done' && b.status !== 'done') return 1;
    if (a.status !== 'done' && b.status === 'done') return -1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>📋 Quest Board</h1>
          <p className={styles.subtitle}>{state.tasks.length} quests total • {state.tasks.filter((t) => t.status === 'done').length} completed</p>
        </div>
        <button
          className={styles.addBtn}
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          New Quest
        </button>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={(task) => {
            addTask(task);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className={styles.filters}>
        <Filter size={16} />
        <div className={styles.filterGroup}>
          {(['all', 'todo', 'in-progress', 'done'] as FilterStatus[]).map((s) => (
            <button
              key={s}
              className={clsx(styles.filterBtn, filterStatus === s && styles.filterActive)}
              onClick={() => setFilterStatus(s)}
            >
              {s === 'all' ? 'All' : s === 'todo' ? '📋 To Do' : s === 'in-progress' ? '🔨 In Progress' : '✅ Done'}
            </button>
          ))}
        </div>
        <div className={styles.filterGroup}>
          {(['all', 'low', 'medium', 'high'] as FilterPriority[]).map((p) => (
            <button
              key={p}
              className={clsx(styles.filterBtn, filterPriority === p && styles.filterActive)}
              onClick={() => setFilterPriority(p)}
            >
              {p === 'all' ? 'All' : p === 'low' ? '🟢' : p === 'medium' ? '🟡' : '🔴'}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.taskList}>
        {sortedTasks.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyEmoji}>🌿</span>
            <h3>No quests yet!</h3>
            <p>Click "New Quest" to create your first adventure.</p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={updateTaskStatus}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
