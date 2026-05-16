import clsx from 'clsx';
import type { Character } from '@/types';
import { shopItems } from '@/lib/shopData';
import styles from './CharacterAvatar.module.css';

type CharacterAvatarProps = {
  character: Character;
  size?: 'small' | 'medium' | 'large';
};

function getItemEmoji(itemId: string | null): string | null {
  if (!itemId) return null;
  const item = shopItems.find((i) => i.id === itemId);
  return item ? item.emoji : null;
}

export default function CharacterAvatar({ character, size = 'medium' }: CharacterAvatarProps) {
  const bgEmoji = getItemEmoji(character.background);
  const hatEmoji = getItemEmoji(character.hat);
  const outfitEmoji = getItemEmoji(character.outfit);
  const accEmoji = getItemEmoji(character.accessory);
  const petEmoji = getItemEmoji(character.pet);

  return (
    <div className={clsx(styles.avatarContainer, styles[size])}>
      {bgEmoji && <div className={styles.background}>{bgEmoji}</div>}
      <div className={styles.characterBody}>
        {hatEmoji && <div className={styles.hat}>{hatEmoji}</div>}
        <div className={styles.face}>😊</div>
        {outfitEmoji && <div className={styles.outfit}>{outfitEmoji}</div>}
        {accEmoji && <div className={styles.accessory}>{accEmoji}</div>}
      </div>
      {petEmoji && <div className={styles.pet}>{petEmoji}</div>}
    </div>
  );
}
