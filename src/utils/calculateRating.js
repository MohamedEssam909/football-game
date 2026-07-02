import { POSITIONS } from '../data/positions.js'
import { RARITY_RANK } from '../data/rarity.js'
import { getPositionFit } from './positionFit.js'
import { calculateChemistry } from './calculateChemistry.js'

// Weights from the game plan: player quality dominates, chemistry and balance
// refine it. Result is a 0..100 team score, also expressed out of 10.
const WEIGHTS = { players: 0.6, chemistry: 0.25, balance: 0.15 }

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function average(numbers) {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
}

// A player's rating adjusted for how well they fit the slot they play in.
function effectiveRating(player, slotPosition) {
  return player.rating * getPositionFit(player, slotPosition).multiplier
}

function gradeFor(score10) {
  if (score10 >= 9.5) return 'Legendary Squad'
  if (score10 >= 8.5) return 'World-Class Squad'
  if (score10 >= 7.5) return 'Strong Squad'
  if (score10 >= 6.5) return 'Good Squad'
  return 'Needs Improvement'
}

// Line ratings (attack/midfield/defense/goalkeeping) from each slot's line.
function lineRatings(entries) {
  const buckets = { ATT: [], MID: [], DEF: [], GK: [] }
  for (const { player, slot } of entries) {
    const line = POSITIONS[slot.position]?.line
    if (buckets[line]) buckets[line].push(effectiveRating(player, slot.position))
  }
  return {
    attack: Math.round(average(buckets.ATT)),
    midfield: Math.round(average(buckets.MID)),
    defense: Math.round(average(buckets.DEF)),
    goalkeeping: Math.round(average(buckets.GK)),
  }
}

// Balance rewards squads whose lines are evenly strong. A big gap between the
// best and worst line drags the score down.
function squadBalance(lines) {
  const values = [lines.attack, lines.midfield, lines.defense, lines.goalkeeping].filter(
    (v) => v > 0,
  )
  if (values.length === 0) return 0
  const spread = Math.max(...values) - Math.min(...values)
  return clamp(100 - spread * 2, 0, 100)
}

function funComment(lines, chemistry) {
  const { attack, midfield, defense, goalkeeping } = lines
  if (attack >= 90 && defense >= 88) return 'This team is completely illegal. 🔥'
  if (attack >= 90) return 'This attack is illegal. Defenders beware.'
  if (defense >= 90 && goalkeeping >= 88) return 'A wall at the back — nobody scores past this.'
  if (chemistry >= 80) return 'The chemistry is unreal, they play like old friends.'
  if (midfield < attack - 8 && midfield < defense - 8) return 'Great ends, but the midfield needs balance.'
  if (chemistry < 45) return 'Talented, but they barely know each other.'
  return 'A solid squad with room to grow.'
}

// Highest / lowest by effective rating, with rarity as a tie-breaker.
function pickExtreme(entries, direction) {
  return entries.reduce((best, entry) => {
    const a = effectiveRating(entry.player, entry.slot.position)
    const b = effectiveRating(best.player, best.slot.position)
    if (direction === 'max') return a > b ? entry : best
    return a < b ? entry : best
  }).player
}

/**
 * Compute the full end-of-game summary.
 *
 * @param {{player: object, slot: object}[]} squad - the 11 chosen players
 * @param {object[]} missedPlayers - players revealed in unopened boxes
 */
export function calculateRating(squad, missedPlayers = []) {
  if (!squad || squad.length === 0) {
    return null
  }

  const playerAvg = average(
    squad.map(({ player, slot }) => effectiveRating(player, slot.position)),
  )
  const chemistry = calculateChemistry(squad)
  const lines = lineRatings(squad)
  const balance = squadBalance(lines)

  const score100 =
    playerAvg * WEIGHTS.players +
    chemistry * WEIGHTS.chemistry +
    balance * WEIGHTS.balance
  const score10 = clamp(score100 / 10, 0, 10)

  // Best value = strongest player from a low rarity tier (a genuine pack gem).
  const valueCandidates = squad
    .map((e) => e.player)
    .filter((p) => RARITY_RANK[p.rarity] <= 2)
  const bestValue =
    valueCandidates.length > 0
      ? valueCandidates.reduce((a, b) => (a.rating >= b.rating ? a : b))
      : null

  // Rarest card = highest rarity rank, ties broken by rating.
  const rarest = squad
    .map((e) => e.player)
    .reduce((a, b) => {
      const ra = RARITY_RANK[a.rarity] ?? 0
      const rb = RARITY_RANK[b.rarity] ?? 0
      if (rb > ra) return b
      if (rb === ra && b.rating > a.rating) return b
      return a
    })

  const biggestMissed =
    missedPlayers.length > 0
      ? missedPlayers.reduce((a, b) => (a.rating >= b.rating ? a : b))
      : null

  return {
    score10: Math.round(score10 * 10) / 10,
    grade: gradeFor(score10),
    playerAverage: Math.round(playerAvg),
    chemistry,
    balance: Math.round(balance),
    lines,
    bestPlayer: pickExtreme(squad, 'max'),
    worstPlayer: pickExtreme(squad, 'min'),
    bestValue,
    rarest,
    biggestMissed,
    comment: funComment(lines, chemistry),
  }
}
