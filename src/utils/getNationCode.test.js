import test from 'node:test'
import assert from 'node:assert/strict'
import { PLAYERS } from '../data/players.js'
import { getNationCode } from './getNationCode.js'

test('Egypt maps to EGY national badge code', () => {
  assert.equal(getNationCode('Egypt'), 'EGY')
})

test('every roster nationality has a compact national badge code', () => {
  for (const player of PLAYERS) {
    const code = getNationCode(player.nationality)
    assert.match(code, /^[A-Z]{3}$/)
  }
})
