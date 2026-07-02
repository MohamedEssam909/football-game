import test from 'node:test'
import assert from 'node:assert/strict'
import { PLAYERS } from '../data/players.js'
import { generateBoxes, BOXES_PER_POSITION } from './generateBoxes.js'

test('generateBoxes returns four unique eligible players and excludes used players', () => {
  const usedIds = ['salah', 'messi', 'haaland']
  const boxes = generateBoxes('RW', usedIds)
  const ids = boxes.map((box) => box.player.id)

  assert.equal(boxes.length, BOXES_PER_POSITION)
  assert.equal(new Set(ids).size, ids.length)
  for (const usedId of usedIds) {
    assert.equal(ids.includes(usedId), false)
  }
})

test('generateBoxes can draw from the wider eligible pool over repeated runs', () => {
  const eligibleIds = new Set(
    PLAYERS
      .filter((player) => player.position === 'ST' || player.secondaryPositions?.includes('ST'))
      .map((player) => player.id),
  )
  const seen = new Set()

  for (let i = 0; i < 120; i += 1) {
    for (const box of generateBoxes('ST', [])) {
      if (eligibleIds.has(box.player.id)) seen.add(box.player.id)
    }
  }

  assert.ok(seen.size > BOXES_PER_POSITION)
})
