import { PLAYERS } from '../data/players.js'
import { RARITY_RANK } from '../data/rarity.js'
import { calculateRating } from './calculateRating.js'
import { getPositionFit } from './positionFit.js'

function shuffle(items, random = Math.random) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const temp = copy[i]
    copy[i] = copy[j]
    copy[j] = temp
  }
  return copy
}

function isEligible(player, positionCode) {
  return player.position === positionCode || player.secondaryPositions?.includes(positionCode)
}

function candidateScore(player, positionCode) {
  const fit = getPositionFit(player, positionCode).multiplier
  const rarityBoost = (RARITY_RANK[player.rarity] ?? 1) * 1.5
  return player.rating * fit + rarityBoost
}

export function getPickCandidates({ positionCode, usedPlayerIds = [], limit = 8 }) {
  const used = new Set(usedPlayerIds)
  return PLAYERS
    .filter((player) => !used.has(player.id) && isEligible(player, positionCode))
    .sort((a, b) => candidateScore(b, positionCode) - candidateScore(a, positionCode))
    .slice(0, limit)
}

export function pickRandomPlayer({ positionCode, usedPlayerIds = [], random = Math.random }) {
  const used = new Set(usedPlayerIds)
  let pool = PLAYERS.filter((player) => !used.has(player.id) && isEligible(player, positionCode))

  if (pool.length === 0) {
    pool = PLAYERS.filter((player) => !used.has(player.id))
  }

  if (pool.length === 0) {
    throw new Error('No players available for team match pick')
  }

  const ranked = shuffle(pool, random)
    .sort((a, b) => candidateScore(b, positionCode) - candidateScore(a, positionCode))
    .slice(0, Math.min(14, pool.length))

  return ranked[Math.floor(random() * ranked.length)]
}

export function buildRandomTeam({ slots, usedPlayerIds = [], random = Math.random }) {
  const used = new Set(usedPlayerIds)
  return slots.map((slot) => {
    const player = pickRandomPlayer({
      positionCode: slot.position,
      usedPlayerIds: [...used],
      random,
    })
    used.add(player.id)
    return {
      slotId: slot.slotId,
      slot,
      player,
    }
  })
}

export function teamStrength(team) {
  const summary = calculateRating(team, [])
  if (!summary) {
    return {
      score: 0,
      score10: 0,
      playerAverage: 0,
      chemistry: 0,
      balance: 0,
      lines: { attack: 0, midfield: 0, defense: 0, goalkeeping: 0 },
    }
  }

  const lineAverage =
    (summary.lines.attack +
      summary.lines.midfield +
      summary.lines.defense +
      summary.lines.goalkeeping) /
    4

  return {
    score:
      summary.score10 * 8 +
      summary.chemistry * 0.14 +
      summary.balance * 0.08 +
      lineAverage * 0.16,
    score10: summary.score10,
    playerAverage: summary.playerAverage,
    chemistry: summary.chemistry,
    balance: summary.balance,
    lines: summary.lines,
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function goalsFromPower(power, random) {
  const base = power / 34
  const swing = (random() - 0.5) * 1.6
  return clamp(Math.round(base + swing), 0, 6)
}

export function simulateMatch({ teamA, teamB, random = Math.random }) {
  const teamAStats = teamStrength(teamA)
  const teamBStats = teamStrength(teamB)
  const diff = teamAStats.score - teamBStats.score
  const randomness = (random() - 0.5) * 18

  let teamAGoals = goalsFromPower(teamAStats.score + Math.max(diff, 0) * 0.18, random)
  let teamBGoals = goalsFromPower(teamBStats.score + Math.max(-diff, 0) * 0.18, random)

  const edge = diff + randomness
  if (teamAGoals === teamBGoals && Math.abs(edge) > 8) {
    if (edge > 0) teamAGoals += 1
    else teamBGoals += 1
  }

  const winner =
    teamAGoals > teamBGoals ? 'teamA' : teamBGoals > teamAGoals ? 'teamB' : 'draw'

  return {
    teamAGoals,
    teamBGoals,
    winner,
    teamA: teamAStats,
    teamB: teamBStats,
    note:
      winner === 'draw'
        ? 'The teams could not be separated.'
        : Math.abs(teamAGoals - teamBGoals) >= 3
          ? 'A dominant performance decided the match.'
          : 'Small margins and chemistry made the difference.',
  }
}
