import { CheckCircle, Circle, Clock, Trash2, AlertTriangle, PlayCircle } from 'lucide-react';
import clsx from 'clsx';
import type { Task } from '@/types';
import { formatDate, addDays, getDeadlineStatus, getDaysUntil } from '@/lib/utils';
import styles from './TaskCard.module.css';

type TaskCardProps = {
  task: Task;
  onUpdateStatus: (taskId: string, status: 'todo' | 'in-progress' | 'done') => void;
  onDelete: (taskId: string) => void;
};

function getPriorityEmoji(priority: string): string {
  switch (priority) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
    default: return '⚪';
  }
}

export default function TaskCard({ task, onUpdateStatus, onDelete }: TaskCardProps) {
  const deadlineStatus = task.status === 'done' ? 'safe' : getDeadlineStatus(task.deadline, task.extensionDays);
  const extendedDeadline = addDays(task.deadline, task.extensionDays);
  const daysLeft = getDaysUntil(task.deadline);
  const daysLeftExtended = getDaysUntil(extendedDeadline);
  const isDone = task.status === 'done';

  function getDeadlineLabel(): string {
    if (isDone) return 'Completed!';
    if (deadlineStatus === 'overdue') return 'Overdue!';
    if (deadlineStatus === 'extended') return `Extension: ${daysLeftExtended}d left`;
    if (deadlineStatus === 'soon') return `${daysLeft}d left`;
    return `${daysLeft}d left`;
  }

  return (
    <div className={clsx(styles.card, isDone && styles.done, styles[deadlineStatus])}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.priority}>{getPriorityEmoji(task.priority)}</span>
          <h3 className={clsx(styles.title, isDone && styles.titleDone)}>{task.title}</h3>
        </div>
        <div className={styles.rewards}>
          <span className={styles.xpBadge}>⚡{task.xpReward}</span>
          <span className={styles.coinBadge}>🪙{task.coinReward}</span>
        </div>
      </div>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.footer}>
        <div className={styles.deadlineInfo}>
          <Clock size={14} />
          <span className={styles.deadlineDate}>{formatDate(task.deadline)}</span>
          {task.extensionDays > 0 && (
            <span className={styles.extensionBadge}>
              +{task.extensionDays}d grace
            </span>
          )}
        </div>
        <div className={clsx(styles.statusLabel, styles[`status-${deadlineStatus}`])}>
          {deadlineStatus === 'overdue' && <AlertTriangle size={12} />}
          {getDeadlineLabel()}
        </div>
      </div>

      <div className={styles.actions}>
        {!isDone && task.status === 'todo' && (
          <button
            className={clsx(styles.actionBtn, styles.startBtn)}
            onClick={() => onUpdateStatus(task.id, 'in-progress')}
            title="Start task"
          >
            <PlayCircle size={16} />
            <span>Start</span>
          </button>
        )}
        {!isDone && (
          <button
            className={clsx(styles.actionBtn, styles.completeBtn)}
            onClick={() => onUpdateStatus(task.id, 'done')}
            title="Complete task"
          >
            <CheckCircle size={16} />
            <span>Complete</span>
          </button>
        )}
        {isDone && (
          <div className={styles.completedBadge}>
            <Circle size={16} />
            <span>Done! ✨</span>
          </div>
        )}
        <button
          className={clsx(styles.actionBtn, styles.deleteBtn)}
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
