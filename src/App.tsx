import { Routes, Route, Navigate } from 'react-router-dom';
import { useGameState } from '@/hooks/useGameState';
import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/DashboardPage';
import TasksPage from '@/pages/TasksPage';
import CharacterPage from '@/pages/CharacterPage';
import ShopPage from '@/pages/ShopPage';
import NotificationToast from '@/components/notifications/NotificationToast';

export default function App() {
  const gameState = useGameState();

  return (
    <>
      <NotificationToast
        notifications={gameState.notifications}
        onDismiss={gameState.dismissNotification}
      />
      <Layout level={gameState.state.level} coins={gameState.state.coins} xp={gameState.state.xp} xpToNext={gameState.state.xpToNext}>
        <Routes>
          <Route path="/" element={<DashboardPage gameState={gameState} />} />
          <Route path="/tasks" element={<TasksPage gameState={gameState} />} />
          <Route path="/character" element={<CharacterPage gameState={gameState} />} />
          <Route path="/shop" element={<ShopPage gameState={gameState} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}
