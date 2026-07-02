import test from 'node:test'
import assert from 'node:assert/strict'
import { PLAYERS } from './players.js'
import { RARITY, RARITY_RANK } from './rarity.js'

test('includes Egyptian Phenomena rarity', () => {
  assert.ok(RARITY['Egyptian Phenomena'])
  assert.equal(RARITY_RANK['Egyptian Phenomena'], 6)
})

test('includes a fuller Egyptian player pool across the pitch', () => {
  const egyptians = PLAYERS.filter((player) => player.nationality === 'Egypt')
  const positions = new Set(egyptians.map((player) => player.position))

  assert.ok(egyptians.length >= 16)
  assert.ok(positions.has('GK'))
  assert.ok(positions.has('CB'))
  assert.ok(positions.has('CDM') || positions.has('CM'))
  assert.ok(positions.has('RW') || positions.has('LW'))
  assert.ok(positions.has('ST'))
  assert.ok(egyptians.some((player) => player.rarity === 'Egyptian Phenomena'))
})

test('every Egyptian roster player has a resolved image', () => {
  const egyptians = PLAYERS.filter((player) => player.nationality === 'Egypt')

  for (const player of egyptians) {
    assert.ok(player.image, `${player.name} is missing an image`)
  }
})
