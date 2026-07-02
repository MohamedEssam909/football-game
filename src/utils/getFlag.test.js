import test from 'node:test'
import assert from 'node:assert/strict'
import { PLAYERS } from '../data/players.js'
import { getFlag } from './getFlag.js'

test('every roster nationality renders a mapped flag', () => {
  const nationalities = new Set(PLAYERS.map((player) => player.nationality))

  for (const nationality of nationalities) {
    assert.notEqual(getFlag(nationality), '🏳️', `${nationality} is missing a flag`)
  }
})

test('Egypt renders the Egyptian flag', () => {
  assert.equal(getFlag('Egypt'), '🇪🇬')
})
