import { PLAYERS } from '../data/players.js'
import { RARITY } from '../data/rarity.js'

const BOXES_PER_POSITION = 4

// A player is eligible for a position if it is their primary or a secondary
// position. Out-of-position players are only used as a last-resort fallback.
function isPrimaryOrSecondary(player, positionCode) {
  return (
    player.position === positionCode ||
    (player.secondaryPositions || []).includes(positionCode)
  )
}

// Weighted random pick without replacement. Each draw is weighted by the
// player's rarity weight, so Commons show up more often than Icons. Mutates a
// copy of `pool` by removing the chosen player so the same card can't repeat
// inside one set of boxes.
function weightedSample(pool, count) {
  const remaining = [...pool]
  const picked = []

  while (picked.length < count && remaining.length > 0) {
    const totalWeight = remaining.reduce(
      (sum, p) => sum + (RARITY[p.rarity]?.weight ?? 1),
      0,
    )
    let roll = Math.random() * totalWeight
    let index = 0
    for (let i = 0; i < remaining.length; i += 1) {
      roll -= RARITY[remaining[i].rarity]?.weight ?? 1
      if (roll <= 0) {
        index = i
        break
      }
    }
    picked.push(remaining[index])
    remaining.splice(index, 1)
  }

  return picked
}

/**
 * Generate the 4 mystery-box players for a position.
 *
 * Guarantees:
 *  - No player already used in the squad (usedPlayerIds) appears.
 *  - No duplicate players within the returned set.
 *  - Always returns exactly BOXES_PER_POSITION players when the database is
 *    large enough, degrading gracefully:
 *      1) natural/secondary-position players, then
 *      2) any position (out of position), then
 *      3) (only if the DB is too small) allows reusing already-picked players.
 *
 * @param {string} positionCode  e.g. 'GK', 'CB', 'ST'
 * @param {string[]} usedPlayerIds  ids already chosen for the squad
 * @returns {{player: object}[]} exactly 4 boxes (fewer only if the DB is tiny)
 */
export function generateBoxes(positionCode, usedPlayerIds = []) {
  const used = new Set(usedPlayerIds)
  const available = PLAYERS.filter((p) => !used.has(p.id))

  const eligible = available.filter((p) => isPrimaryOrSecondary(p, positionCode))
  let boxes = weightedSample(eligible, BOXES_PER_POSITION)

  // Fallback 1: not enough position-appropriate players left — relax to any
  // unused player (out of position). Flag them so chemistry/rating can penalize.
  if (boxes.length < BOXES_PER_POSITION) {
    const chosenIds = new Set(boxes.map((p) => p.id))
    const filler = weightedSample(
      available.filter((p) => !chosenIds.has(p.id)),
      BOXES_PER_POSITION - boxes.length,
    )
    boxes = boxes.concat(filler)
  }

  // Fallback 2: database itself is smaller than 4 unused players (should not
  // happen with the shipped roster). Allow reuse just to keep the game playable.
  if (boxes.length < BOXES_PER_POSITION) {
    const chosenIds = new Set(boxes.map((p) => p.id))
    const anyPlayers = PLAYERS.filter((p) => !chosenIds.has(p.id))
    boxes = boxes.concat(
      weightedSample(anyPlayers, BOXES_PER_POSITION - boxes.length),
    )
  }

  // Wrap each player in a box object. Components read `box.player`, and this
  // shape leaves room to attach per-box metadata later without touching callers.
  return boxes.map((player) => ({ player }))
}

export { BOXES_PER_POSITION }
