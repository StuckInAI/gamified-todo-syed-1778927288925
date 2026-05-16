import { Coins, Star, Zap } from 'lucide-react';
import styles from './TopBar.module.css';

type TopBarProps = {
  level: number;
  coins: number;
  xp: number;
  xpToNext: number;
};

export default function TopBar({ level, coins, xp, xpToNext }: TopBarProps) {
  const xpPercent = Math.min((xp / xpToNext) * 100, 100);

  return (
    <div className={styles.topbar}>
      <div className={styles.levelBadge}>
        <Star size={16} />
        <span>Lv. {level}</span>
      </div>
      <div className={styles.xpBar}>
        <Zap size={14} className={styles.xpIcon} />
        <div className={styles.xpTrack}>
          <div className={styles.xpFill} style={{ width: `${xpPercent}%` }} />
        </div>
        <span className={styles.xpText}>{xp}/{xpToNext}</span>
      </div>
      <div className={styles.coinsBadge}>
        <Coins size={16} />
        <span>{coins}</span>
      </div>
    </div>
  );
}
