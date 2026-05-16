import { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
  level: number;
  coins: number;
  xp: number;
  xpToNext: number;
};

export default function Layout({ children, level, coins, xp, xpToNext }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <TopBar level={level} coins={coins} xp={xp} xpToNext={xpToNext} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
