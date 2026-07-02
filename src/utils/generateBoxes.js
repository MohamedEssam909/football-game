import { PLAYERS } from '../data/players.js'
import { RARITY, RARITY_ORDER } from '../data/rarity.js'

const BOXES_PER_POSITION = 4

// --- Randomness knobs -------------------------------------------------------
// Per-box "luck": each box independently rolls a luck tier that reshapes the
// rarity odds for that single draw, so a set of 4 boxes can mix a jackpot and a
// dud. Chances below are per box.
const LUCK_CHANCE = { jackpot: 0.12, dud: 0.16 } // remainder is 'normal'

// Multipliers applied to each rarity's base weight per luck tier.
const LUCK_MULT = {
  jackpot: {
    Common: 0.25,
    Rare: 0.7,
    Epic: 2.4,
    Icon: 4,
    'Egyptian Legend': 3,
    'Egyptian Phenomena': 3.8,
  },
  dud: {
    Common: 3,
    Rare: 1.2,
    Epic: 0.4,
    Icon: 0.12,
    'Egyptian Legend': 0.15,
    'Egyptian Phenomena': 0.12,
  },
  normal: {
    Common: 1,
    Rare: 1,
    Epic: 1,
    Icon: 1,
    'Egyptian Legend': 1,
    'Egyptian Phenomena': 1,
  },
}

// Per-position odds: once per set of boxes we jitter each rarity's weight so no
// two positions (or runs) feel identical.
const ODDS_JITTER_MIN = 0.7
const ODDS_JITTER_MAX = 1.4

function rollLuck() {
  const r = Math.random()
  if (r < LUCK_CHANCE.jackpot) return 'jackpot'
  if (r < LUCK_CHANCE.jackpot + LUCK_CHANCE.dud) return 'dud'
  return 'normal'
}

function makePositionOdds() {
  const odds = {}
  for (const rarity of RARITY_ORDER) {
    odds[rarity] = ODDS_JITTER_MIN + Math.random() * (ODDS_JITTER_MAX - ODDS_JITTER_MIN)
  }
  return odds
}

function baseWeight(rarity) {
  return RARITY[rarity]?.weight ?? 1
}

// Effective draw weight for a player given the current position odds and this
// box's luck tier.
function effectiveWeight(player, positionOdds, luck) {
  const rarity = player.rarity
  return (
    baseWeight(rarity) *
    (positionOdds[rarity] ?? 1) *
    (LUCK_MULT[luck]?.[rarity] ?? 1)
  )
}

// A player is eligible for a position if it is their primary or a secondary
// position. Out-of-position players are only used as a last-resort fallback.
function isPrimaryOrSecondary(player, positionCode) {
  return (
    player.position === positionCode ||
    (player.secondaryPositions || []).includes(positionCode)
  )
}

// Pick one player from `remaining` weighted by `weightFn`, remove it, return it.
function drawWeighted(remaining, weightFn) {
  const total = remaining.reduce((sum, p) => sum + weightFn(p), 0)
  if (total <= 0) {
    // All weights zeroed out (extreme luck vs a thin pool) — fall back to uniform.
    return remaining.splice(Math.floor(Math.random() * remaining.length), 1)[0]
  }
  let roll = Math.random() * total
  let index = remaining.length - 1
  for (let i = 0; i < remaining.length; i += 1) {
    roll -= weightFn(remaining[i])
    if (roll <= 0) {
      index = i
      break
    }
  }
  return remaining.splice(index, 1)[0]
}

// Draw `count` players from `pool` without replacement. Each draw rolls its own
// luck so boxes within a set vary. Returns the drawn players.
function drawBoxes(pool, count, positionOdds) {
  const remaining = [...pool]
  const picked = []
  while (picked.length < count && remaining.length > 0) {
    const luck = rollLuck()
    picked.push(drawWeighted(remaining, (p) => effectiveWeight(p, positionOdds, luck)))
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
 * Randomness: each set jitters the per-rarity odds, and each individual box
 * rolls a jackpot / dud / normal luck tier that reshapes those odds — so pulls
 * swing and no two positions feel the same.
 *
 * @param {string} positionCode  e.g. 'GK', 'CB', 'ST'
 * @param {string[]} usedPlayerIds  ids already chosen for the squad
 * @returns {{player: object}[]} exactly 4 boxes (fewer only if the DB is tiny)
 */
export function generateBoxes(positionCode, usedPlayerIds = []) {
  const used = new Set(usedPlayerIds)
  const available = PLAYERS.filter((p) => !used.has(p.id))
  const positionOdds = makePositionOdds()

  const eligible = available.filter((p) => isPrimaryOrSecondary(p, positionCode))
  let boxes = drawBoxes(eligible, BOXES_PER_POSITION, positionOdds)

  // Fallback 1: not enough position-appropriate players left — relax to any
  // unused player (out of position). Chemistry/rating penalize the mismatch.
  if (boxes.length < BOXES_PER_POSITION) {
    const chosenIds = new Set(boxes.map((p) => p.id))
    boxes = boxes.concat(
      drawBoxes(
        available.filter((p) => !chosenIds.has(p.id)),
        BOXES_PER_POSITION - boxes.length,
        positionOdds,
      ),
    )
  }

  // Fallback 2: database itself is smaller than 4 unused players (should not
  // happen with the shipped roster). Allow reuse just to keep the game playable.
  if (boxes.length < BOXES_PER_POSITION) {
    const chosenIds = new Set(boxes.map((p) => p.id))
    boxes = boxes.concat(
      drawBoxes(
        PLAYERS.filter((p) => !chosenIds.has(p.id)),
        BOXES_PER_POSITION - boxes.length,
        positionOdds,
      ),
    )
  }

  // Wrap each player in a box object. Components read `box.player`.
  return boxes.map((player) => ({ player }))
}

export { BOXES_PER_POSITION }
