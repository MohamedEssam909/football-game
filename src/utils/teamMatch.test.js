import test from 'node:test'
import assert from 'node:assert/strict'
import { FORMATIONS, DEFAULT_FORMATION } from '../data/formations.js'
import {
  buildRandomTeam,
  getPickCandidates,
  simulateMatch,
  teamStrength,
} from './teamMatch.js'

test('buildRandomTeam fills the formation without duplicate players', () => {
  const slots = FORMATIONS[DEFAULT_FORMATION].slots
  const team = buildRandomTeam({ slots, usedPlayerIds: [] })
  const ids = team.map((entry) => entry.player.id)

  assert.equal(team.length, slots.length)
  assert.equal(new Set(ids).size, ids.length)
  assert.deepEqual(team.map((entry) => entry.slotId), slots.map((slot) => slot.slotId))
})

test('getPickCandidates returns eligible unused players for a slot', () => {
  const usedPlayerIds = ['salah']
  const candidates = getPickCandidates({
    positionCode: 'RW',
    usedPlayerIds,
    limit: 12,
  })

  assert.equal(candidates.some((player) => player.id === 'salah'), false)
  assert.ok(candidates.length > 1)
  assert.ok(
    candidates.every(
      (player) =>
        player.position === 'RW' || player.secondaryPositions?.includes('RW'),
    ),
  )
})

test('teamStrength returns a score that includes rating and chemistry', () => {
  const slots = FORMATIONS[DEFAULT_FORMATION].slots
  const team = buildRandomTeam({ slots, usedPlayerIds: [] })
  const strength = teamStrength(team)

  assert.ok(strength.score > 0)
  assert.ok(strength.playerAverage > 0)
  assert.ok(strength.chemistry >= 0)
})

test('simulateMatch returns a direct scoreline and winner', () => {
  const slots = FORMATIONS[DEFAULT_FORMATION].slots
  const teamA = buildRandomTeam({ slots, usedPlayerIds: [] })
  const teamB = buildRandomTeam({
    slots,
    usedPlayerIds: teamA.map((entry) => entry.player.id),
  })
  const result = simulateMatch({ teamA, teamB, random: () => 0.5 })

  assert.ok(Number.isInteger(result.teamAGoals))
  assert.ok(Number.isInteger(result.teamBGoals))
  assert.ok(result.teamAGoals >= 0)
  assert.ok(result.teamBGoals >= 0)
  assert.ok(['teamA', 'teamB', 'draw'].includes(result.winner))
  assert.ok(result.teamA.score > 0)
  assert.ok(result.teamB.score > 0)
})
