import { getPositionFit } from './positionFit.js'

// Chemistry rewards squads whose players are connected (shared club, then
// nationality, then era) and are playing in a position that suits them.
//
// Each player starts at a neutral base. Links with team-mates and a
// position-fit bonus push them up or down. The team chemistry is the average
// of every player's individual chemistry, clamped to 0..100.

const BASE = 50
const LINK_CAP = 10 // stop a single hyper-connected player from dominating
const LINK_WEIGHT = 4

function linkPoints(a, b) {
  if (a.club && a.club === b.club) return 3
  if (a.nationality && a.nationality === b.nationality) return 2
  if (a.era && a.era === b.era) return 0.5
  return 0
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

/**
 * @param {{player: object, slot: {position: string}}[]} squad
 * @returns {number} team chemistry 0..100
 */
export function calculateChemistry(squad) {
  if (!squad || squad.length === 0) return 0

  const perPlayer = squad.map(({ player, slot }) => {
    let links = 0
    for (const other of squad) {
      if (other.player.id === player.id) continue
      links += linkPoints(player, other.player)
    }
    links = Math.min(links, LINK_CAP)

    const { bonus } = getPositionFit(player, slot.position)
    return clamp(BASE + links * LINK_WEIGHT + bonus, 0, 100)
  })

  const total = perPlayer.reduce((sum, c) => sum + c, 0)
  return Math.round(total / perPlayer.length)
}
