import type { ShopItem } from '@/types';

export const shopItems: ShopItem[] = [
  // Hats
  { id: 'hat-flower-crown', name: 'Flower Crown', category: 'hat', price: 30, emoji: '🌸', description: 'A delicate crown of spring flowers', unlockLevel: 1 },
  { id: 'hat-wizard', name: 'Wizard Hat', category: 'hat', price: 50, emoji: '🧙', description: 'A mystical pointed hat', unlockLevel: 3 },
  { id: 'hat-crown', name: 'Royal Crown', category: 'hat', price: 100, emoji: '👑', description: 'Fit for productivity royalty', unlockLevel: 5 },
  { id: 'hat-bunny', name: 'Bunny Ears', category: 'hat', price: 40, emoji: '🐰', description: 'Adorable floppy bunny ears', unlockLevel: 2 },
  { id: 'hat-party', name: 'Party Hat', category: 'hat', price: 20, emoji: '🎉', description: 'Every day is a celebration!', unlockLevel: 1 },
  { id: 'hat-cowboy', name: 'Cowboy Hat', category: 'hat', price: 60, emoji: '🤠', description: 'Yeehaw, partner!', unlockLevel: 4 },

  // Outfits
  { id: 'outfit-cozy', name: 'Cozy Sweater', category: 'outfit', price: 40, emoji: '🧶', description: 'A warm knitted sweater', unlockLevel: 1 },
  { id: 'outfit-hero', name: 'Hero Cape', category: 'outfit', price: 80, emoji: '🦸', description: 'You ARE a hero!', unlockLevel: 4 },
  { id: 'outfit-fairy', name: 'Fairy Wings', category: 'outfit', price: 120, emoji: '🧚', description: 'Sparkly translucent wings', unlockLevel: 6 },
  { id: 'outfit-overalls', name: 'Garden Overalls', category: 'outfit', price: 35, emoji: '👗', description: 'Perfect for tending your tasks', unlockLevel: 2 },
  { id: 'outfit-astronaut', name: 'Space Suit', category: 'outfit', price: 150, emoji: '🚀', description: 'Reach for the stars!', unlockLevel: 8 },

  // Accessories
  { id: 'acc-glasses', name: 'Round Glasses', category: 'accessory', price: 25, emoji: '🤓', description: 'Scholarly and cute', unlockLevel: 1 },
  { id: 'acc-wand', name: 'Magic Wand', category: 'accessory', price: 60, emoji: '✨', description: 'Wave away procrastination', unlockLevel: 3 },
  { id: 'acc-scarf', name: 'Cozy Scarf', category: 'accessory', price: 30, emoji: '🧣', description: 'Warm and fashionable', unlockLevel: 2 },
  { id: 'acc-shield', name: 'Task Shield', category: 'accessory', price: 75, emoji: '🛡️', description: 'Protected from burnout', unlockLevel: 5 },
  { id: 'acc-book', name: 'Spell Book', category: 'accessory', price: 45, emoji: '📖', description: 'Contains productivity spells', unlockLevel: 3 },

  // Backgrounds
  { id: 'bg-garden', name: 'Cozy Garden', category: 'background', price: 50, emoji: '🌻', description: 'A peaceful sunflower garden', unlockLevel: 2 },
  { id: 'bg-forest', name: 'Enchanted Forest', category: 'background', price: 80, emoji: '🌲', description: 'Mystical trees and fireflies', unlockLevel: 4 },
  { id: 'bg-beach', name: 'Sunset Beach', category: 'background', price: 70, emoji: '🏖️', description: 'Waves and golden light', unlockLevel: 3 },
  { id: 'bg-castle', name: 'Cloud Castle', category: 'background', price: 120, emoji: '🏰', description: 'A castle floating in clouds', unlockLevel: 7 },
  { id: 'bg-space', name: 'Starry Night', category: 'background', price: 100, emoji: '🌌', description: 'Among the twinkling stars', unlockLevel: 5 },

  // Pets
  { id: 'pet-cat', name: 'Cozy Cat', category: 'pet', price: 60, emoji: '🐱', description: 'A purring companion', unlockLevel: 2 },
  { id: 'pet-dog', name: 'Loyal Pup', category: 'pet', price: 60, emoji: '🐶', description: 'Always by your side', unlockLevel: 2 },
  { id: 'pet-dragon', name: 'Baby Dragon', category: 'pet', price: 150, emoji: '🐉', description: 'A tiny fire-breathing friend', unlockLevel: 6 },
  { id: 'pet-owl', name: 'Wise Owl', category: 'pet', price: 80, emoji: '🦉', description: 'Hoots encouragement', unlockLevel: 4 },
  { id: 'pet-unicorn', name: 'Mini Unicorn', category: 'pet', price: 200, emoji: '🦄', description: 'Magical and majestic', unlockLevel: 8 },
];
