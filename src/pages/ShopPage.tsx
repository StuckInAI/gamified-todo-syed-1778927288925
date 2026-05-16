import { useState } from 'react';
import clsx from 'clsx';
import ShopItemCard from '@/components/shop/ShopItemCard';
import { shopItems } from '@/lib/shopData';
import type { ItemCategory } from '@/types';
import type { useGameState } from '@/hooks/useGameState';
import styles from './ShopPage.module.css';

type ShopPageProps = {
  gameState: ReturnType<typeof useGameState>;
};

type FilterCategory = 'all' | ItemCategory;

const categoryFilters: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: '🏪 All' },
  { value: 'hat', label: '🎩 Hats' },
  { value: 'outfit', label: '👗 Outfits' },
  { value: 'accessory', label: '✨ Accessories' },
  { value: 'background', label: '🖼️ Backgrounds' },
  { value: 'pet', label: '🐾 Pets' },
];

export default function ShopPage({ gameState }: ShopPageProps) {
  const { state, purchaseItem } = gameState;
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredItems = activeFilter === 'all'
    ? shopItems
    : shopItems.filter((item) => item.category === activeFilter);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>🛍️ Cozy Shop</h1>
          <p className={styles.subtitle}>Spend your hard-earned coins on adorable items!</p>
        </div>
        <div className={styles.coinDisplay}>
          <span className={styles.coinEmoji}>🪙</span>
          <span className={styles.coinAmount}>{state.coins}</span>
        </div>
      </div>

      <div className={styles.filters}>
        {categoryFilters.map((f) => (
          <button
            key={f.value}
            className={clsx(styles.filterBtn, activeFilter === f.value && styles.filterActive)}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredItems.map((item) => (
          <ShopItemCard
            key={item.id}
            item={item}
            owned={state.ownedItems.includes(item.id)}
            canAfford={state.coins >= item.price}
            levelUnlocked={state.level >= item.unlockLevel}
            onPurchase={purchaseItem}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className={styles.emptyState}>
          <span className={styles.emptyEmoji}>🏪</span>
          <p>No items in this category.</p>
        </div>
      )}
    </div>
  );
}
