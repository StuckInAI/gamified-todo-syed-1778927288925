import { Lock, Check, ShoppingCart } from 'lucide-react';
import clsx from 'clsx';
import type { ShopItem } from '@/types';
import styles from './ShopItemCard.module.css';

type ShopItemCardProps = {
  item: ShopItem;
  owned: boolean;
  canAfford: boolean;
  levelUnlocked: boolean;
  onPurchase: (itemId: string, price: number) => void;
};

export default function ShopItemCard({ item, owned, canAfford, levelUnlocked, onPurchase }: ShopItemCardProps) {
  const locked = !levelUnlocked;

  return (
    <div className={clsx(styles.card, owned && styles.owned, locked && styles.locked)}>
      <div className={styles.emojiContainer}>
        <span className={styles.emoji}>{item.emoji}</span>
      </div>
      <div className={styles.info}>
        <h4 className={styles.name}>{item.name}</h4>
        <p className={styles.description}>{item.description}</p>
        <span className={styles.category}>{item.category}</span>
      </div>
      <div className={styles.footer}>
        {locked ? (
          <div className={styles.lockBadge}>
            <Lock size={14} />
            <span>Lv.{item.unlockLevel}</span>
          </div>
        ) : owned ? (
          <div className={styles.ownedBadge}>
            <Check size={14} />
            <span>Owned</span>
          </div>
        ) : (
          <button
            className={clsx(styles.buyBtn, !canAfford && styles.cantAfford)}
            onClick={() => onPurchase(item.id, item.price)}
            disabled={!canAfford}
          >
            <ShoppingCart size={14} />
            <span>🪙 {item.price}</span>
          </button>
        )}
      </div>
    </div>
  );
}
