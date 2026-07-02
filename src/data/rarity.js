// Rarity tiers drive both the look of a card and how likely a player is to
// appear inside a mystery box. Weights are relative, not percentages, so box
// generation normalizes them against whatever players are actually eligible.

export const RARITY = {
  Common: {
    label: 'Common',
    weight: 40,
    // Tailwind classes; kept here so getRarityColor stays a thin lookup.
    border: 'border-slate-400',
    ring: 'ring-slate-400/40',
    badgeBg: 'bg-slate-500',
    glow: 'shadow-slate-500/20',
    text: 'text-slate-100',
  },
  Rare: {
    label: 'Rare',
    weight: 30,
    border: 'border-sky-400',
    ring: 'ring-sky-400/40',
    badgeBg: 'bg-sky-500',
    glow: 'shadow-sky-500/40',
    text: 'text-sky-50',
  },
  Epic: {
    label: 'Epic',
    weight: 20,
    border: 'border-purple-400',
    ring: 'ring-purple-400/50',
    badgeBg: 'bg-purple-500',
    glow: 'shadow-purple-500/50',
    text: 'text-purple-50',
  },
  Icon: {
    label: 'Icon',
    weight: 10,
    border: 'border-amber-400',
    ring: 'ring-amber-400/60',
    badgeBg: 'bg-amber-500',
    glow: 'shadow-amber-500/60',
    text: 'text-amber-50',
  },
  'Egyptian Legend': {
    label: 'Egyptian Legend',
    weight: 6,
    border: 'border-red-500',
    ring: 'ring-red-500/60',
    badgeBg: 'bg-gradient-to-r from-red-600 to-amber-500',
    glow: 'shadow-red-500/60',
    text: 'text-amber-50',
  },
}

export const RARITY_ORDER = ['Common', 'Rare', 'Epic', 'Icon', 'Egyptian Legend']

// Higher number = rarer. Used for "rarest card packed" and best/worst tie-breaks.
export const RARITY_RANK = {
  Common: 1,
  Rare: 2,
  Epic: 3,
  Icon: 4,
  'Egyptian Legend': 5,
}
