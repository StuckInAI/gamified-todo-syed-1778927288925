export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export function getDaysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getDeadlineStatus(deadline: string, extensionDays: number): 'safe' | 'soon' | 'extended' | 'overdue' {
  const daysUntilDeadline = getDaysUntil(deadline);
  const extendedDeadline = addDays(deadline, extensionDays);
  const daysUntilExtended = getDaysUntil(extendedDeadline);

  if (daysUntilDeadline > 3) return 'safe';
  if (daysUntilDeadline > 0) return 'soon';
  if (daysUntilExtended >= 0) return 'extended';
  return 'overdue';
}

export function getMotivationalMessage(): string {
  const messages = [
    'You\'re doing amazing! 🌟',
    'One step at a time! 🐾',
    'Believe in yourself! 💪',
    'Every task completed is progress! 🎯',
    'You\'ve got this! ✨',
    'Keep up the great work! 🌈',
    'Small wins add up! 🏆',
    'Today is a good day to be productive! ☀️',
    'Your future self will thank you! 🌸',
    'Progress, not perfection! 💖',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
