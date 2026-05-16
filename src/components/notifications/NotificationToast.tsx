import { X } from 'lucide-react';
import clsx from 'clsx';
import type { RewardNotification } from '@/types';
import styles from './NotificationToast.module.css';

type NotificationToastProps = {
  notifications: RewardNotification[];
  onDismiss: (id: string) => void;
};

function getIcon(type: string): string {
  switch (type) {
    case 'xp': return '⚡';
    case 'coins': return '🪙';
    case 'level-up': return '🎉';
    case 'item': return '🎁';
    default: return '✨';
  }
}

export default function NotificationToast({ notifications, onDismiss }: NotificationToastProps) {
  if (notifications.length === 0) return null;

  return (
    <div className={styles.container}>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={clsx(styles.toast, styles[notif.type])}
        >
          <span className={styles.icon}>{getIcon(notif.type)}</span>
          <span className={styles.message}>{notif.message}</span>
          <button
            className={styles.dismiss}
            onClick={() => onDismiss(notif.id)}
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
