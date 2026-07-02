import { RARITY } from '../data/rarity.js'

// Thin lookup so components never import the raw RARITY map. Unknown rarities
// fall back to Common styling instead of throwing.
export function getRarityStyle(rarity) {
  return RARITY[rarity] || RARITY.Common
}
