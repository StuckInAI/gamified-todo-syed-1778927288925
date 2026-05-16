import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { TaskPriority } from '@/types';
import styles from './TaskForm.module.css';

type TaskFormProps = {
  onSubmit: (task: {
    title: string;
    description: string;
    priority: TaskPriority;
    deadline: string;
    extensionDays: number;
  }) => void;
  onCancel: () => void;
};

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [deadline, setDeadline] = useState('');
  const [extensionDays, setExtensionDays] = useState(3);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !deadline) return;
    onSubmit({ title: title.trim(), description: description.trim(), priority, deadline, extensionDays });
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h3 className={styles.formTitle}>✨ New Quest</h3>
        <button type="button" className={styles.closeBtn} onClick={onCancel}>
          <X size={20} />
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Quest Name</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description (optional)</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          placeholder="Add some details..."
          rows={3}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Priority</label>
          <div className={styles.priorityGroup}>
            {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
              <button
                key={p}
                type="button"
                className={`${styles.priorityBtn} ${priority === p ? styles.priorityActive : ''}`}
                data-priority={p}
                onClick={() => setPriority(p)}
              >
                {p === 'low' ? '🟢' : p === 'medium' ? '🟡' : '🔴'} {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>📅 Deadline</label>
          <input
            className={styles.input}
            type="date"
            value={deadline}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value)}
            min={today}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>🌿 Grace Period (days)</label>
          <input
            className={styles.input}
            type="number"
            value={extensionDays}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExtensionDays(Math.max(0, parseInt(e.target.value) || 0))}
            min={0}
            max={30}
          />
          <span className={styles.hint}>
            {extensionDays > 0 ? `+${extensionDays} extra days if needed` : 'No extension'}
          </span>
        </div>
      </div>

      <div className={styles.preview}>
        <span>🎯 Rewards: </span>
        <span className={styles.previewXp}>⚡{priority === 'high' ? 50 : priority === 'medium' ? 30 : 15} XP</span>
        <span className={styles.previewCoins}>🪙{priority === 'high' ? 25 : priority === 'medium' ? 15 : 8} Coins</span>
      </div>

      <button type="submit" className={styles.submitBtn}>
        <Plus size={18} />
        Add Quest
      </button>
    </form>
  );
}
