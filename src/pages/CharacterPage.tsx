import { useState } from 'react';
import { Edit3, Check } from 'lucide-react';
import clsx from 'clsx';
import CharacterAvatar from '@/components/character/CharacterAvatar';
import { shopItems } from '@/lib/shopData';
import type { ItemCategory } from '@/types';
import type { useGameState } from '@/hooks/useGameState';
import styles from './CharacterPage.module.css';

type CharacterPageProps = {
  gameState: ReturnType<typeof useGameState>;
};

const categories: ItemCategory[] = ['hat', 'outfit', 'accessory', 'background', 'pet'];

const categoryLabels: Record<ItemCategory, string> = {
  hat: '🎩 Hats',
  outfit: '👗 Outfits',
  accessory: '✨ Accessories',
  background: '🖼️ Backgrounds',
  pet: '🐾 Pets',
};

export default function CharacterPage({ gameState }: CharacterPageProps) {
  const { state, equipItem, updateCharacterName } = gameState;
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(state.character.name);
  const [activeCategory, setActiveCategory] = useState<ItemCategory>('hat');

  function handleSaveName() {
    if (nameInput.trim()) {
      updateCharacterName(nameInput.trim());
    }
    setEditingName(false);
  }

  const ownedInCategory = shopItems.filter(
    (item) => item.category === activeCategory && state.ownedItems.includes(item.id)
  );

  const currentEquipped = state.character[activeCategory];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🧸 My Character</h1>

      <div className={styles.content}>
        <div className={styles.avatarSection}>
          <CharacterAvatar character={state.character} size="large" />
          <div className={styles.nameSection}>
            {editingName ? (
              <div className={styles.nameEdit}>
                <input
                  className={styles.nameInput}
                  value={nameInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') handleSaveName();
                  }}
                  autoFocus
                  maxLength={20}
                />
                <button className={styles.saveNameBtn} onClick={handleSaveName}>
                  <Check size={16} />
                </button>
              </div>
            ) : (
              <div className={styles.nameDisplay}>
                <h2 className={styles.characterName}>{state.character.name}</h2>
                <button className={styles.editNameBtn} onClick={() => { setNameInput(state.character.name); setEditingName(true); }}>
                  <Edit3 size={14} />
                </button>
              </div>
            )}
            <span className={styles.levelLabel}>Level {state.level} Adventurer</span>
          </div>
        </div>

        <div className={styles.wardrobeSection}>
          <h3 className={styles.sectionTitle}>🗄️ Wardrobe</h3>
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={clsx(styles.categoryTab, activeCategory === cat && styles.categoryActive)}
                onClick={() => setActiveCategory(cat)}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className={styles.itemGrid}>
            <button
              className={clsx(styles.wardrobeItem, currentEquipped === null && styles.wardrobeSelected)}
              onClick={() => equipItem(null, activeCategory)}
            >
              <span className={styles.wardrobeEmoji}>❌</span>
              <span className={styles.wardrobeLabel}>None</span>
            </button>
            {ownedInCategory.map((item) => (
              <button
                key={item.id}
                className={clsx(styles.wardrobeItem, currentEquipped === item.id && styles.wardrobeSelected)}
                onClick={() => equipItem(item.id, activeCategory)}
              >
                <span className={styles.wardrobeEmoji}>{item.emoji}</span>
                <span className={styles.wardrobeLabel}>{item.name}</span>
                {currentEquipped === item.id && (
                  <span className={styles.equippedBadge}>Equipped</span>
                )}
              </button>
            ))}
          </div>

          {ownedInCategory.length === 0 && (
            <div className={styles.emptyWardrobe}>
              <p>No items in this category yet! Visit the shop to buy some. 🛍️</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
